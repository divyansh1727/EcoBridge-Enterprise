# 📘 Swagger API Documentation

Welcome to the **EcoBridge Enterprise Interactive API Documentation**.

Every microservice exposes its own OpenAPI specification through Swagger UI, making it easy to explore endpoints, validate requests, and test APIs directly from your browser.

---

# 🌐 Live Swagger Endpoints

| Service | Status | Swagger UI |
|----------|:------:|------------|
| 🔐 Auth Service | 🟢 Live | https://ecobridge-enterprise-2.onrender.com/swagger-ui/index.html |
| ♻ Waste Service | 🟢 Live | https://ecobridge-enterprise-3.onrender.com/swagger-ui/index.html |
| 🏭 Recycler Service | 🟢 Live | https://ecobridge-enterprise-4.onrender.com/swagger-ui/index.html |
| 🤝 Matching Service | 🟢 Live | https://ecobridge-enterprise-6.onrender.com/swagger-ui/index.html |
| 📊 Analytics Service | 🟢 Live | https://ecobridge-enterprise-7.onrender.com/swagger-ui/index.html |
| 🔔 Notification Service | 🟢 Live | https://ecobridge-enterprise-5.onrender.com/swagger-ui/index.html |

---

# 🔐 Auth Service

Handles authentication, OAuth2 login, JWT generation, refresh tokens and user management.

🔗 **Swagger UI**

https://ecobridge-enterprise-2.onrender.com/swagger-ui/index.html

<p align="center">
<img src="swagger/auth-swagger.png" width="95%">
</p>

---

# ♻ Waste Service

Responsible for waste creation, management, pickup workflow and dashboard statistics.

🔗 **Swagger UI**

https://ecobridge-enterprise-3.onrender.com/swagger-ui/index.html

<p align="center">
<img src="swagger/waste-swagger.png" width="95%">
</p>

---

# 🏭 Recycler Service

Manages recycler registration, profile management, waste acceptance preferences, capacity tracking, and recycler discovery.

🔗 **Swagger UI**

https://ecobridge-enterprise-4.onrender.com/swagger-ui/index.html

<p align="center">
<img src="swagger/recycler-swagger.png" width="95%">
</p> 

---

# 🤝 Matching Service

Provides nearby waste, recycler matching and geospatial APIs.

🔗 **Swagger UI**

https://ecobridge-enterprise-6.onrender.com/swagger-ui/index.html

<p align="center">
<img src="swagger/matching-swagger.png" width="95%">
</p>

---

# 📊 Analytics Service

Aggregates dashboard metrics and system analytics.

🔗 **Swagger UI**

https://ecobridge-enterprise-7.onrender.com/swagger-ui/index.html

<p align="center">
<img src="swagger/analytics-swagger.png" width="95%">
</p>

---

# 🔔 Notification Service

Notification APIs for future email and event-driven messaging support.

🔗 **Swagger UI**

https://ecobridge-enterprise-5.onrender.com/swagger-ui/index.html

<p align="center">
<img src="swagger/notification-swagger.png" width="95%">
</p>

---

# 📋 API Standards

## Base URL

```text
https://<service>/api/v1
```

## Authentication

```http
Authorization: Bearer <JWT_TOKEN>
```

## Content Type

```text
application/json
```

---

# 📖 Related Documentation

- 📄 [Architecture](architecture.md)
- 📄 [API Reference](api.md)
- 📄 [Deployment Guide](deployment.md)
- 📄 [Observability](observability.md)

---

<p align="center">

**Built using Spring Boot • SpringDoc OpenAPI • Swagger UI**

</p>