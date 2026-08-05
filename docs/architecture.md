# 🏗️ EcoBridge Enterprise Architecture

## Overview

EcoBridge Enterprise is a cloud-native waste management platform built using a **microservices architecture**. Each service is independently developed, deployed, and scaled while communicating through REST APIs and asynchronous events.

The system is containerized using **Docker**, orchestrated with **Kubernetes**, and monitored using **Prometheus** and **Grafana**.

---

## High-Level Architecture

```text
                           +----------------------+
                           |   React Frontend     |
                           |   (Vercel / Docker)  |
                           +----------+-----------+
                                      |
                                      |
                             API Gateway (Spring Cloud)
                                      |
        ---------------------------------------------------------
        |          |            |            |                  |
        |          |            |            |                  |
   Auth Service  Waste      Recycler    Matching        Analytics
                  Service     Service     Service         Service
        |                                       \            /
        |                                        \          /
        |                                         \        /
        |                                     Notification
        |
   PostgreSQL
        |
      Redis

-------------------------------- Infrastructure -------------------------------

Service Discovery  : Eureka Server
Centralized Config : Spring Cloud Config Server
Containerization   : Docker
Orchestration      : Kubernetes
Monitoring         : Prometheus + Grafana
```

---

# Microservices

## API Gateway

- Single entry point for all client requests.
- Routes incoming requests to the appropriate microservice.
- Simplifies communication between the frontend and backend.

---

## Authentication Service

Responsible for:

- User Registration & Login
- JWT Authentication
- Google OAuth2
- GitHub OAuth2
- Role Management
- User Statistics

---

## Waste Service

Responsible for:

- Waste Listings
- Waste Status
- Waste History
- Weekly Statistics

---

## Recycler Service

Responsible for:

- Recycler Registration
- Recycler Availability
- Recycling Information

---

## Matching Service

Responsible for:

- Matching waste generators with recyclers
- Distance-based matching
- Request allocation

---

## Analytics Service

Responsible for:

- Dashboard Statistics
- Waste Analytics
- Weekly Reports
- Pickup Rate
- Recycling Metrics

---

## Notification Service

Responsible for:

- Event Notifications
- Kafka Event Consumption
- User Alerts

---

# Supporting Components

### PostgreSQL

Primary relational database used by backend services.

### Redis

Provides caching to improve response time and reduce database load.

### Kafka

Enables asynchronous communication between microservices using event-driven architecture.

### Eureka Server

Provides service discovery, allowing microservices to locate each other dynamically.

### Spring Cloud Config Server

Centralizes configuration management across all backend services.

---

# Deployment

The platform supports multiple deployment strategies:

- Local Development
- Docker Compose
- Kubernetes
- Render (Backend)
- Vercel (Frontend)

---

# Monitoring

Application health and metrics are monitored using:

- Prometheus
- Grafana

These tools provide real-time visibility into service performance and resource usage.

---

# Architecture Highlights

- Microservices-based backend
- API Gateway for centralized routing
- Service Discovery using Eureka
- Centralized Configuration
- OAuth2 & JWT Authentication
- Event-Driven Communication with Kafka
- Dockerized Services
- Kubernetes Deployment
- Prometheus & Grafana Monitoring
- Cloud Deployment using Render & Vercel