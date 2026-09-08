from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth import router as auth_router
from routes.patients import router as patients_router
from routes.doctors import router as doctors_router
from routes.appointments import router as appointments_router
from routes.blood_sos import router as blood_sos_router
from routes.concerns import router as concerns_router
from routes.caregiver import router as caregiver_router
from routes.notifications import router as notifications_router
from routes.admin import router as admin_router

app = FastAPI(
    title="CarePath 360 API",
    description="Care Coordination and Emergency Blood Support Platform for Cancer Survivorship",
    version="1.0.0"
)

# Enable CORS for local Vite development and deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers under /api
app.include_router(auth_router, prefix="/api")
app.include_router(patients_router, prefix="/api")
app.include_router(doctors_router, prefix="/api")
app.include_router(appointments_router, prefix="/api")
app.include_router(blood_sos_router, prefix="/api")
app.include_router(concerns_router, prefix="/api")
app.include_router(caregiver_router, prefix="/api")
app.include_router(notifications_router, prefix="/api")
app.include_router(admin_router, prefix="/api")

@app.get("/")
def root():
    return {
        "platform": "CarePath 360",
        "tagline": "From Cancer Recovery to Emergency Support — One Connected Care Journey",
        "status": "Operational",
        "disclaimer": "DEMO DATA — NOT REAL PATIENT OR CLINICAL INFORMATION. Non-diagnostic system.",
        "api_docs": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "CarePath 360 Backend", "ready": True}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
