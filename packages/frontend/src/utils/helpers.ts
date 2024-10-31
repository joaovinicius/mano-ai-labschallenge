export function fromTimestamp(timestamp: string): string {
  const date = new Date();
  date.setTime(parseInt(timestamp));
  return date.toLocaleString();
}

export function formatJsonString(content: string): string {
  try {
    const json = JSON.parse(content);
    return JSON.stringify(json, null, 2);
  } catch {
    return content;
  }
}