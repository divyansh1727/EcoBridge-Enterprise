<p align="center">
  <img src="docs/architecture.png" alt="EcoBridge Enterprise Architecture" width="100%">
</p>

<h1 align="center">🌱 EcoBridge Enterprise</h1>

<p align="center">
A Cloud-Native Waste Management Platform built using a scalable Microservices Architecture.
</p>

<p align="center">

![Java](https://img.shields.io/badge/Java-21-red)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-brightgreen)
![React](https://img.shields.io/badge/React-Vite-61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue)
![Redis](https://img.shields.io/badge/Redis-red)
![Kafka](https://img.shields.io/badge/Kafka-black)
![Docker](https://img.shields.io/badge/Docker-2496ED)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-blueviolet)

</p>

---

# 🚀 Live Deployment

| Component | URL |
|-----------|-----|
| 🌐 Frontend | https://ebe-mauve.vercel.app |
| 🚪 API Gateway | https://ecobridge-enterprise-0.onrender.com |

---

# 🎥 Demo Videos

## 🎬 Complete Project Walkthrough

> 📺 **Watch Here**

`YOUTUBE_VIDEO_LINK`

---

## ☸ Kubernetes Deployment Demo

> 📺 **Watch Here**

`YOUTUBE_VIDEO_LINK`

---

# 🌍 Overview

EcoBridge Enterprise is a cloud-native waste management platform that connects waste generators with recyclers through a scalable microservices architecture.

The platform showcases modern backend engineering practices using Spring Boot Microservices, Spring Cloud, Kafka, Redis, Docker, Kubernetes, Prometheus, Grafana and GitHub Actions.

---

# 🏗 System Architecture

<p align="center">
<img src="docs/architecture.png" width="100%">
</p>

---

# 🔄 System Workflow

```text
                 User
                   │
                   ▼
          React Frontend (Vercel)
                   │
                   ▼
             API Gateway
                   │
    ┌──────────────┼──────────────┐
    │              │              │
 Auth Service   Waste Service   Recycler Service
    │              │              │
    └──────────┬───┴──────┬───────┘
               │          │
               ▼          ▼
        Matching Service
               │
               ▼
      Analytics & Notification
               │
               ▼
 PostgreSQL • Redis • Kafka
```

---

# 📖 Documentation

| Document | Description |
|----------|-------------|
| 📄 [Architecture](docs/architecture.md) | Overall system architecture |
| 📄 [API Reference](docs/api.md) | REST API documentation |
| 📄 [Swagger Guide](docs/swagger.md) | Interactive API Documentation |
| 📄 [Deployment Guide](docs/deployment.md) | Docker, Kubernetes & Render deployment |
| 📄 [Observability](docs/observability.md) | Prometheus, Grafana & Monitoring |

---

# 📘 Interactive API Documentation

Every microservice exposes interactive Swagger documentation.

<p align="center">

<img src="docs/swagger/auth-swagger.png" width="90%">

</p>

➡️ **Complete Swagger Documentation**

📄 **[View Swagger Documentation](docs/swagger.md)**

---

# ✨ Features

- JWT Authentication
- OAuth2 Login (Google & GitHub)
- Role-Based Authorization
- Waste Management
- Recycler Registration & Discovery
- Intelligent Matching Engine
- Analytics Dashboard
- Notification Service
- Kafka Event Streaming
- Redis Caching
- API Gateway
- Config Server
- Eureka Service Discovery
- Dockerized Microservices
- Kubernetes Deployment
- GitHub Actions CI/CD
- Prometheus Monitoring
- Grafana Dashboards

---

# 📷 Frontend Gallery

| Home | Login |
|------|------|
| ![](docs/frontend/Home.png) | ![](docs/frontend/Login.png) |

| Register | Profile |
|------|------|
| ![](docs/frontend/Register.png) | ![](docs/frontend/Profile.png) |

| Waste Dashboard | Recycler Dashboard |
|------|------|
| ![](docs/frontend/waste-dashboard.png) | ![](docs/frontend/recycler-dashboard.png) |

| Browse Waste | Create Waste |
|------|------|
| ![](docs/frontend/BrowseWaste.png) | ![](docs/frontend/create-waste.png) |

| My Waste | Reserve Waste |
|------|------|
| ![](docs/frontend/MyWaste.png) | ![](docs/frontend/ReserveWaste.png) |

| Complete Pickup | Notifications |
|------|------|
| ![](docs/frontend/CompleteWaste.png) | ![](docs/frontend/Notification.png) |

---

# ☸ DevOps

| Docker Images | Docker Hub |
|---------------|------------|
| ![](docs/devops/docker-images.png) | ![](docs/devops/dockerHub.png) |

| GitHub Actions | Eureka Dashboard |
|---------------|------------------|
| ![](docs/devops/github-actions.png) | ![](docs/devops/eureka-dashboard.png) |

| Kubernetes Dashboard | Kubernetes Pods |
|----------------------|-----------------|
| ![](docs/devops/Kubernetes-dashboard.png) | ![](docs/devops/Kubernetes-pods.png) |

| Kubectl |
|----------|
| ![](docs/devops/Kubectl-cmd.png) |

---

# 📈 Monitoring

| Grafana Authentication | CPU Metrics |
|------------------------|-------------|
| ![](docs/monitoring/grafana-auth.png) | ![](docs/monitoring/cpu-metrics.png) |

| Grafana Dashboard | Prometheus |
|-------------------|------------|
| ![](docs/monitoring/grafana-metrics-2.png) | ![](docs/monitoring/promotheus.png) |

---

# 🛠 Technology Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React, Vite, Tailwind CSS, Axios |
| Backend | Spring Boot, Spring Security, Spring Cloud Gateway, Config Server, Eureka, OpenFeign |
| Database | PostgreSQL |
| Event Streaming | Apache Kafka |
| Caching | Redis |
| Monitoring | Prometheus, Grafana, Spring Boot Actuator |
| DevOps | Docker, Kubernetes, GitHub Actions |
| Deployment | Render, Vercel |

---

# 📁 Project Structure

```text
EcoBridge-Enterprise
│
├── backend/
├── frontend/
├── infrastructure/
├── docs/
│   ├── api.md
│   ├── architecture.md
│   ├── deployment.md
│   ├── observability.md
│   ├── swagger.md
│   │
│   ├── frontend/
│   ├── devops/
│   ├── monitoring/
│   └── swagger/
│
└── README.md
```

---

# 🔮 Future Enhancements

- Google Maps Integration
- AI-powered Waste Classification
- Push Notifications
- Live Recycler Tracking
- Mobile Application
- Multi-language Support

---

# 👨‍💻 Author

**Divyansh Singh**

- 🌐 GitHub: https://github.com/divyansh1727
- 💼 LinkedIn: https://www.linkedin.com/in/divyansh1727/
- 📧 Email: divys2705@gmail.com