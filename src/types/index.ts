
export interface TableData {
  columns: string[];
  rows: any[][];
}

export interface QueryResult {
  id: string;
  Table: TableData;
  "User's query": string;
  "Perceived user's query": string;
  "Explanation on how query was perceived": string;
  Image: string;
  "Restructured Data": string;
  "Single Line Story": string;
  Story: string;
}

// export type FeedbackType = "THUMBS_UP" | "THUMBS_DOWN";
export enum FeedbackType {
  THUMBS_UP = "THUMBS_UP",
  THUMBS_DOWN = "THUMBS_DOWN",
}

export interface FeedbackData {
  feedbackType: FeedbackType;
  comment?: string;
  queryId?: string;
}

export interface NavLink {
  title: string;
  path: string;
  description: string;
}
