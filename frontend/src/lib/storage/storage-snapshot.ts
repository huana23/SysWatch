export function readStorageSnapshot<T>(
  storageKey: string,
  isValid: (value: unknown) => value is T,
): T | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(storageKey);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as unknown;
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function persistStorageSnapshot<T>(
  storageKey: string,
  snapshot: T,
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(snapshot));
  } catch {
    // ignore localStorage failures
  }
}