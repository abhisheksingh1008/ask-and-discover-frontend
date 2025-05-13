
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultExplanationProps {
  correctedQuery: string;
  explanation: string;
  singleLineExplanation: string;
}

const ResultExplanation: React.FC<ResultExplanationProps> = ({
  correctedQuery,
  explanation,
  singleLineExplanation,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Query Explanation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-1 text-sm text-gray-600">Refined Query:</h3>
          <p className="text-base">{correctedQuery}</p>
        </div>
        
        <div>
          <h3 className="font-medium mb-1 text-sm text-gray-600">Summary:</h3>
          <p className="text-base">{singleLineExplanation}</p>
        </div>
        
        <div>
          <h3 className="font-medium mb-1 text-sm text-gray-600">Detailed Explanation:</h3>
          <p className="text-base">{explanation}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultExplanation;
