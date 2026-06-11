from fastapi import APIRouter, Form
from services.service_mail import envoyer_devis

router = APIRouter()

@router.post("/api/devis")
async def recevoir_devis(
    prenom: str = Form(...),
    nom: str = Form(...),
    email: str = Form(...),
    telephone: str = Form(...),
    societe: str = Form(None),
    secteur: str = Form(...),
    besoin: str = Form(...),
    message: str = Form(None)
):
   
    print(f"=== NOUVELLE DEMANDE DE DEVIS ===")
    print(f"Prénom: {prenom}")
    print(f"Nom: {nom}")
    print(f"Email: {email}")
    print(f"Téléphone: {telephone}")
    print(f"Société: {societe}")
    print(f"Secteur: {secteur}")
    print(f"Besoin: {besoin}")
    print(f"Message: {message}")
    
    succes = envoyer_devis(
        prenom=prenom,
        nom=nom,
        email=email,
        telephone=telephone,
        societe=societe,
        secteur=secteur,
        besoin=besoin,
        message=message
    )
    
    if succes:
        return {"status": "ok", "message": "Devis demandé avec succès"}
    return {"status": "error", "message": "Erreur lors de l'envoi"}