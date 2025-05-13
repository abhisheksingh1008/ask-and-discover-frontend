
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StoryNarrativeProps {
  story: string;
}

const StoryNarrative: React.FC<StoryNarrativeProps> = ({ story }) => {
  if (!story) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Data Story</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none">
          {story.split('\n').map((paragraph, index) => (
            paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryNarrative;
