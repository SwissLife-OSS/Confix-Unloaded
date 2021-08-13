export interface StatusMessage {
  type: "ERROR" | "SUCCESS";
  color?: string;
  icon?: string;
  text: string;
}
