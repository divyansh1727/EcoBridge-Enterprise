# 🏗️ EcoBridge Enterprise Architecture

## Overview

EcoBridge Enterprise is a cloud-native waste management platform built using a **microservices architecture**. Each service is independently developed, deployed and responsible for a specific part of the platform while communicating through REST APIs, OpenFeign and asynchronous events.

The platform connects waste generators with recyclers through a location-aware matching system. Recycler discovery combines **EcoBridge-registered recyclers** with external recycling businesses discovered through **Google Places** and public location data from **OpenStreetMap / Overpass**.

The system is containerized using **Docker**, orchestrated with **Kubernetes** and monitored using **Prometheus** and **Grafana**.

---

## High-Level Architecture

```text
                           +----------------------+
                           |    React Frontend    |
                           |   Vercel / Docker    |
                           +----------+-----------+
                                      |
                                      ▼
                           +----------------------+
                           |     API Gateway      |
                           | Spring Cloud Gateway |
                           +----------+-----------+
                                      |
          +-------------------------+-------------------------+
          |                         |                         |
          ▼                         ▼                         ▼
   +-------------+           +-------------+           +-------------+
   | Auth        |           | Waste       |           | Recycler    |
   | Service     |           | Service     |           | Service     |
   +------+------+           +------+------+           +------+------+
          |                         |                         |
          |                         |                         |
          |                         +-----------+-------------+
          |                                     |
          |                                     ▼
          |                            +----------------+
          |                            | Matching       |
          |                            | Service        |
          |                            +-------+--------+
          |                                    |
          |                +-------------------+-------------------+
          |                |                   |                   |
          |                ▼                   ▼                   ▼
          |       +----------------+   +---------------+   +---------------+
          |       | EcoBridge      |   | Google Places |   | OpenStreetMap |
          |       | Recyclers      |   | Businesses    |   | / Overpass    |
          |       +----------------+   +---------------+   +---------------+
          |                |                   |                   |
          |                +-------------------+-------------------+
          |                                    |
          |                                    ▼
          |                         +----------------------+
          |                         | Recycler Comparison  |
          |                         +----------+-----------+
          |                                    |
          |                                    ▼
          |                         +----------------------+
          |                         | Interactive Google   |
          |                         | Map & Markers        |
          |                         +----------+-----------+
          |                                    |
          |                                    ▼
          |                              Reserve Waste
          |                                    |
          |                                    ▼
          |                                  Pickup
          |                                    |
          |                                    ▼
          |                            Complete Pickup
          |                                    |
          |                         +----------+----------+
          |                         |                     |
          |                         ▼                     ▼
          |                  +-------------+       +-------------+
          |                  | Analytics   |       | Notification|
          |                  | Service     |       | Service     |
          |                  +-------------+       +-------------+

                         Supporting Infrastructure
                                      |
          +---------------------------+---------------------------+
          |                           |                           |
          ▼                           ▼                           ▼
   +-------------+             +-------------+             +-------------+
   | PostgreSQL  |             | Redis       |             | Kafka       |
   +-------------+             +-------------+             +-------------+

          +---------------------------+---------------------------+
          |                           |
          ▼                           ▼
   +-------------+             +----------------------+
   | Eureka      |             | Spring Cloud Config  |
   | Discovery   |             | Server               |
   +-------------+             +----------------------+
```

---

## 🔄 Core System Workflow

The main generator workflow begins when a user creates or views a waste listing and requests nearby recycling options.

```text
                         Generator
                             |
                             ▼
                     Create / Select Waste
                             |
                             ▼
                      Waste Service
                             |
                             ▼
                    Matching Service
                             |
          +------------------+------------------+
          |                  |                  |
          ▼                  ▼                  ▼
   EcoBridge Database   Google Places     OpenStreetMap
      Recyclers          Businesses         / Overpass
          |                  |                  |
          +------------------+------------------+
                             |
                             ▼
                 Location / Distance Filtering
                             |
                             ▼
                   Recycler Comparison
                             |
                             ▼
                    Interactive Map
                             |
             +---------------+---------------+
             |               |               |
             ▼               ▼               ▼
         Waste Marker   EcoBridge Marker  Google Marker
                             |
                             ▼
                    Recycler Information
                             |
                 +-----------+-----------+
                 |                       |
                 ▼                       ▼
             Website                  Navigate
                                         |
                                         ▼
                                Google Maps Directions
                             |
                             ▼
                       Reserve Waste
                             |
                             ▼
                          Pickup
                             |
                             ▼
                     Complete Pickup
                             |
                  +----------+----------+
                  |                     |
                  ▼                     ▼
              Analytics          Notifications
```

---

## 🧩 Microservices

### API Gateway

The API Gateway acts as the public entry point for the backend.

**Responsibilities:**
- Routes frontend requests to the appropriate microservice.
- Provides a single backend entry point.
- Reduces direct exposure of individual services.
- Integrates the microservices architecture with the frontend.

### Authentication Service

Responsible for:
- User registration and login.
- JWT authentication.
- Access-token validation.
- Refresh-token handling.
- Google OAuth2.
- GitHub OAuth2.
- Role management.
- User-related statistics.

Supported roles include generator and recycler access.

### Waste Service

Responsible for:
- Creating waste listings.
- Updating waste information.
- Waste availability.
- Waste status management.
- Waste history.
- Waste reservation.
- Pickup-related waste state transitions.
- Waste statistics.

### Recycler Service

Responsible for EcoBridge-registered recyclers.

It manages:
- Recycler registration.
- Recycler profiles.
- Recycler type.
- Accepted waste types.
- Service radius.
- Total capacity.
- Available capacity.
- Recycler verification status.
- Recycler availability.
- Recycler location.
- Recycler information used by the matching service.

Recycler locations are stored using latitude and longitude so that they can participate in location-based matching.

---

## 🎯 Matching Service

The Matching Service is responsible for connecting waste generators with appropriate recycling options.

It combines multiple recycler sources instead of depending only on recyclers registered inside EcoBridge.

### Recycler Sources

```text
                       Matching Service
                              |
             +----------------+----------------+
             |                |                |
             ▼                ▼                ▼
      EcoBridge        Google Places       OpenStreetMap
       Recycler          Businesses          / Overpass
        Database
             |                |                |
             +----------------+----------------+
                              |
                              ▼
                    Location-Based Results
                              |
                              ▼
                     Recycler Comparison
```

**EcoBridge Registered Recyclers**

Registered recyclers are obtained from the Recycler Service and can include platform-specific information such as:
- Recycler name
- Company
- Accepted waste types
- Available capacity
- Service radius
- Distance
- Offered price
- Rating
- Estimated pickup time

**Google Places**

Google Places is used to discover recycling-related businesses that are available on Google's location platform but are not necessarily registered with EcoBridge.

The frontend uses the Google Maps JavaScript API and Places functionality to retrieve nearby businesses around the waste location.

Google-listed businesses can provide:
- Business name
- Address
- Coordinates
- Google Maps URL
- Website URL when available
- Place information

**OpenStreetMap / Overpass**

OpenStreetMap data provides an additional source for public recycling-related locations and businesses.

This allows EcoBridge to supplement platform-registered and Google-listed locations with publicly available geographic data.

---

## 🗺️ Recycler Discovery & Map

The recycler discovery experience combines all available sources and presents them through an interactive Google Map.

```text
                    Waste Location
                          |
                          ▼
                Nearby Recycler Search
                          |
       +------------------+------------------+
       |                  |                  |
       ▼                  ▼                  ▼
  EcoBridge            Google             OpenStreetMap
  Recycler             Places             / Overpass
       |                  |                  |
       +------------------+------------------+
                          |
                          ▼
                 Recycler Results
                          |
                          ▼
                  Interactive Map
```

### Map Marker System

The map visually distinguishes different locations:

```text
                    Google Map
                        |
          +-------------+-------------+
          |             |             |
          ▼             ▼             ▼
     🔴 Waste       🟢 EcoBridge     🟠 Google
       Location       Recycler        Business
          |             |             |
          +-------------+-------------+
                        |
                        ▼
                 Recycler Details
                        |
             +----------+----------+
             |                     |
             ▼                     ▼
          Website              Navigate
                                   |
                                   ▼
                          Google Maps Directions
```

**Waste Location**

The waste pickup location is displayed as the primary map marker.

**EcoBridge Recycler**

Registered EcoBridge recyclers are displayed separately and can expose platform-specific matching information.

**Google Business**

Google-listed recycling businesses are displayed separately so users can distinguish external businesses from EcoBridge-registered recyclers.

**Recycler Details**

Selecting a recycler/business displays available information such as:
- Name
- Address
- Distance
- Rating
- Price where available
- ETA where available
- Website where available
- Navigation option

Users can open Google Maps directions directly from the selected location.

---

## 🔐 Authentication & Authorization

EcoBridge uses Spring Security with JWT-based authentication.

```text
User
 │
 ▼
Login / OAuth2
 │
 ▼
Auth Service
 │
 ▼
JWT Access Token
 │
 ▼
Frontend
 │
 ▼
API Gateway / Services
 │
 ▼
JWT Authentication Filter
 │
 ▼
Role-Based Authorization
```

OAuth2 login is supported through:
- Google
- GitHub

JWT tokens are used to authenticate protected API requests.

---

## 📊 Analytics Service

The Analytics Service provides operational and dashboard-level insights.

**Responsibilities include:**
- Dashboard statistics.
- Waste analytics.
- Weekly reports.
- Pickup statistics.
- Recycling metrics.
- Platform activity information.

---

## 🔔 Notification Service

The Notification Service handles application notifications and event-driven communication.

**Responsibilities include:**
- User notifications.
- Event-based notifications.
- Kafka event consumption.
- Pickup-related alerts.
- Application status updates.

---

## ⚡ Event-Driven Communication

Kafka is used for asynchronous communication between services where event-driven processing is appropriate.

```text
             Microservice
                  |
                  ▼
             Kafka Event
                  |
          +-------+-------+
          |               |
          ▼               ▼
   Notification       Analytics
      Service           Service
```

This reduces unnecessary synchronous coupling and allows downstream services to process events independently.

---

## 🗄️ Data & Infrastructure Components

**PostgreSQL**

PostgreSQL is the primary relational database used by the backend services.

It stores persistent application data such as:
- Users
- Waste listings
- Recyclers
- Accepted waste types
- Pickup information
- Application state

**Redis**

Redis provides caching support to improve response times and reduce repeated database or service calls.

**Kafka**

Apache Kafka provides event streaming and asynchronous communication between microservices.

**Eureka Server**

Eureka provides service discovery.

Microservices register themselves with Eureka and can discover other services dynamically instead of relying entirely on hardcoded service locations.

**Spring Cloud Config Server**

The Config Server centralizes configuration for the microservices.

This allows shared configuration such as:
- Service URLs
- Database configuration
- Security configuration
- Eureka configuration
- Environment-specific settings

to be managed centrally.

---

## 🐳 Docker Architecture

EcoBridge services can be containerized and run together using Docker.

```text
                       Docker Environment
                              |
                              ▼
                    EcoBridge Network
                              |
        +---------------------+---------------------+
        |                     |                     |
        ▼                     ▼                     ▼
 Config Server          Eureka Server          API Gateway
    :8888                   :8761                  :8080
        |                     |                     |
        +---------------------+---------------------+
                              |
          +-------------------+-------------------+
          |                   |                   |
          ▼                   ▼                   ▼
     Auth Service       Waste Service       Recycler Service
       :8081                :8084                :8085
          |                   |                   |
          +-------------------+-------------------+
                              |
                              ▼
                       Matching Service
                           :8086
                              |
                 +------------+------------+
                 |                         |
                 ▼                         ▼
        Notification Service       Analytics Service
```

The exact exposed ports can vary depending on the local Docker or deployment environment.

---

## ☸ Kubernetes Architecture

EcoBridge can also be deployed using Kubernetes for container orchestration.

```text
                         Kubernetes Cluster
                                |
                                ▼
                         EcoBridge Namespace
                                |
          +---------------------+---------------------+
          |                     |                     |
          ▼                     ▼                     ▼
    Config Server         Eureka Server          API Gateway
          |                     |                     |
          +---------------------+---------------------+
                                |
          +---------------------+---------------------+
          |                     |                     |
          ▼                     ▼                     ▼
    Auth Service          Waste Service        Recycler Service
          |                     |                     |
          +---------------------+---------------------+
                                |
                                ▼
                         Matching Service
                                |
                    +-----------+-----------+
                    |                       |
                    ▼                       ▼
             Notification              Analytics
                Service                  Service
                    |                       |
                    +-----------+-----------+
                                |
                                ▼
                         Kafka / Redis
                                |
                                ▼
                           PostgreSQL
```

---

## 🚀 Deployment

The platform supports multiple deployment strategies:
- Local development.
- Docker Compose.
- Kubernetes.
- Render for backend services.
- Vercel for the frontend.

The deployed architecture separates the frontend from the backend services while maintaining API-based communication through the gateway and individual service endpoints where required.

---

## 📈 Monitoring

Application health and metrics are monitored using:
- Spring Boot Actuator.
- Prometheus.
- Grafana.

```text
                 EcoBridge Services
                         |
                         ▼
                Spring Boot Actuator
                         |
                         ▼
                     Prometheus
                         |
                         ▼
                      Grafana
                         |
             +-----------+-----------+
             |                       |
             ▼                       ▼
       Metrics Dashboard       Service Monitoring
```

This provides visibility into service health, application metrics and system performance.

---

## 🔄 CI/CD

GitHub Actions is used to automate parts of the build and deployment workflow.

```text
Developer
    |
    ▼
Git Commit
    |
    ▼
GitHub Repository
    |
    ▼
GitHub Actions
    |
    +---------> Build
    |
    +---------> Test
    |
    +---------> Docker Build
    |
    ▼
Deployment
    |
    +---------> Render
    |
    +---------> Kubernetes
```

---

## 🌐 External Integrations

EcoBridge integrates with external platforms for authentication, mapping and recycler discovery.

| Integration | Purpose |
|---|---|
| Google OAuth2 | User authentication |
| GitHub OAuth2 | User authentication |
| Google Maps | Interactive maps and navigation |
| Google Places | Nearby business discovery |
| OpenStreetMap | Public geographic and recycling-location data |
| Overpass API | Querying OpenStreetMap geographic data |

---

## 📌 Architecture Highlights

- Microservices-based backend.
- API Gateway for centralized routing.
- Eureka-based service discovery.
- Centralized configuration using Spring Cloud Config.
- JWT authentication and role-based authorization.
- Google and GitHub OAuth2 authentication.
- Location-aware recycler matching.
- EcoBridge recycler discovery.
- Google Places business discovery.
- OpenStreetMap / Overpass integration.
- Interactive Google Maps visualization.
- Website and navigation support for discovered businesses.
- Event-driven communication using Kafka.
- Redis caching.
- PostgreSQL persistence.
- Dockerized services.
- Kubernetes deployment.
- GitHub Actions CI/CD.
- Prometheus and Grafana monitoring.
- Cloud deployment using Render and Vercel.