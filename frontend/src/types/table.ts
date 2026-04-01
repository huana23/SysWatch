import type { ReactNode } from "react";

export type Column<T> = {
  readonly header: string;
  readonly cell: (row: T) => ReactNode;
  readonly align?: "left" | "right";
};

