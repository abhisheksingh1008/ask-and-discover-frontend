
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import PlayerComparisonTool from "@/components/PlayerComparisonTool";

const PlayerComparison = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Cricket Player Comparison</h1>
        <div className="w-24"></div> {/* For layout balance */}
      </div>
      
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <PlayerComparisonTool />
      </div>
    </div>
  );
};

export default PlayerComparison;
