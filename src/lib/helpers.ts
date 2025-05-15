
export function snakeToTitleCase(str: string) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const loadLastQueryResult = () => {
  const savedResult = localStorage.getItem("cricketExplorerFeedbackState");
  if (savedResult) {
    const parsedState = JSON.parse(savedResult);
    return parsedState?.queryResult || null;
  } else {
    return null;
  }
};
