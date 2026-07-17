package com.ecobridge.notification.service;

import com.ecobridge.notification.entity.Notification;

import java.util.List;
import java.util.UUID;

public interface NotificationService {

    void createNotification(
            UUID userId,
            String title,
            String message,
            String type
    );

    List<Notification> getNotifications(UUID userId);

    long getUnreadCount(UUID userId);

    void markAsRead(UUID id);

    void markAllAsRead(UUID userId);

    void deleteNotification(UUID id);

}
