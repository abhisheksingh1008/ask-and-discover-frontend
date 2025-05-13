
import { useState, useEffect } from "react";
import { FeedbackType } from "@/types";

interface FeedbackState {
  lastQueryId: string | null;
  feedbackProvided: boolean;
}

export function useFeedbackState() {
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackRequired, setFeedbackRequired] = useState(false);
  const [currentQueryId, setCurrentQueryId] = useState<string | null>(null);

  // Load feedback state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("cricketExplorerFeedbackState");
    if (savedState) {
      const parsedState: FeedbackState = JSON.parse(savedState);
      if (parsedState.lastQueryId && !parsedState.feedbackProvided) {
        setFeedbackRequired(true);
        setCurrentQueryId(parsedState.lastQueryId);
      }
    }
  }, []);

  // Track page navigation attempts when feedback is required
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (feedbackRequired) {
        e.preventDefault();
        e.returnValue = "You haven't provided feedback yet. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [feedbackRequired]);

  const markFeedbackRequired = (queryId: string) => {
    setFeedbackRequired(true);
    setCurrentQueryId(queryId);
    
    // Save to localStorage
    const feedbackState: FeedbackState = {
      lastQueryId: queryId,
      feedbackProvided: false
    };
    localStorage.setItem("cricketExplorerFeedbackState", JSON.stringify(feedbackState));
  };

  const submitFeedback = async (feedbackType: FeedbackType, comment: string) => {
    setSubmittingFeedback(true);
    try {
      // In a real app, this would be an API call
      // const response = await fetch("/api/feedback", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ feedbackType, comment, queryId: currentQueryId }),
      // });
      
      // Mock API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Feedback submitted:", { feedbackType, comment, queryId: currentQueryId });
      
      // Clear feedback requirement
      setFeedbackRequired(false);
      
      // Clear from localStorage
      localStorage.removeItem("cricketExplorerFeedbackState");
      
      return true;
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      return false;
    } finally {
      setSubmittingFeedback(false);
    }
  };

  return {
    feedbackRequired,
    submittingFeedback,
    markFeedbackRequired,
    submitFeedback,
  };
}

export default useFeedbackState;
