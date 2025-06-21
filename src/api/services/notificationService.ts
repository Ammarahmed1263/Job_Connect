import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { endpoints } from "@api/endpoints";
import apiClient from "@api/apiClient";

const handleRegistrationError = (errorMessage: string) => {
  alert(errorMessage);
  throw new Error(errorMessage);
};

const notificationBase = endpoints.notifications;

const notificationService = {
  sendPushNotification: async (expoPushToken: string) => {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  },

  registerForPushNotificationsAsync: async () => {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        handleRegistrationError(
          "Permission not granted to get push token for push notification!"
        );
        return;
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        const easProjectId = Constants.expoConfig?.extra?.eas?.projectId;
        if (!easProjectId) {
          handleRegistrationError(
            "EAS Project ID not found in app configuration (extra.eas.projectId). Please ensure it is set in your app.json or app.config.js."
          );
        }
        handleRegistrationError("Project ID not found");
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(pushTokenString);
        return pushTokenString;
      } catch (e: unknown) {
        handleRegistrationError(`${e}`);
      }
    } else {
      handleRegistrationError(
        "Must use physical device for push notifications"
      );
    }
  },
  fetchUserNotifications: async () => {
    try {
      const response = await apiClient.get(notificationBase.getNotifications);
      return response;
    } catch (error) {
      console.log('failed to get user notifications: ', error)
      throw new Error("Failed to fetch user notifications");
    }
  },
  markNotificationAsRead: async (notificationId: string) => {
    try {
      const response = await apiClient.post(
        notificationBase.markNotificationAsRead(notificationId)
      );
      console.log("Marked notification as read:", response);
      return response;
    } catch (error) {
      throw new Error("Failed to mark notification as read");
    }
  },
  sendExpoTokenToServer: async (expoPushToken: string) => {
    try {
      const response = await apiClient.post(
        notificationBase.sendPushToken,
        { expoPushToken }
      );
      console.log("Expo token sent to server:", response);
      return response;
    }catch (error) {
    console.error("Error sending Expo token to server:", error);
    throw new Error("Failed to send Expo token to server");
  }
  } 
};

export default notificationService;
