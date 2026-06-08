import smtplib
import os
from dotenv import load_dotenv
load_dotenv()

try:
    with smtplib.SMTP('smtp.gmail.com', 587) as s:
        s.ehlo()
        s.starttls()
        s.ehlo()
        s.login(os.getenv('SMTP_USER'), os.getenv('SMTP_PASSWORD'))
        print("✅ Connexion réussie !")
except Exception as e:
    print(f"❌ Erreur : {e}")