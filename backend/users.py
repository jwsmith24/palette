from fastapi import APIRouter, HTTPException

from models import User

router = APIRouter()

# dummy database
users_db = []


@router.get("/users/")
async def get_users():
    return users_db


@router.post("/users/", response_model=User)
async def create_user(user: User):
    if any(existing_user.asurite == user.asurite for existing_user in users_db):
        print("User already exists")
        raise HTTPException(status_code=400, detail="User already exists")
    # if user doesn't already exit, create new user
    user.id = len(users_db) + 1
    users_db.append(user)
    return user
