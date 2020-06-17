import asyncio

# Create a database instance, and connect to it.
from databases import Database

async def main():
    database = Database('sqlite:///egg-test.db')
    await database.connect()

    # Create a table.
    query = """
    CREATE TABLE users (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `birth` DATE NOT NULL,
    `email` VARCHAR(64) NULL DEFAULT NULL,
    `children` INTEGER NOT NULL DEFAULT 0
    );
    """

    await database.execute(query=query)

    # Insert some data.
    query = """INSERT INTO users(name, birth, email, children)
                VALUES (:name, :birth, :email, :children)"""
    values = [
        {"name": "Joe", "birth": "01-01-2020", "email": "joe@example.com", "children": 1},
        {"name": "Tip", "birth": "01-01-1999", "email": "tip@example.com", "children": 2},
    ]
    await database.execute_many(query=query, values=values)

    # Run a database query.
    query = "SELECT * FROM users"
    rows = await database.fetch_all(query=query)
    print('entries:', rows)

    await database.disconnect()


if __name__ == "__main__":
    asyncio.run(main())
