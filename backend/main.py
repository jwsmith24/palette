
from fastapi import FastAPI
import users

app = FastAPI()

app.include_router(users.router)

@app.get("/")
async def root():
    return {"message": "Gibson is trash"}

