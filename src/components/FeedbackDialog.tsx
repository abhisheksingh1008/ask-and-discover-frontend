
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FeedbackSection from "./FeedbackSection";
import { FeedbackType } from "@/types";

interface FeedbackDialogProps {
  isOpen: boolean;
  onSubmitFeedback: (feedbackType: FeedbackType, comment: string) => Promise<void>;
  isSubmitting: boolean;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
  isOpen,
  onSubmitFeedback,
  isSubmitting,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => {/* Dialog cannot be closed */}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>We value your feedback</DialogTitle>
          <DialogDescription>
            Please provide feedback on the response before continuing. This helps us improve the system.
          </DialogDescription>
        </DialogHeader>
        <FeedbackSection
          onSubmitFeedback={onSubmitFeedback}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
