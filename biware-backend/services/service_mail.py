
import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from dotenv import load_dotenv

load_dotenv()

SMTP_HOST     = os.getenv("SMTP_HOST")
SMTP_PORT     = int(os.getenv("SMTP_PORT", 587))
SMTP_USER     = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
DEST_EMAIL    = os.getenv("DEST_EMAIL")



def envoyer_devis(prenom, nom, email, telephone, societe, secteur, besoin, message):
    try:
        msg = MIMEMultipart()
        msg["From"] = SMTP_USER
        msg["To"] = DEST_EMAIL
        msg["Subject"] = f"Nouvelle demande de devis — {prenom} {nom}"

        corps = f"""Bonjour,

Une nouvelle demande de devis a été soumise via le site biware-consulting.com.

CLIENT
Nom         : {prenom} {nom}
Email       : {email}
Téléphone   : {telephone}
Société     : {societe or 'Non renseigné'}

PROJET
Secteur     : {secteur}
Besoin      : {besoin}

MESSAGE
{message or 'Aucun message complémentaire.'}

---
À contacter sous 24h.
Biware Consulting · contact@biware-consulting.com · +216 36 361 801
"""
        msg.attach(MIMEText(corps, "plain", "utf-8"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as serveur:
            serveur.ehlo()
            serveur.starttls()
            serveur.ehlo()
            serveur.login(SMTP_USER, SMTP_PASSWORD)
            serveur.sendmail(SMTP_USER, DEST_EMAIL, msg.as_string())

        envoyer_confirmation_client(prenom, nom, email)
        return True

    except Exception as e:
        print(f"Erreur envoi devis : {e}")
        return False

def envoyer_confirmation_client(prenom, nom, email_client):
    """Envoie un email de confirmation au client"""
    try:
        msg = MIMEMultipart()
        msg["From"] = SMTP_USER
        msg["To"] = email_client
        msg["Subject"] = "Biware Consulting - Accusé de réception de votre demande de devis"

        corps = f"""
Bonjour {prenom} {nom},

Nous accusons bonne réception de votre demande de devis.

Un de nos experts vous contactera dans les plus brefs délais (sous 24h ouvrées) pour échanger sur votre projet.

En attendant, n'hésitez pas à visiter notre site pour découvrir nos solutions :
🌐 https://biware-consulting.com

Cordialement,
L'équipe Biware Consulting
---
📧 contact@biware-consulting.com
📞 +216 29 969 439
📍 Rue du Lac Windermere , Résidence ERRAWDHA, Escalier 03, 03ème étage,1053 Les Berges du Lac, Tunis – Tunisie
"""
        msg.attach(MIMEText(corps, "plain"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as serveur:
            serveur.ehlo()
            serveur.starttls()
            serveur.ehlo()
            serveur.login(SMTP_USER, SMTP_PASSWORD)
            serveur.sendmail(SMTP_USER, DEST_EMAIL, msg.as_string())

        return True

    except Exception as e:
        print(f"Erreur envoi confirmation client : {e}")
        return False

# À ajouter dans service_mail.py

def envoyer_demande_formation(
    prenom: str, 
    nom: str, 
    email: str, 
    telephone: str, 
    formation_souhaitee: str, 
    message: str = None
):
    """Envoie une demande de programme de formation à l'administrateur"""
    try:
        msg = MIMEMultipart()
        msg["From"] = SMTP_USER
        msg["To"] = DEST_EMAIL
        msg["Subject"] = f" Demande de formation — {formation_souhaitee} | {prenom} {nom}"

        # Déterminer l'emoji en fonction de la formation
        emoji = "" if "Power BI" in formation_souhaitee else "" if "SAS" in formation_souhaitee else ""
        
        corps = f"""Bonjour l'équipe Biware,

 NOUVELLE DEMANDE DE PROGRAMME DE FORMATION 

CANDIDAT

Nom complet   : {prenom} {nom}
Email         : {email}
Téléphone     : {telephone}

FORMATION DEMANDÉE

{formation_souhaitee}

MESSAGE DU CANDIDAT

{message or 'Aucun message complémentaire.'}


À contacter sous 24h pour :
• Discuter des objectifs pédagogiques
• Proposer un programme personnalisé
• Envoyer un devis détaillé

Biware Consulting
📧 contact@biware-consulting.com
📞 +216 29 969 439

"""
        msg.attach(MIMEText(corps, "plain", "utf-8"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as serveur:
            serveur.ehlo()
            serveur.starttls()
            serveur.ehlo()
            serveur.login(SMTP_USER, SMTP_PASSWORD)
            serveur.sendmail(SMTP_USER, DEST_EMAIL, msg.as_string())

        # Envoyer une confirmation au client
        envoyer_confirmation_formation_client(prenom, nom, email, formation_souhaitee)
        return True

    except Exception as e:
        print(f"❌ Erreur envoi demande formation : {e}")
        return False


def envoyer_confirmation_formation_client(prenom, nom, email_client, formation_souhaitee):
    """Envoie un email de confirmation au client pour sa demande de formation"""
    try:
        msg = MIMEMultipart()
        msg["From"] = SMTP_USER
        msg["To"] = email_client
        msg["Subject"] = "Biware Consulting - Confirmation de votre demande de formation"

        # Déterminer l'emoji et le message personnalisé en fonction de la formation
        if "Power BI" in formation_souhaitee:
            message_specifique = "Notre expert Power BI vous contactera pour définir le programme adapté à vos besoins en data visualisation."
            lien_guide = "https://biware-consulting.com/guides/power-bi"
        elif "SAS" in formation_souhaitee:
            message_specifique = "Notre consultant SAS® certifié vous contactera pour élaborer un parcours de formation sur mesure."
            lien_guide = "https://biware-consulting.com/guides/sas"
        else:
            message_specifique = "Notre équipe pédagogique vous contactera pour co-construire un programme 100% personnalisé."
            lien_guide = "https://biware-consulting.com/formations-sur-mesure"

        corps = f"""
Bonjour {prenom} {nom},

Nous vous remercions pour votre demande de programme de formation concernant :

{formation_souhaitee} 

{message_specifique}

PROCHAINES ÉTAPES :
• Un expert formation vous appellera sous 24h ouvrées
• Ensemble, nous définirons vos objectifs pédagogiques
• Nous vous enverrons un programme détaillé et un devis personnalisé

EN ATTENDANT :
• Consultez notre catalogue complet : {lien_guide}
• Découvrez nos certifications : https://biware-consulting.com/certifications

Besoin d'une réponse immédiate ?
Contactez-nous directement au +216 29 969 439

Cordialement,
L'équipe Biware Consulting
---
🌐 https://biware-consulting.com
📧 formation@biware-consulting.com
📍 Rue du Lac Windermere , Résidence ERRAWDHA, Escalier 03, 03ème étage,1053 Les Berges du Lac, Tunis – Tunisie
"""
        msg.attach(MIMEText(corps, "plain", "utf-8"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as serveur:
            serveur.ehlo()
            serveur.starttls()
            serveur.ehlo()
            serveur.login(SMTP_USER, SMTP_PASSWORD)
            serveur.sendmail(SMTP_USER, email_client, msg.as_string())

        print(f"✓ Email de confirmation envoyé à {email_client}")
        return True

    except Exception as e:
        print(f"❌ Erreur envoi confirmation formation client : {e}")
        return False

def envoyer_contact(nom: str, email: str, message: str):
    """Envoie un message de contact simple à l'administrateur"""
    try:
        msg = MIMEMultipart()
        msg["From"] = SMTP_USER
        msg["To"] = DEST_EMAIL
        msg["Subject"] = f"Nouveau message de contact — {nom}"

        corps = f"""Bonjour l'équipe Biware,

NOUVEAU MESSAGE DE CONTACT

Nom     : {nom}
Email   : {email}

MESSAGE
{message}

---
À traiter sous 24h.
Biware Consulting · contact@biware-consulting.com · +216 36 361 801
"""
        msg.attach(MIMEText(corps, "plain", "utf-8"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as serveur:
            serveur.ehlo()
            serveur.starttls()
            serveur.ehlo()
            serveur.login(SMTP_USER, SMTP_PASSWORD)
            serveur.sendmail(SMTP_USER, DEST_EMAIL, msg.as_string())

        # Confirmation au visiteur
        confirm = MIMEMultipart()
        confirm["From"] = SMTP_USER
        confirm["To"] = email
        confirm["Subject"] = "Biware Consulting — Nous avons bien reçu votre message"

        corps_confirm = f"""Bonjour {nom},

Nous avons bien reçu votre message et vous répondrons sous 24h ouvrées.

Besoin d'une réponse immédiate ?
📞 +216 29 969 439
📧 contact@biware-consulting.com

Cordialement,
L'équipe Biware Consulting
---
🌐 https://biware-consulting.com
📍 Rue du Lac Windermere, Résidence ERRAWDHA, Escalier 03, 3ème étage, 1053 Les Berges du Lac, Tunis – Tunisie
"""
        confirm.attach(MIMEText(corps_confirm, "plain", "utf-8"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as serveur:
            serveur.ehlo()
            serveur.starttls()
            serveur.ehlo()
            serveur.login(SMTP_USER, SMTP_PASSWORD)
            serveur.sendmail(SMTP_USER, email, confirm.as_string())

        return True

    except Exception as e:
        print(f"Erreur envoi contact : {e}")
        return False