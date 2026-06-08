# add_job.py
import sqlite3
import json

def add_job(title, location, contract, date, short_desc, description, requirements, benefits):
    conn = sqlite3.connect('biware.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO job_offers (title, location, contract, date, published, short_desc, description, requirements, benefits)
        VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?)
    ''', (title, location, contract, date, short_desc, description, 
          json.dumps(requirements), json.dumps(benefits)))
    
    conn.commit()
    conn.close()
    print(f"✓ Offre ajoutée : {title}")

# Exemple - Ajoute une nouvelle offre
add_job(
    title="Consultant Data Scientist",
    location="Tunis - Les Berges du Lac",
    contract="CDI",
    date="20 Juin 2026",
    short_desc="Nous recherchons un Data Scientist pour renforcer notre équipe IA.",
    description="""MISSIONS PRINCIPALES :
• Développer des modèles de machine learning
• Analyser des données complexes
• Collaborer avec les équipes BI""",
    requirements=["Bac+5 Data Science", "3+ ans expérience", "Python", "Scikit-learn", "TensorFlow"],
    benefits=["Rémunération attractive", "Projets innovants", "Formation continue", "Télétravail"]
)