import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type AccessRoleCardItem = {
  title: string;
  subtitle: string;
  usersLabel: string;
  actionLabel: string;
  icon: ReactNode;
  gradientClassName: string;
  userCount: number;
};

type AccessRoleCardsProps = {
  sectionTitle: string;
  addRoleLabel: string;
  items: readonly AccessRoleCardItem[];
};

export default function AccessRoleCards({
  sectionTitle,
  addRoleLabel,
  items,
}: AccessRoleCardsProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-foreground">{sectionTitle}</h2>

        <Button
          variant="link"
          className="h-auto p-0 text-sm font-semibold text-primary"
        >
          {addRoleLabel}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.title}
            className="rounded-2xl border border-border bg-card shadow-sm"
          >
            <CardContent className="p-4">
              <div
                className={`mb-4 flex h-[180px] items-center justify-center rounded-xl text-white ${item.gradientClassName}`}
              >
                {item.icon}
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-3 text-sm">
                <span className="text-muted-foreground">
                  {item.usersLabel}: {item.userCount}
                </span>

                <Button
                  variant="link"
                  className="h-auto p-0 text-sm font-semibold text-primary"
                >
                  {item.actionLabel}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}