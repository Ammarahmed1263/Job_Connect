import notificationService from "@api/services/notificationService";
import { handleNotificationRedirection } from "@utils";
import * as Notifications from "expo-notifications";
import { RelativePathString, useRouter } from "expo-router";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";

interface NotificationContextType {
  expoPushToken: string | null | undefined;
  notification: Notifications.Notification | null;
  error: Error | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: FC<NotificationProviderProps> = ({
  children,
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null | undefined>(
    null
  );
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  useEffect(() => {
    notificationService.registerForPushNotificationsAsync().then(
      (token) => setExpoPushToken(token),
      (error) => setError(error)
    );

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("🔔 Notification Received: ", notification);
        setNotification(notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(
          "🔔 Notification Response: ",
          JSON.stringify(response, null, 2),
          JSON.stringify(response.notification.request.content.data, null, 2)
        );

        const data = response.notification.request.content.data;
        try {
          const redirect = handleNotificationRedirection({
            type: data.type,
            dataJson: JSON.stringify(data.data),
          });

          if (redirect?.screen) {
            if (redirect.params) {
              router.push({
                pathname: `/${redirect.screen}` as RelativePathString,
                params: redirect.params,
              });
            } else {
              router.push(`/${redirect.screen}` as RelativePathString);
            }
          }
        } catch (e) {
          console.error("❌ Failed to redirect from notification", e);
        }
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{ expoPushToken, notification, error }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
