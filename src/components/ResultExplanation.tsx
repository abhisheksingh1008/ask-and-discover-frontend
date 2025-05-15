import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultExplanationProps {
  enteredQuery: string;
  perceivedQuery: string;
  explanation: string;
}

const ResultExplanation: React.FC<ResultExplanationProps> = ({
  enteredQuery,
  perceivedQuery,
  explanation,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Query Explanation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {enteredQuery && (
          <div>
            <h3 className="font-medium mb-1 text-sm text-gray-600">
              Entered Query:
            </h3>
            <p className="text-base">{enteredQuery}</p>
          </div>
        )}

        {perceivedQuery && (
          <div>
            <h3 className="font-medium mb-1 text-sm text-gray-600">
              Perceived Query:
            </h3>
            <p className="text-base">{perceivedQuery}</p>
          </div>
        )}

        {explanation && (
          <div>
            <h3 className="font-medium mb-1 text-sm text-gray-600">
              Explanation on how query was perceived:
            </h3>
            <p className="text-base">{explanation}</p>
          </div>
        )}

        {/* <div>
          <h3 className="font-medium mb-1 text-sm text-gray-600">
            Detailed Explanation:
          </h3>
          <p className="text-base">{explanation}</p>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default ResultExplanation;
