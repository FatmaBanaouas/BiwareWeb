
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import json
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./biware.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class JobOffer(Base):
    __tablename__ = 'job_offers'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    location = Column(String(200), nullable=False)
    contract = Column(String(50), nullable=False)
    date = Column(String(50), nullable=False)
    published = Column(Boolean, default=True)
    short_desc = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    requirements = Column(Text, nullable=False)
    benefits = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': f"job-{self.id}",
            'title': self.title,
            'location': self.location,
            'contract': self.contract,
            'date': self.date,
            'published': self.published,
            'shortDesc': self.short_desc,
            'description': self.description,
            'requirements': json.loads(self.requirements) if self.requirements else [],
            'benefits': json.loads(self.benefits) if self.benefits else []
        }


Base.metadata.create_all(bind=engine)