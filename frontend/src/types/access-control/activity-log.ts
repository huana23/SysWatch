import { Base } from "../base";

export enum AccessControlActivityLogStatus {
  SUCCESS = "success",
  FAILED = "failed",
  PENDING = "pending",
}

export interface AccessControlActivityLog extends Base {
  userName: string;
  action: string;
  resource: string;
  status: AccessControlActivityLogStatus;
}
