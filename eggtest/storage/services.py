from typing import List, Literal

from storage.models import UserIn, User


class UserService:
    """
    The storage service for the Users resource
    """
    def __init__(self, connector):
        self.db = connector

    async def save_user(self, user: UserIn) -> dict:
        return await self.db.add(user)
    
    async def read_users(self,
        search_filter:str, sort_by:str, sort_dir: Literal['asc', 'desc'],
        page:int, pagesize:int) -> List[dict]:
        return await self.db.read_many(
            search_filter,
            sort_by,
            sort_dir,
            page,
            pagesize
        )
