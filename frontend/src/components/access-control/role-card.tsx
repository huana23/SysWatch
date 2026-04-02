import Image from "next/image";
import Link from "next/link";

import { ArrowRight, type LucideIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type RoleCardTone = "admin" | "opt" | "viewer";

const toneClasses: Record<RoleCardTone, { banner: string; icon: string }> = {
  admin: {
    banner: "bg-gradient-to-r from-[#1C90E9] to-[#2563EB]",
    icon: "text-white",
  },
  opt: {
    banner: "bg-gradient-to-r from-[#10B981] to-[#0D9488]",
    icon: "text-white",
  },
  viewer: {
    banner: "bg-gradient-to-r from-[#94A3B8] to-[#475569]",
    icon: "text-white",
  },
};

type Props = {
  icon?: string;
  iconSrc?: string;
  title: string;
  description: string;
  memberCount: number;
  detailUrl: string;
  tone?: RoleCardTone;
};

export default function AccessControlRoleCard({
  icon,
  iconSrc,
  title,
  description,
  memberCount,
  detailUrl,
  tone = "admin",
}: Props) {
  const classes = toneClasses[tone];

  return (
    <Card
      className="gap-0 overflow-hidden rounded-xl p-[21px] shadow-none ring-0 border"
      style={{ boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}
    >
      <div
        className={`flex h-32 items-center justify-center rounded-md ${classes.banner}`}
      >
        {icon ? (
          <span
            className={`material-symbols-outlined ${classes.icon}`}
            style={{ fontSize: "42px" }}
          >
            {icon}
          </span>
        ) : iconSrc ? (
          <Image
            src={iconSrc}
            alt={title}
            width={40}
            height={40}
            className="size-10 object-contain"
            unoptimized
          />
        ) : null}
      </div>

      <div className="space-y-4 pt-6">
        <CardHeader className="gap-1 p-0">
          <CardTitle className="text-lg font-bold text-foreground">
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>

        <div className="flex items-center justify-between rounded-sm bg-slate-50 p-2">
          <div className="text-slate-900 text-xs font-medium">
            Người dùng: {memberCount}
          </div>

          <Link
            prefetch={false}
            href={detailUrl}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
          >
            Chi tiết <ArrowRight className="size-3 text-blue-600" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
