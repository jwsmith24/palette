# defines how a rubric is stored in the database
from sqlalchemy import Column, Integer, String, JSON
from database import Base

class Rubric(Base):
    __tablename__ = 'rubrics'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    criteria = Column(JSON)

