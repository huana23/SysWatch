export type SupportSummary = {
  totalTickets: string;
  totalTicketsChange: string;
  resolvedTickets: string;
  resolvedTicketsChange: string;
  inProgressTickets: string;
  inProgressTicketsChange: string;
  overdueSlaTickets: string;
  overdueSlaTicketsChange: string;
};

export type SupportChannelKey = "email" | "phone" | "social";

export type SupportChannelItem = {
  key: SupportChannelKey;
  count: number;
  percentage: number;
};

export type SupportHourlyPoint = {
  hour: string;
  today: number;
  yesterday: number;
};

export type SupportTicketStatus = "in_progress" | "resolved" | "overdue";

export type SupportRecentTicket = {
  id: string;
  customer: string;
  issue: string;
  channel: SupportChannelKey;
  status: SupportTicketStatus;
  sla: string;
};

export type SupportSlaSummary = {
  firstResponseRate: number;
  resolutionRate: number;
  criticalBreachCount: number;
  criticalBreachProgress: number;
};