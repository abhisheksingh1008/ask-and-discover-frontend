import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import QueryInput from "@/components/QueryInput";
import ResultTable from "@/components/ResultTable";
import ResultExplanation from "@/components/ResultExplanation";
import ResultDiagram from "@/components/ResultDiagram";
import JsonViewer from "@/components/JsonViewer";
import StoryNarrative from "@/components/StoryNarrative";
import LoadingState from "@/components/LoadingState";
import ErrorDisplay from "@/components/ErrorDisplay";
import FeedbackSidebar from "@/components/FeedbackSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import useFeedbackState from "@/hooks/useFeedbackState";
import { QueryResult, FeedbackType } from "@/types";
import { loadLastQueryResult, snakeToTitleCase } from "@/lib/helpers";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queryResult, setQueryResult] = useState<QueryResult | null>(
    loadLastQueryResult
  );
  const { toast } = useToast();
  const {
    feedbackRequired,
    submittingFeedback,
    markFeedbackRequired,
    submitFeedback,
  } = useFeedbackState();

  // Ensure feedback is collected when navigating away
  useEffect(() => {
    const handleBeforeNavigate = (e: BeforeUnloadEvent) => {
      if (feedbackRequired) {
        e.preventDefault();
        e.returnValue =
          "You haven't submitted feedback yet. Please do so before leaving.";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeNavigate);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeNavigate);
    };
  }, [feedbackRequired]);

  const handleQuerySubmit = async (query: string) => {
    // Check if feedback is required before allowing a new query
    if (feedbackRequired) {
      toast({
        variant: "destructive",
        title: "Feedback required",
        description:
          "Please provide feedback on the previous response before submitting a new query",
      });
      return;
    }

    try {
      setIsLoading(true);
      setQueryResult(null);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/text_to_sql`,
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_query: query,
            model: "o3-mini",
          }),
        }
      );
      if (!response.ok || response.status !== 200) {
        const error: any = await response.json();
        // throw new Error(`${error?.detail || error?.message}`);
        console.log(error);
      }
      if (!response.body) {
        throw new Error("No response body received");
      }

      const reader = response.body.getReader();
      const dataRegex = /data:\s(.*)/g;
      const decoder = new TextDecoder();
      let accumulatedResult: Record<string, any> = {};

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        if (value) {
          const chunk = decoder.decode(value);
          let dataMatch: RegExpExecArray | null;

          while ((dataMatch = dataRegex.exec(chunk)) !== null) {
            const rawData = dataMatch[1];
            const parsedObject = JSON.parse(rawData);

            if (parsedObject) {
              accumulatedResult = {
                ...accumulatedResult,
                ...parsedObject,
              };
              setQueryResult((prev) => ({
                ...prev,
                ...parsedObject,
              }));
            }
          }
        }
      }
      markFeedbackRequired(accumulatedResult);
      toast({
        title: "Query processed successfully",
        description:
          "Your results are ready to view. Please provide feedback when done.",
      });
    } catch (err) {
      console.error("Query error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      toast({
        variant: "destructive",
        title: "Query failed",
        description:
          err instanceof Error ? err.message : "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitFeedback = async (
    feedbackType: FeedbackType,
    comment: string
  ) => {
    const success = await submitFeedback(queryResult, feedbackType, comment);
    if (success) {
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Feedback submission failed",
        description: "Please try again later.",
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <div className="flex-1">
          <div className="container mx-auto py-8 px-4">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Cricket Data Explorer
              </h1>
              <p className="text-gray-600 mt-2">
                Ask questions about cricket statistics in plain English
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-10">
              <QueryInput onSubmit={handleQuerySubmit} isLoading={isLoading} />
            </div>

            {error ? (
              <ErrorDisplay message={error} />
            ) : queryResult ? (
              <div className="space-y-8">
                {queryResult.Table && (
                  <ResultTable
                    data={{
                      columns: queryResult.Table.columns.map((col) =>
                        snakeToTitleCase(col)
                      ),
                      rows: Object.keys(
                        queryResult.Table.rows[queryResult.Table.columns[0]]
                      ).map((index) =>
                        queryResult.Table.columns.map((col) =>
                          String(queryResult.Table.rows[col][index])
                        )
                      ),
                    }}
                  />
                )}
                {queryResult.Image && (
                  <ResultDiagram
                    imageUrl={`${import.meta.env.VITE_BACKEND_API_URL}/${
                      queryResult.Image
                    }`}
                  />
                )}
                <ResultExplanation
                  enteredQuery={queryResult["User's query"]}
                  perceivedQuery={queryResult["Perceived user's query"]}
                  explanation={
                    queryResult["Explanation on how query was perceived"]
                  }
                />
                {(queryResult["Single Line Story"] || queryResult.Story) && (
                  <StoryNarrative
                    singleLineStory={queryResult["Single Line Story"]}
                    detailedStory={queryResult.Story}
                  />
                )}
                <JsonViewer data={queryResult} />
              </div>
            ) : (
              <div className="text-center py-12 rounded-lg bg-cricket-light border-dashed border-2 border-[#10b981]/30">
                <p className="font-medium text-[#10b981]">
                  Enter a cricket related query to see results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Feedback Sidebar - only shown when feedback is required */}
        {feedbackRequired && queryResult && (
          <FeedbackSidebar
            onSubmitFeedback={handleSubmitFeedback}
            isSubmitting={submittingFeedback}
          />
        )}
      </div>
    </SidebarProvider>
  );
};

export default Index;
