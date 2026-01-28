import os
from sqlalchemy import create_engine, text

# Use the same connection string as the backend
db_url = 'postgresql://postgres:azam@db:5432/myazam_db'
engine = create_engine(db_url)

try:
    with engine.connect() as conn:
        # List all tables
        result = conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"))
        tables = result.fetchall()
        print('Tables in PostgreSQL:')
        for table in tables:
            print(f'  {table[0]}')

        # Check if our specific tables exist
        for table_name in ['user', 'product']:
            try:
                result = conn.execute(text(f'SELECT COUNT(*) FROM "{table_name}"'))
                count = result.scalar()
                print(f'{table_name} table exists with {count} records')
            except Exception as e:
                print(f'{table_name} table error: {e}')

except Exception as e:
    print(f'Connection error: {e}')