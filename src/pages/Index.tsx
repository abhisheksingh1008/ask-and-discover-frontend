
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import QueryInput from "@/components/QueryInput";
import ResultTable from "@/components/ResultTable";
import ResultExplanation from "@/components/ResultExplanation";
import ResultDiagram from "@/components/ResultDiagram";
import JsonViewer from "@/components/JsonViewer";
import StoryNarrative from "@/components/StoryNarrative";
import LoadingState from "@/components/LoadingState";
import ErrorDisplay from "@/components/ErrorDisplay";
import { ApiResponse, QueryResult } from "@/types";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const { toast } = useToast();

  const handleQuerySubmit = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // This is a mock API call. In a real application, replace with your actual API endpoint
      // const response = await fetch("/api/text-to-sql", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ query }),
      // });
      
      // const data: ApiResponse = await response.json();
      
      // For demonstration purposes, we're using mock data
      // In a real app, you would use the commented code above
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      // Mock response
      const mockResponse: ApiResponse = {
        success: true,
        data: {
          table: {
            columns: ["Region", "Category", "Sales", "Profit"],
            rows: [
              ["North", "Electronics", "$24,500", "$5,200"],
              ["South", "Furniture", "$18,300", "$3,700"],
              ["East", "Office Supplies", "$12,800", "$2,900"],
              ["West", "Electronics", "$31,200", "$7,600"],
            ]
          },
          correctedQuery: "Show me sales and profit by region and product category",
          queryExplanation: "This query analyzes the sales and profit metrics across different regions and product categories to identify performance patterns and opportunities for growth.",
          diagramUrl: "https://via.placeholder.com/500",
          jsonObject: {
            metadata: { totalRecords: 4, queriedTables: ["sales", "products", "regions"] },
            aggregates: { totalSales: "$86,800", totalProfit: "$19,400" },
            results: [
              { region: "North", category: "Electronics", sales: "$24,500", profit: "$5,200" },
              { region: "South", category: "Furniture", sales: "$18,300", profit: "$3,700" },
              { region: "East", category: "Office Supplies", sales: "$12,800", profit: "$2,900" },
              { region: "West", category: "Electronics", sales: "$31,200", profit: "$7,600" },
            ]
          },
          singleLineExplanation: "The West region has the highest sales and profit, driven primarily by the Electronics category.",
          storyFromQuery: "The data reveals a compelling story about regional performance across product categories. The West region emerges as the clear leader in both sales and profit, with Electronics generating an impressive $31,200 in revenue and $7,600 in profit.\n\nInterestingly, while the North region also specializes in Electronics, its performance lags behind the West by approximately 21% in sales and 32% in profit, suggesting operational efficiency differences or market saturation variations between the regions.\n\nThe South region's focus on Furniture yields moderate results, while the East region shows the lowest overall performance with its Office Supplies category. This pattern suggests an opportunity to reevaluate product category focus by region or to investigate successful practices from the high-performing West region that might be transferable to other territories."
        }
      };
      
      if (mockResponse.success && mockResponse.data) {
        setQueryResult(mockResponse.data);
        toast({
          title: "Query processed successfully",
          description: "Your results are ready to view",
        });
      } else {
        throw new Error(mockResponse.error || "Failed to process query");
      }
    } catch (err) {
      console.error("Query error:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      toast({
        variant: "destructive",
        title: "Query failed",
        description: err instanceof Error ? err.message : "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Text-to-SQL Explorer</h1>
          <p className="text-gray-600 mt-2">Ask questions about your data in plain English</p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-10">
          <QueryInput onSubmit={handleQuerySubmit} isLoading={isLoading} />
        </div>
        
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : queryResult ? (
          <div className="space-y-8">
            <ResultTable data={queryResult.table} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResultExplanation 
                correctedQuery={queryResult.correctedQuery} 
                explanation={queryResult.queryExplanation} 
                singleLineExplanation={queryResult.singleLineExplanation}
              />
              <ResultDiagram imageUrl={queryResult.diagramUrl} />
            </div>
            
            <JsonViewer data={queryResult.jsonObject} />
            
            <StoryNarrative story={queryResult.storyFromQuery} />
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-gray-500">Enter a query to see results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
