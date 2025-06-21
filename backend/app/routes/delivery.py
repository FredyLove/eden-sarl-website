# app/routes/delivery.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas, models, crud
from app.dependencies import get_current_user, get_current_admin_user
from app.database import get_db

router = APIRouter(prefix="/delivery", tags=["Delivery"])

@router.post("/", response_model=schemas.DeliveryRequestOut)
def request_delivery(
    delivery_data: schemas.DeliveryRequestCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.create_delivery_request(db, user_id=current_user.id, request_data=delivery_data)

@router.put("/{delivery_id}/status")
def update_delivery_status(
    delivery_id: int,
    status: schemas.DeliveryStatus,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    updated = crud.update_delivery_status(db, delivery_id, status.value)
    if not updated:
        raise HTTPException(status_code=404, detail="Request not found")
    return {"message": "Status updated successfully"}

@router.get("/", response_model=list[schemas.DeliveryRequestOut])
def get_all_delivery_requests(
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    return db.query(models.DeliveryRequest).all()