# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import jobs, devis, formation, contact

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8080",  # ← le serveur du fichier admin
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
)
app.include_router(jobs.router)
app.include_router(devis.router)
app.include_router(formation.router)
app.include_router(contact.router)

@app.get("/")
def root():
    return {"message": "API Biware Consulting", "status": "online"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)