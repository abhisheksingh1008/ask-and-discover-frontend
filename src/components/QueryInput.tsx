import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const QueryInput: React.FC<QueryInputProps> = ({ onSubmit, isLoading }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <label htmlFor="query" className="text-sm font-medium text-gray-700">
        Query
      </label>
      <div className="flex gap-2">
        <Input
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="E.g., Which batter had the highest strike rate IPL 2024?"
          className="flex-1"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="bg-[#10b981] hover:bg-[#10b981]/90 cursor-pointer"
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
      <p className="text-xs text-gray-500">
        Try questions like "Who are the top 5 wicket-takers in IPL history?" or
        "Show me Virat Kohli's batting average by year"
      </p>
    </form>
  );
};

export default QueryInput;
