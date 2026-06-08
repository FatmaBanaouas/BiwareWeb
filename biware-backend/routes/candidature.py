# routes/candidature.py
from fastapi import APIRouter, UploadFile, File, Form
from services.service_mail import envoyer_candidature

router = APIRouter()

@router.post("/api/candidature")
async def recevoir_candidature(
    nom:     str        = Form(...),
    prenom:  str        = Form(...),
    email:   str        = Form(...),
    poste:   str        = Form(...),
    message: str        = Form(...),
    cv:      UploadFile = File(...)
):
    contenu_cv = await cv.read()

    succes = envoyer_candidature(
        nom=nom,
        prenom=prenom,
        email=email,
        poste=poste,
        message=message,
        cv_bytes=contenu_cv,
        cv_nom=cv.filename
    )

    if succes:
        return {"status": "ok", "message": "Candidature envoyée !"}
    return {"status": "error", "message": "Échec de l'envoi"}