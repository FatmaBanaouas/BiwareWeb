from fastapi import APIRouter, Form
from services.service_mail import envoyer_demande_formation

router = APIRouter()

@router.post("/api/demande-formation")
async def recevoir_demande_formation(
    prenom: str = Form(...),
    nom: str = Form(...),
    email: str = Form(...),
    telephone: str = Form(...),
    formation_souhaitee: str = Form(...),
    message: str = Form(None)
):
    """
    Reçoit une demande de programme de formation depuis le site Biware.
    
    Formations possibles :
    - Formation Power BI
    - Formation SAS®
    - Formations sur mesure
    
    Envoie un email à l'administrateur et une confirmation au client.
    """
    
   
    print(f"=== NOUVELLE DEMANDE DE FORMATION ===")
    print(f"Prénom: {prenom}")
    print(f"Nom: {nom}")
    print(f"Email: {email}")
    print(f"Téléphone: {telephone}")
    print(f"Formation souhaitée: {formation_souhaitee}")
    print(f"Message: {message}")
    print(f"====================================")
    

    formations_disponibles = [
        "Formation Power BI",
        "Formation SAS®",
        "Formations sur mesure",
        "Power BI",
        "SAS",
        "sur mesure"
    ]
    

    formation_valide = any(
        formation_souhaitee.lower() == f.lower() or 
        formation_souhaitee.lower() in f.lower() or 
        f.lower() in formation_souhaitee.lower()
        for f in formations_disponibles
    )
    
    if not formation_valide:
        print(f"Attention: Formation non standard demandée: {formation_souhaitee}")
    
    

    succes = envoyer_demande_formation(
        prenom=prenom,
        nom=nom,
        email=email,
        telephone=telephone,
        formation_souhaitee=formation_souhaitee,
        message=message
    )
    
    if succes:
        return {
            "status": "ok", 
            "message": "Demande de formation envoyée avec succès",
            "formation": formation_souhaitee
        }
    
    return {
        "status": "error", 
        "message": "Erreur lors de l'envoi de la demande de formation"
    }


@router.get("/api/formations-disponibles")
async def get_formations_disponibles():
    """
    Endpoint pour récupérer la liste des formations disponibles
    (utile pour le frontend)
    """
    return {
        "formations": [
            {
                "id": 1,
                "titre": "Formation Power BI",
                "description": "Maîtrisez la visualisation et l'analyse de données avec l'outil Microsoft de référence.",
                "duree": "2-5 jours",
                "certification": "Microsoft Power BI",
                "niveau": "Débutant à Avancé"
            },
            {
                "id": 2,
                "titre": "Formation SAS®",
                "description": "Devenez expert en analyse statistique et gestion des données avec la plateforme SAS®.",
                "duree": "3-5 jours",
                "certification": "SAS® Certified Partner",
                "niveau": "Intermédiaire à Expert"
            },
            {
                "id": 3,
                "titre": "Formations sur mesure",
                "description": "Des programmes personnalisés adaptés aux besoins spécifiques de votre organisation.",
                "duree": "Variable",
                "certification": "Programme personnalisé",
                "niveau": "Tous niveaux"
            }
        ]
    }