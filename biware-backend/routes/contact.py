from fastapi import APIRouter, Form
from services.service_mail import envoyer_contact

router = APIRouter()

@router.post("/api/contact")
async def recevoir_contact(
    nom: str = Form(...),
    email: str = Form(...),
    message: str = Form(...)
):
    print(f"=== NOUVEAU MESSAGE DE CONTACT ===")
    print(f"Nom: {nom}")
    print(f"Email: {email}")
    print(f"Message: {message}")

    succes = envoyer_contact(
        nom=nom,
        email=email,
        message=message
    )

    if succes:
        return {"status": "ok", "message": "Message envoyé avec succès"}
    return {"status": "error", "message": "Erreur lors de l'envoi"}