# seed_jobs_direct.py
import sqlite3
import json

conn = sqlite3.connect('biware.db')
cursor = conn.cursor()

# Créer la table si elle n'existe pas
cursor.execute('''
    CREATE TABLE IF NOT EXISTS job_offers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(200) NOT NULL,
        location VARCHAR(200) NOT NULL,
        contract VARCHAR(50) NOT NULL,
        date VARCHAR(50) NOT NULL,
        published BOOLEAN DEFAULT 1,
        short_desc TEXT NOT NULL,
        description TEXT NOT NULL,
        requirements TEXT NOT NULL,
        benefits TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
''')

jobs = [
    ("Consultant Business Intelligence", "Tunis - Les Berges du Lac", "CDI", "15 Mai 2026", 1,
     "Nous recherchons un consultant BI confirmé pour accompagner nos clients.",
     "MISSIONS PRINCIPALES :\n• Analyser les besoins métiers\n• Développer des dashboards Power BI\n• Former les utilisateurs",
     json.dumps(["Bac+5", "3+ ans BI", "Power BI avancé", "SQL expert"]),
     json.dumps(["Rémunération attractive", "Formation continue", "Télétravail partiel"])),
    
    ("Data Engineer", "Tunis - Les Berges du Lac", "CDI", "01 Juin 2026", 1,
     "Rejoignez notre équipe pour construire des pipelines de données robustes.",
     "MISSIONS :\n• Concevoir des pipelines ETL\n• Optimiser les bases de données\n• Garantir la qualité des données",
     json.dumps(["Bac+5 en informatique", "2+ ans data engineering", "Python & SQL", "Airflow ou dbt"]),
     json.dumps(["Rémunération compétitive", "Projets innovants", "Formation continue"])),
    
    ("Stage - Développeur Power BI", "Tunis - Les Berges du Lac", "Stage (4-6 mois)", "15 Mai 2026", 1,
     "Stage rémunéré pour étudiant en dernière année. Apprenez et contribuez sur des projets concrets.",
     "MISSIONS :\n• Participer au développement de dashboards Power BI\n• Assister les consultants\n• Contribuer à la documentation",
     json.dumps(["Master 2 en cours", "Base Power BI", "Base SQL", "Anglais technique"]),
     json.dumps(["Stage rémunéré", "Mentorat expert", "Projets concrets", "Possibilité d'embauche"])),
]

cursor.executemany('''
    INSERT INTO job_offers (title, location, contract, date, published, short_desc, description, requirements, benefits)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
''', jobs)

conn.commit()
conn.close()
print("✓ Offres ajoutées avec succès !")