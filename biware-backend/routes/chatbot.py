from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter()

class ChatRequest(BaseModel):
    messages: list

@router.post("/chat")
async def chat(request: ChatRequest):
    user_message = request.messages[-1]["content"].lower()
    
    if "service" in user_message or "expertise" in user_message:
        reply = "Nos expertises : Business Intelligence, Risk Management, Customer Intelligence, Advanced Analytics, Data Management, et Formations Power BI & SAS."
    elif "devis" in user_message:
        reply = "Pour obtenir un devis personnalisé, cliquez sur le bouton 'Demander un devis' sur notre site ou contactez-nous à contact@biware-consulting.com"
    elif "formation" in user_message:
        reply = "Nous proposons des formations Power BI, SAS® et sur mesure. Rendez-vous dans la section Formations du site."
    elif "contact" in user_message:
        reply = "Vous pouvez nous contacter par email à contact@biware-consulting.com ou via le formulaire de contact sur notre site."
    elif "synapse" in user_message:
        reply = "Synapse est notre solution RH qui mesure l'engagement et la santé relationnelle des équipes grâce à l'IA."
    elif "credit" in user_message:
        reply = "Credit Squares est notre solution de scoring crédit et risk management pour institutions financières."
    elif "postuler" in user_message or "emploi" in user_message or "carriere" in user_message:
        reply = "Consultez nos offres d'emploi dans la section Carrières. Vous pouvez aussi postuler spontanément sur notre page dédiée."
    else:
        reply = "Merci pour votre message ! Je vous invite à explorer notre site (Mission, Clients, Produits, Formations, Expertises, Carrières). Pour toute question spécifique, contactez directement notre équipe."
    
    return {"reply": reply}