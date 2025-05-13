
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultDiagramProps {
  imageUrl: string;
}

const ResultDiagram: React.FC<ResultDiagramProps> = ({ imageUrl }) => {
  if (!imageUrl) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full bg-gray-100 rounded-md overflow-hidden">
          <img
            src={imageUrl}
            alt="Cricket data visualization"
            className="object-contain w-full h-auto"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultDiagram;
