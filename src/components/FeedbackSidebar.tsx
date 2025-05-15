import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import FeedbackSection from "./FeedbackSection";
import { FeedbackType } from "@/types";

interface FeedbackSidebarProps {
  onSubmitFeedback: (
    feedbackType: FeedbackType,
    comment: string
  ) => Promise<void>;
  isSubmitting: boolean;
}

const FeedbackSidebar: React.FC<FeedbackSidebarProps> = ({
  onSubmitFeedback,
  isSubmitting,
}) => {
  return (
    <Sidebar
      className="border-l"
      side="right"
      variant="sidebar"
      collapsible="none"
    >
      <div className="sticky top-0">
        <SidebarHeader className="border-b">
          <h3 className="font-semibold text-lg">Feedback</h3>
          <p className="text-sm text-muted-foreground">
            Please provide feedback on the response to help us improve.
          </p>
        </SidebarHeader>
        <SidebarContent className="p-4">
          <FeedbackSection
            onSubmitFeedback={onSubmitFeedback}
            isSubmitting={isSubmitting}
          />
        </SidebarContent>
      </div>
    </Sidebar>
  );
};

export default FeedbackSidebar;
