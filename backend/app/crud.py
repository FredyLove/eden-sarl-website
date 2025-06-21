# app/crud.py
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from . import models, schemas
from .auth import verify_password

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user

# Products

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).offset(skip).limit(limit).all()

def update_product(db: Session, product_id: int, updates: schemas.ProductUpdate):
    product = get_product(db, product_id)
    if not product:
        return None
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(product, field, value)
    db.commit()
    db.refresh(product)
    return product

def delete_product(db: Session, product_id: int):
    product = get_product(db, product_id)
    if not product:
        return None
    db.delete(product)
    db.commit()
    return product

# Deliveries

def create_delivery_request(db: Session, user_id: int, request_data: schemas.DeliveryRequestCreate):
    delivery = models.DeliveryRequest(
        user_id=user_id,
        product_id=request_data.product_id,
        address=request_data.address,
        quantity=request_data.quantity
        
    )
    db.add(delivery)
    db.commit()
    db.refresh(delivery)
    return delivery

def get_all_delivery_requests(db: Session):
    return db.query(models.DeliveryRequest).all()

def update_delivery_status(db: Session, delivery_id: int, status: str):
    delivery = db.query(models.DeliveryRequest).filter(models.DeliveryRequest.id == delivery_id).first()
    if delivery:
        delivery.status = status
        db.commit()
    return delivery