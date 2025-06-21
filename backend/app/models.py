# app/models.py
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Boolean, Enum
from .database import Base
from sqlalchemy.orm import relationship
import enum
from datetime import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    role = Column(String, default="user")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(String, nullable=True)
    quantity = Column(Integer, default=0)
    image = Column(String, nullable=True)
    price = Column(Float, nullable=False)
    category = Column(String, nullable=True)
    isPopular = Column(Boolean, default=False)
    rating = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
class DeliveryStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"

class DeliveryRequest(Base):
    __tablename__ = "delivery_requests"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    address = Column(String, nullable=False)
    status = Column(Enum(DeliveryStatus), default="pending")
    quantity = Column(Integer, nullable=False)

    user = relationship("User")
    product = relationship("Product")