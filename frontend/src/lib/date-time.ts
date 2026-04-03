import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

export function formatDateTime(isoString: string) {
  try {
    const date = parseISO(isoString);
    return {
      time: format(date, "HH:mm", { locale: vi }),
      date: format(date, "dd/MM/yyyy", { locale: vi }),
    };
  } catch (error) {
    console.error("Error formatting date:", error);
    return { time: "--:--", date: "--/--/----" };
  }
}
