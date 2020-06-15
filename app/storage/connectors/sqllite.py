from datetime import datetime
from typing import List

import databases
import sqlalchemy

from storage.connectors.api import DBConnector
from storage.models import UserIn, User


class SQLiteUsers(DBConnector):
    def __init__(self, db_uri):
        self.db = databases.Database(db_uri)
        metadata = sqlalchemy.MetaData()
        self.users = sqlalchemy.Table(
            "users",
            metadata,
            sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
            sqlalchemy.Column("name", sqlalchemy.String),
            sqlalchemy.Column("birth", sqlalchemy.String),
            sqlalchemy.Column("email", sqlalchemy.String),
            sqlalchemy.Column("children", sqlalchemy.Integer),
        )
        engine = sqlalchemy.create_engine(
            db_uri, connect_args={"check_same_thread": False}
        )
        metadata.create_all(engine)

    async def connect(self):
        print("********** Connecting")
        await self.db.connect()

    async def disconnect(self):
        print("********** Disconnecting")
        await self.db.disconnect()

    async def add(self, user):
        # print("********** Adding user:", resource)
        # dob = datetime.strptime(resource.birth, '%Y-%m-%d')
        query = self.users.insert().values(
            name=user.name,
            birth=user.birth,
            email=user.email,
            children=user.children
        )
        last_record_id = await self.db.execute(query)
        return {**user.dict(), "id": last_record_id}

    async def read_many(self, criteria: dict, how_many: int, offset: int) -> List[User]:
        print("********** Reading many users:", criteria, how_many, offset)
        
