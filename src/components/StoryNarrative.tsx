import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StoryNarrativeProps {
  singleLineStory: string;
  detailedStory: string;
}

const StoryNarrative: React.FC<StoryNarrativeProps> = ({
  singleLineStory,
  detailedStory,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Data Story</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {singleLineStory && (
          <div>
            <h3 className="font-medium mb-1 text-sm text-gray-600">
              Single Line Story:
            </h3>
            <div className="prose prose-sm max-w-none">
              {singleLineStory
                .split("\n")
                .map((paragraph, index) =>
                  paragraph ? (
                    <p key={index}>{paragraph}</p>
                  ) : (
                    <br key={index} />
                  )
                )}
            </div>
          </div>
        )}
        {detailedStory && (
          <div>
            <h3 className="font-medium mb-1 text-sm text-gray-600">
              Detailed Story:
            </h3>
            <div className="prose prose-sm max-w-none">
              {detailedStory
                .split("\n")
                .map((paragraph, index) =>
                  paragraph ? (
                    <p key={index}>{paragraph}</p>
                  ) : (
                    <br key={index} />
                  )
                )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StoryNarrative;
