export type AccessRoleSummary = {
  key: "admin" | "operator" | "viewer";
  userCount: number;
};

export type SecuritySetting = {
  key: "2fa" | "sso" | "sessionTimeout";
  enabled: boolean;
};

export type ApprovalRequest = {
  id: string;
  type: string;
  requester: string;
  description: string;
  requestedAgo: string;
};

export type AccessActivityStatus = "success" | "rejected" | "warning";

export type AccessActivityLog = {
  id: string;
  userInitials: string;
  userName: string;
  action: string;
  time: string;
  date: string;
  status: AccessActivityStatus;
};