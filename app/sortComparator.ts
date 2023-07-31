export const sortComparator =
  (direction: "desc" | "asc", key: string) => (a: any, b: any) =>
    direction === "asc" ? a[key] - b[key] : b[key] - a[key];
