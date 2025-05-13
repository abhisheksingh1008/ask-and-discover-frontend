
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
        <AspectRatio ratio={1 / 1} className="bg-gray-100 rounded-md overflow-hidden">
          <img 
            src={imageUrl} 
            alt="Data visualization" 
            className="object-contain w-full h-full"
          />
        </AspectRatio>
      </CardContent>
    </Card>
  );
};

export default ResultDiagram;
