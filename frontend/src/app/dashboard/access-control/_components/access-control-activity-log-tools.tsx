"use client";

import { ListFilter } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  onOpenFilter?: () => void;
};

const AccessControlActivityLogTools = ({ onOpenFilter }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-heading-lg text-lg font-bold">Nhật ký hoạt động</h2>
      <Button
        type="button"
        variant="ghost"
        onClick={onOpenFilter}
        className="gap-1 whitespace-nowrap h-auto hover:cursor-pointer hover:text-primary-foreground text-sm"
      >
        <ListFilter className="size-3" />
        Lọc dữ liệu
      </Button>
    </div>
  );
};

export default AccessControlActivityLogTools;
