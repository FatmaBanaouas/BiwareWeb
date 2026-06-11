from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import json
import os

from models import get_db, JobOffer

router = APIRouter(prefix="/api", tags=["jobs"])


class JobCreate(BaseModel):
    title: str
    location: str
    contract: str
    date: str
    shortDesc: str
    description: str
    requirements: str  
    benefits: str  
    published: bool = True


@router.post("/admin/jobs")
def create_job_admin(job: JobCreate, db: Session = Depends(get_db)):
    """POST /api/admin/jobs - Ajouter une offre (admin)"""
    try:
        new_job = JobOffer(
            title=job.title,
            location=job.location,
            contract=job.contract,
            date=job.date,
            published=job.published,
            short_desc=job.shortDesc,
            description=job.description,
            requirements=job.requirements,
            benefits=job.benefits
        )
        db.add(new_job)
        db.commit()
        db.refresh(new_job)
        return {"success": True, "job": new_job.to_dict()}
    except Exception as e:
        db.rollback()
        print(f"Erreur: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/jobs")
def get_all_jobs(db: Session = Depends(get_db)):
    """GET /api/jobs - Récupère toutes les offres publiées"""
    try:
        jobs = db.query(JobOffer).filter(JobOffer.published == True).order_by(JobOffer.created_at.desc()).all()
        return {"success": True, "jobs": [job.to_dict() for job in jobs]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/jobs/{job_id}")
def get_job_by_id(job_id: str, db: Session = Depends(get_db)): 
    try:
        # Extraire le vrai id numérique
        real_id = int(job_id.replace("job-", "")) if job_id.startswith("job-") else int(job_id)
        job = db.query(JobOffer).filter(JobOffer.id == real_id).first()
        if not job:
            raise HTTPException(status_code=404, detail="Offre non trouvée")
        return {"success": True, "job": job.to_dict()}
    except ValueError:
        raise HTTPException(status_code=400, detail="ID invalide")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@router.delete("/admin/jobs/{job_id}")
def delete_job_admin(job_id: int, db: Session = Depends(get_db)):
    """DELETE /api/admin/jobs/{id} - Supprimer une offre"""
    try:
        job = db.query(JobOffer).filter(JobOffer.id == job_id).first()
        if not job:
            raise HTTPException(status_code=404, detail="Offre non trouvée")
        db.delete(job)
        db.commit()
        return {"success": True, "message": f"Offre '{job.title}' supprimée"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))