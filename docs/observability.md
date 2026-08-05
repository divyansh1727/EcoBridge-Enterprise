# 📊 Observability

## Overview

EcoBridge Enterprise includes an observability stack to monitor application health, resource usage, and service performance.

The monitoring setup helps identify issues quickly and provides real-time insights into the deployed microservices.

---

# Monitoring Stack

## Prometheus

Prometheus is used to collect and store application metrics from the backend services.

Responsibilities include:

- Service health monitoring
- Metrics collection
- Resource utilization
- Performance tracking

---

## Grafana

Grafana is used to visualize metrics collected by Prometheus through interactive dashboards.

It provides:

- Real-time dashboards
- Performance visualization
- Resource monitoring
- Application health insights

---

# Metrics Collected

The monitoring setup provides visibility into:

- CPU Usage
- Memory Usage
- JVM Metrics
- HTTP Requests
- Response Time
- Active Services
- Application Health

---

# Monitoring Workflow

```text
Spring Boot Services
          │
          ▼
    Actuator Endpoints
          │
          ▼
      Prometheus
          │
          ▼
       Grafana
```

---

# Screenshots

The following screenshots demonstrate the monitoring setup.

## Prometheus Targets

> _Insert screenshot here_

---

## Grafana Dashboard

> _Insert screenshot here_

---

## Kubernetes Resources

> _Insert screenshot here_

---

# Benefits

- Real-time monitoring
- Performance visibility
- Faster troubleshooting
- Centralized dashboards
- Better system reliability