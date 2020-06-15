from pydantic import BaseModel


class UserIn(BaseModel):
    name: str
    birth: str
    email: str
    children: int


class User(BaseModel):
    id: int
    name: str
    birth: str
    email: str
    children: int
