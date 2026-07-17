package com.ecobridge.notification.controller;

import com.ecobridge.notification.entity.Notification;
import com.ecobridge.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/{userId}")
    public List<Notification> getNotifications(
            @PathVariable UUID userId
    ) {
        return notificationService.getNotifications(userId);
    }

    @GetMapping("/{userId}/unread-count")
    public long getUnreadCount(
            @PathVariable UUID userId
    ) {
        return notificationService.getUnreadCount(userId);
    }

    @PutMapping("/{id}/read")
    public void markAsRead(
            @PathVariable UUID id
    ) {
        notificationService.markAsRead(id);
    }

    @PutMapping("/{userId}/read-all")
public void markAllAsRead(
        @PathVariable UUID userId
) {
    notificationService.markAllAsRead(userId);
}

@DeleteMapping("/{id}")
public void deleteNotification(
        @PathVariable UUID id
) {
    notificationService.deleteNotification(id);
}
}