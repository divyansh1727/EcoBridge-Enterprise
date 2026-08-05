# 🚀 Deployment Guide

## Overview

EcoBridge Enterprise is designed to support multiple deployment environments, enabling seamless development, testing, and production deployments.

---

# Local Development

### Frontend

- React + Vite
- Node.js
- npm

Run:

```bash
npm install
npm run dev
```

---

### Backend

Each Spring Boot microservice can be started independently from IntelliJ IDEA or using Maven.

```bash
mvn spring-boot:run
```

---

# Docker Deployment

Every backend service is containerized using Docker.

Components include:

- API Gateway
- Auth Service
- Waste Service
- Recycler Service
- Matching Service
- Analytics Service
- Notification Service
- Config Server
- Eureka Server
- PostgreSQL
- Redis
- Kafka

Run all services using:

```bash
docker compose up -d
```

---

# Kubernetes Deployment

The application is deployed to Kubernetes using Deployment, Service, ConfigMap, and Ingress resources.

Deployment includes:

- Kubernetes Deployments
- ClusterIP Services
- Ingress Controller
- ConfigMaps
- Secrets
- Namespace Isolation

---

# Cloud Deployment

## Backend

Backend microservices are deployed on **Render**.

Features:

- Automatic deployment from GitHub
- Environment variable management
- Health monitoring

---

## Frontend

Frontend is deployed on **Vercel**.

Features:

- Automatic deployments
- Production build optimization
- HTTPS support

---

# Service Discovery

Microservices register themselves with **Eureka Server**, allowing dynamic service discovery without hardcoded service addresses.

---

# Configuration Management

Configuration is centralized using **Spring Cloud Config Server**, enabling all services to share environment-specific configuration.

---

# Monitoring

The application is monitored using:

- Prometheus
- Grafana

These tools provide real-time visibility into application health and performance metrics.

---

# Deployment Workflow

```text
Developer
     │
     ▼
 GitHub Repository
     │
     ├──────────────► Render (Backend Services)
     │
     └──────────────► Vercel (Frontend)
```

---

# Technology Stack

| Category | Technology |
|----------|------------|
| Frontend | React, Vite |
| Backend | Spring Boot, Spring Cloud |
| Database | PostgreSQL |
| Cache | Redis |
| Messaging | Kafka |
| Service Discovery | Eureka |
| Configuration | Config Server |
| Containerization | Docker |
| Orchestration | Kubernetes |
| Monitoring | Prometheus, Grafana |
| Cloud | Render, Vercel |