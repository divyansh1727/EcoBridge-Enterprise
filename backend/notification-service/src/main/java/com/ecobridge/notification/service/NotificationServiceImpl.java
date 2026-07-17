package com.ecobridge.notification.service;

import com.ecobridge.notification.entity.Notification;
import com.ecobridge.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
public void createNotification(
        UUID userId,
        String title,
        String message,
        String type
) {

    System.out.println("A");

    Notification notification = Notification.builder()
            .userId(userId)
            .title(title)
            .message(message)
            .type(type)
            .build();

    System.out.println("B");

    notificationRepository.save(notification);

    System.out.println("C");
}
    @Override
    public List<Notification> getNotifications(UUID userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    public long getUnreadCount(UUID userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }

    @Override
    public void markAsRead(UUID id) {

        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow();

        notification.setIsRead(true);

        notificationRepository.save(notification);
    }
    @Override
public void markAllAsRead(UUID userId) {

    List<Notification> notifications =
            notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);

    notifications.forEach(notification ->
            notification.setIsRead(true)
    );

    notificationRepository.saveAll(notifications);

}

@Override
public void deleteNotification(UUID id) {

    notificationRepository.deleteById(id);

}

}