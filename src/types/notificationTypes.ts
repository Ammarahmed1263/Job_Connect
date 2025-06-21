export type NotificationType =
  | "Message"
  | "ApplicationStatus"
  | "CompleteProfile"
  | "Recommendation";

export const iconMap: Record<NotificationType, string> = {
  Message: "bell-outline",
  ApplicationStatus: "case-outline",
  CompleteProfile: "person-outline",
  Recommendation: "eye-outline",
};

export interface Notification {
  id: string;
  type: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  createdAt: string;
}

export type NotificationCategory =
  | "Today"
  | "Yesterday"
  | "This Week"
  | "Earlier";
