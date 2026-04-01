export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts.at(0)?.[0] ?? "";
  const b = parts.at(-1)?.[0] ?? "";
  return (a + b).toUpperCase();
}
