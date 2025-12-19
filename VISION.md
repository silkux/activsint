# 🐾 Project Vision: Intelligent Animal Rights Notification System

## Core Objective
An intelligent notification system that identifies critical moments for animal rights activism, enabling activists to respond quickly and effectively to relevant events such as animal deaths in captivity, policy changes, corporate decisions, and other opportunities for impactful advocacy.

---

## 🏗️ System Architecture & Logic

### 1. Event Detection & Monitoring
*   **News Aggregation:** Monitor global news sources (NewsAPI, Google News) for animal-related incidents.
*   **Social Media Listening:** Track trending topics and viral moments (e.g., "zoo death", "circus accident").
*   **Government & Policy Tracking:** Follow legislative changes, permits, and regulatory decisions.
*   **Industry Monitoring:** Track corporate announcements from zoos, aquariums, factory farms, and labs.

### 2. Event Classification System
Categorize events by urgency and type:

*   **Urgency Level:**
    *   🚨 **Immediate:** Breaking news (escaping animals, active transport).
    *   🔴 **High:** 24-48h window (upcoming vote, protest opportunity).
    *   🟡 **Medium:** Upcoming events (circus tour dates).

*   **Event Types:**
    *   **Captivity:** Deaths/injuries in zoos/aquariums.
    *   **Abuse:** Exposed practices, neglect cases.
    *   **Policy:** Legislative votes, permit applications.
    *   **Corporate:** Business decisions affecting animals.
    *   **Entertainment:** Circus arrivals, rodeos.
    *   **Science:** Studies on animal sentience/welfare.

### 3. Smart Notification System
*   **Personalized Alerts:** Routing based on user location and interest categories.
*   **Action Recommendations:** Every alert includes a specific "Call to Action" (Petition, Protest, Email).
*   **Timing Optimization:** Alerts sent when impact potential is highest.
*   **Batching:** Digest mode for non-urgent updates.

---

## 💻 Tech Stack Vision (Target Architecture)

### Backend
*   **Language:** Python (for NLP & Scraping capabilities).
*   **Web Scraping:** Scrapy, BeautifulSoup (for municipal bulletins, NGO investigations).
*   **NLP:** Transformers (DistilBERT) for event classification and urgency scoring.

### Data & Storage
*   **Structured Data:** PostgreSQL (Events, Contacts, Activists).
*   **Unstructured Data:** MongoDB (Raw news feeds, Social streams).
*   **Vector Search:** Weaviate (for RAG/Semantic query of past events).

### Notification Services
*   **Push:** Firebase Cloud Messaging (FCM).
*   **SMS:** Twilio (Critical alerts only).
*   **Bots:** Telegram/Discord integrations for coordination groups.

---

## 🗄️ Database Schema Blueprint

```sql
-- Events Table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),  -- death, circus, legislation, outbreak
    urgency VARCHAR(20), -- critical, high, medium
    location GEOGRAPHY(POINT),
    facility_name VARCHAR(200),
    animal_species VARCHAR(100),
    date_detected TIMESTAMP,
    description TEXT,
    source_url TEXT,
    status VARCHAR(50)  -- active, resolved
);

-- Activist Users
CREATE TABLE activists (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100),
    location GEOGRAPHY(POINT),
    notification_prefs JSONB,
    alert_radius INTEGER  -- km
);
```

---

## 📢 Notification Templates (Examples)

### **TYPE 1: DEATH IN CAPTIVITY**
> **Header:** 🚨 URGENT: Death at [Zoo Name]
> **Details:** Lowland Gorilla "Eyare" (2 years old) died due to human error.
> **Action:** Call Zoo Director [+1-555-0199]. Protest at Main Gates [Map Link].
> **Context:** 12 other activists are near you.

### **TYPE 2: CIRCUS DETECTED**
> **Header:** ⚠️ CIRCUS WITH ANIMALS SPOTTED
> **Details:** Circus Dihany setup in [City]. 10+ dogs confirmed in neglect.
> **Action:** File complaint with City Council. Join daily protest at 5 PM.
> **Legal:** Municipal permit granted but contestable under Law Art. 3.

### **TYPE 3: LEGISLATIVE ALERT**
> **Header:** 🔵 LEGISLATIVE ALERT: [City]
> **Details:** Council voting to reverse ban on circus animals.
> **Window:** 48 hours remaining for public comment.
> **Action:** Attend council meeting. Call Councilor [Name].

---

## 🗺️ Real-Time Visualization (Implemented Features)
*   **Latent Globe:** 3D Visualization of global events.
*   **Live Activist Layer:** Green pulses indicating active operatives.
*   **RSS Integration:** Real-time news aggregation from Google News & The Guardian.

---

## 🚀 Success Metrics
*   **Relevance:** Alerts sent within 6 hours of event.
*   **Mobilization:** 30%+ activist response rate per alert.
*   **Impact:** 1+ facility closure or policy change per quarter.
*   **Coverage:** Media coverage on 40%+ of flagged events.

> "Let's stop missing these moments. Every death should spark action. Every circus should face resistance. Every permit should be contested."
