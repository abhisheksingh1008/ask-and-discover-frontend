
import React from "react";
import { Loader } from "lucide-react";

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <Loader className="h-12 w-12 animate-spin text-blue-500" />
      <p className="text-lg text-gray-600">Generating SQL and retrieving results...</p>
    </div>
  );
};

export default LoadingState;
