
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
        Ask any question about your data
      </label>
      <div className="flex gap-2">
        <Input
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="E.g., Show me total sales by region for last quarter"
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !query.trim()}>
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
      <p className="text-xs text-gray-500">
        Try natural language queries like "Which products have the highest sales?" or "Show customer retention by month"
      </p>
    </form>
  );
};

export default QueryInput;
