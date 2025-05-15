import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { FeedbackType } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface FeedbackSectionProps {
  onSubmitFeedback: (
    feedbackType: FeedbackType,
    comment: string
  ) => Promise<void>;
  isSubmitting: boolean;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  onSubmitFeedback,
  isSubmitting,
}) => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(null);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!feedbackType) {
      toast({
        variant: "destructive",
        title: "Feedback required",
        description: "Please select whether you liked or disliked the response",
      });
      return;
    }

    await onSubmitFeedback(feedbackType, comment);
  };

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">How was this response?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0">
        <div className="flex gap-4">
          <Button
            variant={
              feedbackType === FeedbackType.THUMBS_UP ? "default" : "outline"
            }
            className={`flex-1 ${
              feedbackType === FeedbackType.THUMBS_UP
                ? "bg-green-500 hover:bg-green-600"
                : ""
            }`}
            onClick={() => setFeedbackType(FeedbackType.THUMBS_UP)}
          >
            <ThumbsUp className="mr-1" /> Helpful
          </Button>
          <Button
            variant={
              feedbackType === FeedbackType.THUMBS_DOWN ? "default" : "outline"
            }
            className={`flex-1 ${
              feedbackType === FeedbackType.THUMBS_DOWN
                ? "bg-red-500 hover:bg-red-600"
                : ""
            }`}
            onClick={() => setFeedbackType(FeedbackType.THUMBS_DOWN)}
          >
            <ThumbsDown className="mr-1" /> Not Helpful
          </Button>
        </div>
        <div>
          <label
            htmlFor="feedback-comment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Comments (optional)
          </label>
          <Textarea
            id="feedback-comment"
            placeholder="Tell us what you liked or how we can improve..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full cursor-pointer bg-cricket-button-primary hover:bg-cricket-button-primary/90"
          onClick={handleSubmit}
          disabled={isSubmitting || !feedbackType}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeedbackSection;
