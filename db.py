import mysql.connector
config = {
    'user' : 'root',
    'password' : '',
    'host' : 'localhost',
    'database' : 'kampus',
    'raise_on_warnings' : True
}
conn = mysql.connector.connect(**config)
print(conn)
cursor = conn.cursor()
query = f"SELECT * FROM mahasiswua"
cursor.execute(query)
for row in cursor.fetchall() :
    print(row)
conn.close()
