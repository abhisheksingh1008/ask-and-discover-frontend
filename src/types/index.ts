
export interface TableData {
  columns: string[];
  rows: any[][];
}

export interface QueryResult {
  table: TableData;
  correctedQuery: string;
  queryExplanation: string;
  diagramUrl: string;
  jsonObject: any;
  singleLineExplanation: string;
  storyFromQuery: string;
}

export interface ApiResponse {
  success: boolean;
  data?: QueryResult;
  error?: string;
}
