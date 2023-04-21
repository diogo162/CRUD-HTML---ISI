import psycopg2

def newConnection():
    DB_HOST = 'localhost'
    DB_NAME = 'STIIM'
    DB_USER = 'postgres'
    DB_PASS = '1597536d'
    DB_PORT = 5432
    
    conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASS, port=DB_PORT)
    
    cur = conn.cursor()
    return cur, conn

def closeConnection(cur, conn):
    cur.close()
    conn.commit()
