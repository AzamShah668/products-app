#!/usr/bin/env python3
"""
Migration script to transfer data from SQLite to PostgreSQL
"""
import sqlite3
import sys
import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Add the app directory to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def migrate_data():
    """Migrate data from SQLite to PostgreSQL"""

    print("Starting data migration from SQLite to PostgreSQL...")

    # SQLite connection
    sqlite_conn = sqlite3.connect('myazam_db.db')
    sqlite_cursor = sqlite_conn.cursor()

    # PostgreSQL connection (using the Docker network)
    postgres_url = "postgresql://postgres:azam@db:5432/myazam_db"
    postgres_engine = create_engine(postgres_url)
    PostgresSession = sessionmaker(bind=postgres_engine)
    postgres_session = PostgresSession()

    try:
        print("Extracting data from SQLite...")

        # Get all users
        sqlite_cursor.execute('SELECT id, username, email, full_name, hashed_password FROM user')
        users = sqlite_cursor.fetchall()
        print(f"Found {len(users)} users in SQLite")

        # Get all products
        sqlite_cursor.execute('SELECT id, name, description, price, in_stock, image_url, category FROM product')
        products = sqlite_cursor.fetchall()
        print(f"Found {len(products)} products in SQLite")

        print("Migrating data to PostgreSQL...")

        # Clear existing data in PostgreSQL (if any)
        postgres_session.execute(text('DELETE FROM "product"'))
        postgres_session.execute(text('DELETE FROM "user"'))
        postgres_session.commit()

        # Insert users
        for user in users:
            user_id, username, email, full_name, hashed_password = user
            postgres_session.execute(
                text('INSERT INTO "user" (id, username, email, full_name, hashed_password) VALUES (:id, :username, :email, :full_name, :hashed_password)'),
                {
                    'id': user_id,
                    'username': username,
                    'email': email,
                    'full_name': full_name,
                    'hashed_password': hashed_password
                }
            )
        print(f"Migrated {len(users)} users")

        # Insert products
        for product in products:
            product_id, name, description, price, in_stock, image_url, category = product
            postgres_session.execute(
                text('INSERT INTO product (id, name, description, price, in_stock, image_url, category) VALUES (:id, :name, :description, :price, :in_stock, :image_url, :category)'),
                {
                    'id': product_id,
                    'name': name,
                    'description': description,
                    'price': price,
                    'in_stock': bool(in_stock),
                    'image_url': image_url,
                    'category': category
                }
            )
        print(f"Migrated {len(products)} products")

        # Commit the transaction
        postgres_session.commit()
        print("Migration completed successfully!")

        # Verify the migration
        print("\nVerifying migration...")

        # Check users in PostgreSQL
        result = postgres_session.execute(text('SELECT COUNT(*) FROM "user"'))
        user_count = result.scalar()
        print(f"PostgreSQL users: {user_count}")

        # Check products in PostgreSQL
        result = postgres_session.execute(text('SELECT COUNT(*) FROM "product"'))
        product_count = result.scalar()
        print(f"PostgreSQL products: {product_count}")

        if user_count == len(users) and product_count == len(products):
            print("Data migration verification successful!")
        else:
            print("Data migration verification failed - counts don't match!")

    except Exception as e:
        print(f"Migration failed: {e}")
        postgres_session.rollback()
        return False

    finally:
        sqlite_conn.close()
        postgres_session.close()

    return True

if __name__ == "__main__":
    success = migrate_data()
    if success:
        print("\nSQLite to PostgreSQL migration completed successfully!")
        print("Your data has been preserved and is now in the PostgreSQL container.")
    else:
        print("\nMigration failed. Please check the error messages above.")
        sys.exit(1)