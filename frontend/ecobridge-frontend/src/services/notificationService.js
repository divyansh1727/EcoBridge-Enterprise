import api from "../api/axios";

export const getNotifications = (userId) =>
    api.get(`/api/v1/notifications/${userId}`);

export const getUnreadCount = (userId) =>
    api.get(`/api/v1/notifications/${userId}/unread-count`);

export const markAsRead = (id) =>
    api.put(`/api/v1/notifications/${id}/read`);

export const markAllAsRead = (userId) =>
    api.put(`/api/v1/notifications/${userId}/read-all`);

export const deleteNotification = (id) =>
    api.delete(`/api/v1/notifications/${id}`);