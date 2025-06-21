# app/schemas.py
from datetime import datetime
from pydantic import BaseModel, EmailStr, conint
from typing import Optional
from enum import Enum

# User

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str
    is_active: bool

    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    
    
# Token

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Products

class ProductBase(BaseModel):
    id: int
    name: str
    description: str | None = None
    image: Optional[str] = None
    category: Optional[str] = None
    isPopular: Optional[bool] = False
    rating: Optional[float] = 0.0
    price: float

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    image: Optional[str] = None
    category: Optional[str] = None
    isPopular: Optional[bool] = False
    rating: Optional[float] = 0.0
    quantity: int | None = None
    price: float | None = None

class ProductOut(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# Deliveries

class DeliveryStatus(str, Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"

class DeliveryStatusUpdate(BaseModel):
    status: DeliveryStatus

class DeliveryRequestCreate(BaseModel):
    product_id: int
    address: str
    quantity: int

class DeliveryRequestOut(BaseModel):
    id: int
    user_id: int
    product_id: int
    quantity: int
    address: str
    status: DeliveryStatus

    class Config:
        from_attributes = True
        
# Reviews

class ReviewBase(BaseModel):
    rating: conint(ge=1, le=5)  # restrict to 1-5
    comment: Optional[str] = None

class ReviewCreate(ReviewBase):
    product_id: int

class ReviewUpdate(ReviewBase):
    pass

class ReviewOut(ReviewBase):
    id: int
    user_id: int
    product_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        
# Bookmark

class BookmarkAction(BaseModel):
    product_id: int


class BookmarkedProduct(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    image: Optional[str] = None
    price: float
    category: Optional[str] = None
    isPopular: bool
    rating: float

    class Config:
        from_attributes = True