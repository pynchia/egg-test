from typing import List

from storage.models import UserIn, User


class UserService:
    """
    The storage service for the Users resource
    """
    def __init__(self, connector, page_size):
        self.db = connector
        self.page_size = page_size

    async def save_user(self, user: UserIn):
        return await self.db.add(user)
    
    async def read_users(self, criteria, page) -> List[User]:
        return await self.db.read_many(criteria, self.page_size, page*self.page_size)
