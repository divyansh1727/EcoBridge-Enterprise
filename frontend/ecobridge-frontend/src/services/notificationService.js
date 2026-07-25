import api from "../api/notificationApi";

export const getNotifications = (userId) => {
  return api.get(`/api/v1/notifications/${userId}`);
};

export const getUnreadCount = (userId) => {
  return api.get(`/api/v1/notifications/${userId}/unread-count`);
};

export const markAsRead = (id) => {
  return api.put(`/api/v1/notifications/${id}/read`);
};

export const markAllAsRead = (userId) => {
  return api.put(`/api/v1/notifications/${userId}/read-all`);
};

export const deleteNotification = (id) => {
  return api.delete(`/api/v1/notifications/${id}`);
};