export type NotificationType =
  | "message"
  | "job_added"
  | "job_applied"
  | "profile_completed";

export const iconMap: Record<NotificationType, string> = {
  message: "bell-outline",
  job_added: "case-outline",
  job_applied: "case",
  profile_completed: "person-outline",
};

export interface Notification {
  id: string;
  type: NotificationType;
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
