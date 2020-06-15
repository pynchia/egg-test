from typing import List

from pydantic import BaseModel


class UserIn(BaseModel):
    text: str
    completed: bool


class User(BaseModel):
    id: int
    text: str
    completed: bool


USER_RES_NAME = 'users'


class UserService:
    """
    The storage service for the Entry resource
    """
    def __init__(self, connector, page_size):
        self.db = connector
        self.page_size = page_size

    def save_user(self, user: UserIn):
        self.db.add(USER_RES_NAME, user)
    
    def read_users(self, criteria, page) -> List[User]:
        self.db.read_many(USER_RES_NAME, criteria, self.page_size, page*self.page_size)
