from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from dotenv import load_dotenv
from ./models import db, JobOffer
from flask_admin import Admin
from flask_login import LoginManager, login_required, login_user, logout_user, current_user

load_dotenv()

app = Flask(__name__)
CORS(app)  # Permet les requêtes depuis React
# Après app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///biware.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'biware-secret-key-2024')

db.init_app(app)
login_manager.init_app(app)

# Créer les tables
with app.app_context():
    db.create_all()
    print("✓ Base de données initialisée")

    
# Configuration email
SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
DEST_EMAIL = os.getenv("DEST_EMAIL", "contact@biware-consulting.com")

def envoyer_candidature_email(nom, prenom, email, telephone, poste, message, cv_bytes, cv_nom):
    """Envoie la candidature par email avec le CV en pièce jointe"""
    try:
        msg = MIMEMultipart()
        msg["From"] = SMTP_USER
        msg["To"] = DEST_EMAIL
        msg["Subject"] = f"Candidature - {poste} - {prenom} {nom}"

        corps = f"""
Nouvelle candidature reçue depuis le site Biware Consulting.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMATIONS CANDIDAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nom complet : {prenom} {nom}
Email       : {email}
Téléphone   : {telephone}
Poste visé  : {poste}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE DE MOTIVATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{message if message else "Aucun message fourni."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CV ATTACHÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Le CV est joint à cet email.

---
À contacter sous 24h.
Biware Consulting · contact@biware-consulting.com · +216 29 969 439
"""
        msg.attach(MIMEText(corps, "plain", "utf-8"))

        # Attacher le CV
        piece = MIMEBase("application", "octet-stream")
        piece.set_payload(cv_bytes)
        encoders.encode_base64(piece)
        piece.add_header("Content-Disposition", f'attachment; filename="{cv_nom}"')
        msg.attach(piece)

        # Envoyer l'email
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as serveur:
            serveur.ehlo()
            serveur.starttls()
            serveur.ehlo()
            serveur.login(SMTP_USER, SMTP_PASSWORD)
            serveur.sendmail(SMTP_USER, DEST_EMAIL, msg.as_string())

        return True

    except Exception as e:
        print(f"Erreur envoi candidature: {e}")
        return False

def envoyer_confirmation_candidat(nom, prenom, email, poste):
    """Envoie un email de confirmation au candidat"""
    try:
        msg = MIMEMultipart()
        msg["From"] = SMTP_USER
        msg["To"] = email
        msg["Subject"] = f"Biware Consulting - Confirmation de votre candidature - {poste}"

        corps = f"""
Bonjour {prenom} {nom},

Nous accusons bonne réception de votre candidature pour le poste de :

📌 {poste}

Votre CV et votre message ont bien été transmis à notre équipe RH.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROCHAINES ÉTAPES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ Nous étudierons votre candidature sous 48h ouvrées
2️⃣ Si votre profil correspond, nous vous contacterons pour un entretien
3️⃣ Vous recevrez un retour dans tous les cas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
À SAVOIR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Les entretiens se déroulent à notre bureau : Les Berges du Lac, Tunis
• La durée moyenne de recrutement est de 2 semaines
• Vous pouvez postuler à plusieurs offres

En attendant, nous vous invitons à suivre notre actualité sur LinkedIn :
🔗 https://www.linkedin.com/company/biware-consulting

Cordialement,
L'équipe Biware Consulting
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 contact@biware-consulting.com
📞 +216 29 969 439
🌐 https://biware-consulting.com
📍 Rue du Lac Windermere, Résidence ERRAWDHA, 1053 Les Berges du Lac, Tunis
"""
        msg.attach(MIMEText(corps, "plain", "utf-8"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as serveur:
            serveur.ehlo()
            serveur.starttls()
            serveur.ehlo()
            serveur.login(SMTP_USER, SMTP_PASSWORD)
            serveur.sendmail(SMTP_USER, email, msg.as_string())

        return True

    except Exception as e:
        print(f"Erreur envoi confirmation candidat: {e}")
        return False

@app.route('/api/candidature', methods=['POST'])
def recevoir_candidature():
    """Endpoint pour recevoir les candidatures depuis React"""
    try:
        # Récupérer les données du formulaire
        nom = request.form.get('nom')
        prenom = request.form.get('prenom')
        email = request.form.get('email')
        telephone = request.form.get('telephone')
        poste = request.form.get('poste')
        message = request.form.get('message', '')

        # Vérifier les champs obligatoires
        if not all([nom, prenom, email, telephone, poste]):
            return jsonify({
                'success': False,
                'message': 'Veuillez remplir tous les champs obligatoires'
            }), 400

        # Vérifier le CV
        if 'cv' not in request.files:
            return jsonify({
                'success': False,
                'message': 'Veuillez joindre votre CV'
            }), 400

        cv = request.files['cv']
        if cv.filename == '':
            return jsonify({
                'success': False,
                'message': 'Veuillez joindre votre CV'
            }), 400

        # Vérifier l'extension du fichier
        allowed_extensions = {'.pdf', '.doc', '.docx'}
        file_ext = os.path.splitext(cv.filename)[1].lower()
        if file_ext not in allowed_extensions:
            return jsonify({
                'success': False,
                'message': 'Format de fichier non supporté. Utilisez PDF ou Word.'
            }), 400

        # Lire le contenu du CV
        cv_bytes = cv.read()
        cv_nom = f"{prenom}_{nom}_{poste.replace(' ', '_')}{file_ext}"

        # Envoyer l'email à l'entreprise
        email_envoye = envoyer_candidature_email(
            nom, prenom, email, telephone, poste, message, cv_bytes, cv_nom
        )

        if not email_envoye:
            return jsonify({
                'success': False,
                'message': 'Erreur lors de l\'envoi de la candidature. Veuillez réessayer.'
            }), 500

        # Envoyer la confirmation au candidat
        envoyer_confirmation_candidat(nom, prenom, email, poste)

        return jsonify({
            'success': True,
            'message': 'Candidature envoyée avec succès ! Vous recevrez une confirmation par email.'
        }), 200

    except Exception as e:
        print(f"Erreur: {e}")
        return jsonify({
            'success': False,
            'message': 'Une erreur technique est survenue. Veuillez réessayer.'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Endpoint pour vérifier que l'API fonctionne"""
    return jsonify({'status': 'ok', 'message': 'API Biware est fonctionnelle'}), 200

if __name__ == '__main__':
    print("🚀 Démarrage de l'API Biware Candidatures...")
    print(f"📧 Emails envoyés à: {DEST_EMAIL}")
    print("📍 API disponible sur http://localhost:5000")
    app.run(debug=True, port=5000)


@app.route('/api/candidature-spontanee', methods=['POST'])
def recevoir_candidature_spontanee():
    """Endpoint pour les candidatures spontanées"""
    try:
        nom = request.form.get('nom')
        prenom = request.form.get('prenom')
        email = request.form.get('email')
        telephone = request.form.get('telephone')
        domaine = request.form.get('domaine')
        message = request.form.get('message', '')

        if not all([nom, prenom, email, telephone]):
            return jsonify({
                'success': False,
                'message': 'Veuillez remplir tous les champs obligatoires'
            }), 400

        if 'cv' not in request.files:
            return jsonify({
                'success': False,
                'message': 'Veuillez joindre votre CV'
            }), 400

        cv = request.files['cv']
        if cv.filename == '':
            return jsonify({
                'success': False,
                'message': 'Veuillez joindre votre CV'
            }), 400

        file_ext = os.path.splitext(cv.filename)[1].lower()
        if file_ext not in {'.pdf', '.doc', '.docx'}:
            return jsonify({
                'success': False,
                'message': 'Format de fichier non supporté. Utilisez PDF ou Word.'
            }), 400

        cv_bytes = cv.read()
        cv_nom = f"Candidature_spontanee_{prenom}_{nom}{file_ext}"

        # Envoyer l'email
        email_envoye = envoyer_candidature_spontanee_email(
            nom, prenom, email, telephone, domaine, message, cv_bytes, cv_nom
        )

        if not email_envoye:
            return jsonify({
                'success': False,
                'message': 'Erreur lors de l\'envoi. Veuillez réessayer.'
            }), 500

        envoyer_confirmation_candidat_spontanee(nom, prenom, email, domaine)

        return jsonify({
            'success': True,
            'message': 'Candidature envoyée avec succès !'
        }), 200

    except Exception as e:
        print(f"Erreur: {e}")
        return jsonify({
            'success': False,
            'message': 'Une erreur technique est survenue.'
        }), 500

def envoyer_candidature_spontanee_email(nom, prenom, email, telephone, domaine, message, cv_bytes, cv_nom):
    """Envoie la candidature spontanée par email"""
    try:
        msg = MIMEMultipart()
        msg["From"] = SMTP_USER
        msg["To"] = DEST_EMAIL
        msg["Subject"] = f"Candidature spontanée - {domaine} - {prenom} {nom}"

        corps = f"""
Nouvelle candidature spontanée reçue depuis le site Biware Consulting.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMATIONS CANDIDAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nom complet : {prenom} {nom}
Email       : {email}
Téléphone   : {telephone}
Domaine     : {domaine}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{message if message else "Aucun message fourni."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CV ATTACHÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Le CV est joint à cet email.

---
À contacter sous 24h.
Biware Consulting
"""
        msg.attach(MIMEText(corps, "plain", "utf-8"))

        piece = MIMEBase("application", "octet-stream")
        piece.set_payload(cv_bytes)
        encoders.encode_base64(piece)
        piece.add_header("Content-Disposition", f'attachment; filename="{cv_nom}"')
        msg.attach(piece)

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as serveur:
            serveur.ehlo()
            serveur.starttls()
            serveur.ehlo()
            serveur.login(SMTP_USER, SMTP_PASSWORD)
            serveur.sendmail(SMTP_USER, DEST_EMAIL, msg.as_string())

        return True
    except Exception as e:
        print(f"Erreur: {e}")
        return False

def envoyer_confirmation_candidat_spontanee(nom, prenom, email, domaine):
    """Envoie une confirmation au candidat spontané"""
    try:
        msg = MIMEMultipart()
        msg["From"] = SMTP_USER
        msg["To"] = email
        msg["Subject"] = "Biware Consulting - Confirmation de votre candidature spontanée"

        corps = f"""
Bonjour {prenom} {nom},

Nous accusons bonne réception de votre candidature spontanée dans le domaine :

📌 {domaine}

Votre CV a bien été transmis à notre équipe RH.

Nous étudierons votre profil et vous recontacterons dès qu'une opportunité correspondant à vos compétences se présentera.

En attendant, nous vous invitons à :
• Suivre notre actualité sur LinkedIn pour nos prochaines offres
• Consulter régulièrement notre page Carrières

Cordialement,
L'équipe Biware Consulting
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 contact@biware-consulting.com
📞 +216 29 969 439
🌐 https://biware-consulting.com
"""
        msg.attach(MIMEText(corps, "plain", "utf-8"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as serveur:
            serveur.ehlo()
            serveur.starttls()
            serveur.ehlo()
            serveur.login(SMTP_USER, SMTP_PASSWORD)
            serveur.sendmail(SMTP_USER, email, msg.as_string())

        return True
    except Exception as e:
        print(f"Erreur: {e}")
        return False