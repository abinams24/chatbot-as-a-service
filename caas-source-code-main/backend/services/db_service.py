import mysql.connector
from config.db_config import db_config

def get_instances():
    """Fetch all instances from the database."""
    try:
        print(db_config)
        print(type(db_config))
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM instances")
        instances = cursor.fetchall()

        cursor.close()
        conn.close()
        return instances

    except Exception as e:
        print(f"Database Error: {e}")
        return {"error": str(e)}
