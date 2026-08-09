# 🗺️ Maps & Recycler Discovery

EcoBridge uses location-based discovery to help waste generators find recycling options near a waste pickup location.

The recycler discovery system combines three different sources:

1. **EcoBridge Registered Recyclers**
2. **Google Places Businesses**
3. **OpenStreetMap / Overpass Data**

This allows EcoBridge to show both recyclers registered on the platform and nearby recycling businesses that are not registered with EcoBridge.

---

## 🔎 Recycler Discovery Flow

```text
                         Waste Location
                              │
                              ▼
                    Matching / Discovery
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
      EcoBridge          Google Places     OpenStreetMap
       Recyclers          Businesses        / Overpass
             │                │                │
             └────────────────┼────────────────┘
                              │
                              ▼
                    Nearby Recycler Results
                              │
                              ▼
                     Recycler Comparison
                              │
                              ▼
                     Interactive Google Map
```

---

## ♻️ EcoBridge Registered Recyclers

EcoBridge maintains its own recycler database through the Recycler Service. Registered recyclers contain platform-specific information such as:

- Recycler name
- Company name
- Accepted waste types
- Service radius
- Total capacity
- Available capacity
- Verification status
- Recycler status
- Latitude and longitude

These recyclers participate directly in EcoBridge's matching and comparison system.

---

## 📍 Google Places Discovery

Google Places is used to discover nearby recycling-related businesses that may not be registered with EcoBridge.

The frontend searches around the waste location and retrieves available business information.

Depending on the information provided by Google, a business may contain:

- Business name
- Address
- Latitude and longitude
- Google Maps URL
- Website
- Place information

Google-listed businesses are displayed separately from EcoBridge-registered recyclers on the map.

---

## 🌍 OpenStreetMap / Overpass

OpenStreetMap provides an additional public geographic data source.

Overpass queries can be used to discover relevant recycling locations around the waste pickup coordinates.

This provides another layer of location discovery beyond EcoBridge's own database and Google Places.

---

## 🗺️ Interactive Recycler Map

The frontend displays discovered locations using Google Maps.

Different marker colors distinguish the available sources:

```text
                    Google Map
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
      🔴 Waste      🟢 EcoBridge    🟠 Google
       Location       Recycler       Business
          │             │             │
          └─────────────┼─────────────┘
                        │
                        ▼
                 Recycler Details
```

**🔴 Waste Location**

The waste pickup location is shown as the central reference point.

**🟢 EcoBridge Recycler**

Represents a recycler registered within the EcoBridge platform.

**🟠 Google Business**

Represents a recycling-related business discovered through Google Places.