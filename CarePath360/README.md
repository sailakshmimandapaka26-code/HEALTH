# CarePath 360

> **"From Cancer Recovery to Emergency Support — One Connected Care Journey."**

CarePath 360 is a comprehensive healthcare support and care coordination platform for cancer survivors and long-term patients. It combines longitudinal cancer survivorship tracking, personalized follow-up monitoring, real-time doctor availability & appointment booking, patient-controlled caregiver permissions, and proximity-based emergency blood coordination (**BloodSOS**).

---

## ⚠️ Important Medical Safety Rule & Clinical Guardrail

**This is NOT a diagnostic system.**

CarePath 360 is strictly a healthcare support, care coordination, and decision-support platform.
It **NEVER**:
- Diagnoses cancer or other diseases
- Prescribes medicines or changes medication dosages
- Decides whether a patient needs a specific treatment
- Medically approves blood donors or tests transfusion compatibility
- Replaces a qualified doctor or clinical oncologist

All medical decisions must be made by qualified healthcare professionals.
All data in demo mode is clearly labeled: **`DEMO DATA — NOT REAL PATIENT INFORMATION`**.

---

## Key Features & Modules

1. **Cancer Health Passport**: Comprehensive patient history (cancer type, stage, chemo regimen, radiation, surgery, current medications, allergies, treating hospital, treating oncologist, emergency contact).
2. **Longitudinal Cancer Journey**: Interactive visual timeline tracking milestones from initial diagnosis through multi-modality therapies to active survivorship.
3. **Medical Report Management**: Repository for blood/lab work, mammograms, imaging, pathology, and discharge summaries with mock viewing and downloads.
4. **Personalized Follow-up Monitoring**: Tailored monitoring cards (Heart Health, Bone Density, Neuropathy, Blood Counts, Emotional Wellbeing) with Low/Moderate/High levels and discussion prompts.
5. **AI Care Coordination Engine**: Informational synthesis proposing follow-up tasks and doctor discussion topics with zero diagnostic claims.
6. **New Health Concern Organization**: Symptom intake categorized into safe coordination buckets:
   - **GREEN**: Routine follow-up
   - **YELLOW**: Contact treating doctor within 24–48 hours
   - **RED**: Seek urgent emergency medical evaluation immediately
7. **Emergency Health Timeline**: Tracks condition evolution: *What Changed*, *When It Changed*, and *Who Reported It*.
8. **Doctor Availability ("Find My Doctor")**: Real-time availability badges (🟢 Available, 🟡 Available Later, 🔴 Not Available), consultation slots, and direct appointment booking.
9. **Hospital Oncology Command Center**: Manage oncologists, toggle availability in real-time, review and accept/reject consultation requests.
10. **Caregiver Access & Privacy Matrix**: Patient sovereign toggles for Appointments, Reports, Health Timeline, and Notifications.
11. **BloodSOS Proximity-Based Progressive Escalation**:
    - **Stage 1**: 1 KM radius search
    - **Stage 2**: Progressive expansion to 3 KM
    - **Stage 3**: Progressive expansion to 5 KM + Regional Fallback Network (Blood banks, Partner hospitals, NGOs)
    - **AI Operational Priority Engine**: Scores donor candidates (0–99) based on ABO/Rh preliminary compatibility, distance (Haversine formula), ETA, availability, and response rate.
    - **Live Map**: Leaflet OpenStreetMap with dynamic radius circles and color-coded donor status markers.
    - **1-Click Simulation Button**: Demonstrates the full hackathon scenario instantly.
12. **Admin Operations & Recharts Analytics**: System analytics, hospital/clinician verification, and immutable security audit logging.

---

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Recharts, Leaflet, React-Leaflet
- **Backend**: Python 3.14, FastAPI, Uvicorn, Pydantic
- **Maps**: Leaflet + OpenStreetMap
- **State & Sync**: Bidirectional AppContext with automatic fallback for zero-friction standalone preview

---

## Quickstart & How to Run

### Prerequisites
- Node.js (v18+) & `npm`
- Python (v3.10+)

---

### Step 1: Install Dependencies

#### Backend:
```bash
cd CarePath360/backend
pip install -r requirements.txt
```

#### Frontend:
```bash
cd CarePath360/frontend
npm.cmd install
```

---

### Step 2: Start the Services

#### Terminal 1 (Backend):
```bash
cd CarePath360/backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
API Documentation will be available at: `http://localhost:8000/docs`

#### Terminal 2 (Frontend):
```bash
cd CarePath360/frontend
npm.cmd run dev
```
Open your browser at: `http://localhost:5173`

---

## Demo Accounts & 1-Click Role Switcher

CarePath 360 features an instant 1-click role switcher accessible directly from the top navigation bar or the login screen (`/login`):

| Role | Name | Clinical / Operational Scope |
| :--- | :--- | :--- |
| **PATIENT** | Sarah Jenkins | Stage IIA Breast Cancer Survivor (Passport, Timeline, Monitoring, Booking) |
| **HOSPITAL** | Metro Cancer Institute | Oncology Command Center, Doctor Schedules, BloodSOS Dispatch |
| **DOCTOR** | Dr. Priya Sharma | Medical Oncology Specialist, Availability Slot Toggling |
| **CAREGIVER** | Mark Jenkins | Designated Spouse Caregiver (Permission-Gated Access) |
| **DONOR** | Alex Rivera | Registered B+ Blood Donor (Proximity Alert & Dispatch) |
| **ADMIN** | Operations Admin | Verification Queue, Recharts Analytics, Audit Logs |

---

## Hackathon Demo Walkthrough Scenario

1. **Patient Login**: Click **Role Switcher** $\to$ Select **Patient (Sarah Jenkins)**.
2. **Health Passport**: Open **My Health Passport** to review cancer staging, chemo/radiation details, and click **Edit Passport Details**.
3. **Cancer Journey**: Navigate to **Cancer Journey** to see the visual timeline from diagnosis to survivorship. Click **Add Journey Milestone**.
4. **Monitoring Plan**: Open **Monitoring Plan** to see personalized guidance for Heart Health, Bone Density, Neuropathy, and Labs with doctor discussion prompts.
5. **Report Concern**: Click **Health Concerns** $\to$ Submit a symptom (e.g. "Mild tingling in fingertips") $\to$ Observe safe **GREEN / YELLOW** triage guidance.
6. **Find Doctor**: Navigate to **Find Doctor** $\to$ Search for Dr. Priya Sharma $\to$ Book an appointment for 4:30 PM.
7. **Hospital Real-Time Sync**: Switch role to **Hospital Command** $\to$ Observe the consultation request in the queue and click **Accept**. Observe doctor availability toggles.
8. **BloodSOS Progressive Radius Demo**:
   - Go to **Blood Support (BloodSOS)** in the Hospital menu.
   - Click the prominent button: **`Run Hackathon Emergency Simulation`**.
   - Watch the live Leaflet map search Stage 1 (1 KM), automatically expand to Stage 2 (3 KM), simulate donor responses, and display:
     **`✅ EMERGENCY BLOOD REQUIREMENT FULFILLED (4/4 Units Confirmed)`**.
9. **Admin Verification & Analytics**: Switch to **Admin** to inspect Recharts monthly care trends and verification badges.
