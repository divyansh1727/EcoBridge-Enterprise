# 📡 API Overview

## Auth Service

Base Path

```text
/api/v1/auth
```

Responsibilities

- User Registration
- User Login
- JWT Authentication
- Google OAuth2
- GitHub OAuth2
- Token Refresh

---

## User Service

```text
/api/v1/users
```

- User Profile
- User Statistics

---

## Waste Service

```text
/api/v1/waste
```

- Create Waste Listing
- Update Waste Status
- Waste Statistics
- Weekly Reports

---

## Recycler Service

```text
/api/v1/recycler
```

- Recycler Registration
- Recycler Management
- Recycler Availability

---

## Matching Service

```text
/api/v1/matching
```

- Waste-Recycling Matching
- Match Suggestions

---

## Analytics Service

```text
/api/v1/analytics
```

- Dashboard Statistics
- Weekly Analytics
- Recycling Metrics

---

## Notification Service

```text
/api/v1/notifications
```

- Event Notifications
- User Alerts

---

# API Gateway

All client requests are routed through the API Gateway, providing a single entry point to the backend services.