export type ChangeType = "positive" | "negative" | "neutral";

export function getChangeType(change: string): ChangeType {
  const normalized = change.trim();

  if (
    normalized === "0" ||
    normalized === "0%" ||
    normalized === "+0" ||
    normalized === "+0%" ||
    normalized === "-0" ||
    normalized === "-0%"
  ) {
    return "neutral";
  }

  if (normalized.startsWith("-")) {
    return "negative";
  }

  return "positive";
}

export function formatChangeValue(change: string): string {
  const normalized = change.trim();

  if (normalized.startsWith("+") || normalized.startsWith("-")) {
    return normalized.slice(1);
  }

  return normalized;
}

export function getChangeMeta(change: string) {
  return {
    changeType: getChangeType(change),
    displayChange: formatChangeValue(change),
  };
}