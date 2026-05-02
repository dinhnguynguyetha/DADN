from sqlalchemy import Column, Integer, String, Float, Enum, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
try:
    from Backend.database import Base
except ImportError:
    try:
        from .database import Base
    except ImportError:
        from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    projects = relationship("Project", back_populates="user", cascade="all, delete-orphan")

class Project(Base):
    __tablename__ = "projects"
    project_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
    project_name = Column(String(255), nullable=False)
    current_step = Column(Enum('1_INPUTS', '2_KINEMATICS', '3_TRANSMISSIONS', '4_SHAFTS', '5_COMPLETED'), default='1_INPUTS')
    status = Column(Enum('DRAFT', 'DONE'), default='DRAFT')
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="projects")
    flow_input = relationship("FlowInput", back_populates="project", uselist=False)
    flow_gears = relationship("FlowGears", back_populates="project", uselist=False)

class FlowInput(Base):
    __tablename__ = "flow_inputs"
    project_id = Column(Integer, ForeignKey("projects.project_id", ondelete="CASCADE"), primary_key=True)
    power_requirement = Column(Float, nullable=False)
    work_conditions = Column(JSON) # Lưu trữ workingHours, applicationType, v.v.
    
    project = relationship("Project", back_populates="flow_input")