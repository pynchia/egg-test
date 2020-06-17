from datetime import datetime
import logging
from typing import List, Literal

import databases
import sqlalchemy
from sqlalchemy.sql import select, or_, desc, asc


from storage.connectors.api import DBConnector
from storage.models import User

logger = logging.getLogger("api")


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
        await self.db.connect()

    async def disconnect(self):
        await self.db.disconnect()

    async def add(self, user) -> dict:
        values = user.dict()
        values['birth'] = datetime.strptime(user.birth, '%Y-%m-%d').strftime('%d-%m-%Y')
        query = self.users.insert().values(**values)
        last_record_id = await self.db.execute(query)
        return {**values, "id": last_record_id}

    async def read_many(self,
        search_filter:str, sort_by:str, sort_dir: Literal['asc', 'desc'],
        page:int, pagesize:int) -> List[dict]:

        direction = desc if sort_dir == 'desc' else asc
        query = self.users.select().where(
            or_(
                self.users.c.name.ilike('%'+search_filter+'%'),
                self.users.c.email.ilike('%'+search_filter+'%')
            )
        ).order_by(direction(getattr(self.users.c, sort_by))).limit(pagesize).offset(page*pagesize)
        return await self.db.fetch_all(query)
