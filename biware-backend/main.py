# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import jobs, candidature, devis, formation, contact

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://biware-frontend.onrender.com",    # ← Site en ligne
        "https://biware-backend.onrender.com",     # ← API en ligne
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(jobs.router)
app.include_router(candidature.router)
app.include_router(devis.router)
app.include_router(formation.router)
app.include_router(contact.router)

@app.get("/")
def root():
    return {"message": "API Biware Consulting", "status": "online"}

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)