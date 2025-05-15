import { useEffect, useState } from "react";
import { FeedbackType } from "@/types";
import { useToast } from "./use-toast";

interface FeedbackState {
  queryResult: Record<string, any>;
  feedbackProvided: boolean;
}

export function useFeedbackState() {
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackRequired, setFeedbackRequired] = useState(false);

  const { toast } = useToast();

  // Load feedback state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("cricketExplorerFeedbackState");
    if (savedState) {
      const parsedState: FeedbackState = JSON.parse(savedState);
      if (parsedState.queryResult && !parsedState.feedbackProvided) {
        setFeedbackRequired(true);
      }
    }
  }, []);

  // Track page navigation attempts when feedback is required
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (feedbackRequired) {
        e.preventDefault();
        e.returnValue =
          "You haven't provided feedback yet. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [feedbackRequired]);

  const markFeedbackRequired = (queryResult: Record<string, any>) => {
    setFeedbackRequired(true);

    // Save to localStorage
    const feedbackState: FeedbackState = {
      queryResult,
      feedbackProvided: false,
    };
    localStorage.setItem(
      "cricketExplorerFeedbackState",
      JSON.stringify(feedbackState)
    );
  };

  const submitFeedback = async (
    data: Record<string, any>,
    feedbackType: FeedbackType,
    comment: string
  ) => {
    setSubmittingFeedback(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/feedback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            big_query_dump: {
              ...data.big_query_dump,
              is_feedback_given: true,
              feedback: feedbackType,
              additional_comments: comment,
            },
          }),
        }
      );

      if (!response.ok || response.status !== 200) {
        return false;
      }

      // Clear feedback requirement
      setFeedbackRequired(false);

      // Clear from localStorage
      localStorage.removeItem("cricketExplorerFeedbackState");

      return true;
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      return false;
    } finally {
      setSubmittingFeedback(false);
    }
  };

  return {
    feedbackRequired,
    submittingFeedback,
    markFeedbackRequired,
    submitFeedback,
  };
}

export default useFeedbackState;
