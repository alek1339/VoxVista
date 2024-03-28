import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../types/AppTypes";

interface NotificationState {
  notifications: NotificationType[];
}

export interface NotificationType {
  id: number;
  message: string;
  duration: number;
}

const initialState: NotificationState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationType>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export const selectNotifications = (state: RootState) =>
  state.notifications.notifications;

export default notificationSlice.reducer;
