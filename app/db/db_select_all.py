import asyncio

# Create a database instance, and connect to it.
from databases import Database

async def main():
    database = Database('sqlite:///egg-test.db')
    await database.connect()

    # Run a database query.
    query = "SELECT * FROM users"
    rows = await database.fetch_all(query=query)
    for row in rows:
        print(row)

    await database.disconnect()


if __name__ == "__main__":
    asyncio.run(main())
