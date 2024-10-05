from typing import Optional

from pydantic import BaseModel

class User(BaseModel):
    asurite: str
    first_name: str
    id: Optional[int] = None