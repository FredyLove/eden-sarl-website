# app/crud.py
from datetime import datetime
from sqlalchemy import func
from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound
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

# Review


def create_or_update_review(db: Session, user_id: int, review_data: schemas.ReviewCreate):
    existing = db.query(models.ProductReview).filter_by(
        user_id=user_id,
        product_id=review_data.product_id
    ).first()

    if existing:
        existing.rating = review_data.rating
        existing.comment = review_data.comment
        existing.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(existing)
        return existing
    else:
        new_review = models.ProductReview(
            user_id=user_id,
            product_id=review_data.product_id,
            rating=review_data.rating,
            comment=review_data.comment,
        )
        db.add(new_review)
        db.commit()
        db.refresh(new_review)
        return new_review

def get_reviews_by_product(db: Session, product_id: int):
    return db.query(models.ProductReview).filter_by(product_id=product_id).all()

def get_average_rating(db: Session, product_id: int) -> float:
    result = db.query(func.avg(models.ProductReview.rating)).filter_by(product_id=product_id).scalar()
    return round(result or 0.0, 2)

# Bookmarks


# ✅ Add bookmark
def add_bookmark(db: Session, user_id: int, product_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    product = db.query(models.Product).filter(models.Product.id == product_id).first()

    if not user or not product:
        return None

    if product in user.bookmarks:
        return product  # Already bookmarked

    user.bookmarks.append(product)
    db.commit()
    return product

# ✅ Remove bookmark
def remove_bookmark(db: Session, user_id: int, product_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    product = db.query(models.Product).filter(models.Product.id == product_id).first()

    if not user or not product:
        return None

    if product in user.bookmarks:
        user.bookmarks.remove(product)
        db.commit()
        return True

    return False

# ✅ List user’s bookmarks
def get_user_bookmarks(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        return user.bookmarks
    return []

# Notifications

def create_notification(db: Session, user_id: int, message: str):
    notification = models.Notification(user_id=user_id, message=message)
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification

def get_user_notifications(db: Session, user_id: int):
    return db.query(models.Notification)\
        .filter(models.Notification.user_id == user_id)\
             .order_by(models.Notification.created_at.desc())\
             .all()

def mark_all_as_read(db: Session, user_id: int):
    db.query(models.Notification)\
      .filter(models.Notification.user_id == user_id)\
      .update({"is_read": True})
    db.commit()