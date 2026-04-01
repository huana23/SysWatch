import { Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DashboardFilters() {
  return (
    <CardHeader className="space-y-4 p-4 lg:flex lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" className="rounded-lg">
          Hôm nay
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="rounded-lg text-muted-foreground"
        >
          7 ngày
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="rounded-lg text-muted-foreground"
        >
          30 ngày
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="rounded-lg text-muted-foreground"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Tùy chỉnh
        </Button>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Select defaultValue="all-services">
          <SelectTrigger className="w-full sm:w-[170px]">
            <SelectValue placeholder="Tất cả dịch vụ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-services">Tất cả dịch vụ</SelectItem>
            <SelectItem value="system-health">System Health</SelectItem>
            <SelectItem value="partners">Partners</SelectItem>
            <SelectItem value="support">Customer Support</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="global">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Khu vực toàn cầu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="global">Khu vực toàn cầu</SelectItem>
            <SelectItem value="asia">Châu Á</SelectItem>
            <SelectItem value="eu">Châu Âu</SelectItem>
            <SelectItem value="us">Bắc Mỹ</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardHeader>
  );
}