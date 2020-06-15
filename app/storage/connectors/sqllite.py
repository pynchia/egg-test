from typing import List

import databases

from .api import DBConnector


class SQLite(DBConnector):
    def __init__(self, db_uri):
        self.db = databases.Database(db_uri)

    async def connect(self):
        print("********** Connecting")
        await self.db.connect()

    async def disconnect(self):
        print("********** Disconnecting")
        await self.db.disconnect()

    async def add(self, res_name: str, resource: dict) -> dict:
        print("********** Adding", res_name, resource)

    async def read_many(self, res_name: str, criteria: dict, how_many: int, offeset: int) -> List[dict]:
        print("********** Reading many")
