from pymongo import MongoClient
from neo4j import GraphDatabase

# Connect to MongoDB
mongo_client = MongoClient('mongodb://localhost:27017/')
mongodb = mongo_client['test']
bookings_collection = mongodb['bookings']

# Connect to Neo4j
neo4j_uri = "bolt://localhost:7687"
neo4j_user = "neo4j"
neo4j_password = "Atios2004$"
neo4j_driver = GraphDatabase.driver(neo4j_uri, auth=(neo4j_user, neo4j_password))

# Query MongoDB for bookings
bookings = bookings_collection.find()

# Transform data and load into Neo4j
with neo4j_driver.session() as session:
    for booking in bookings:
        session.run(
            """
            MERGE (user:User {id: $userId, email: $userEmail})
            MERGE (tour:Tour {name: $tourName})
            MERGE (user)-[:BOOKED]->(tour)
            """,
            userId=booking['userId'],
            userEmail=booking['userEmail'],
            tourName=booking['tourName']
        )

# Function to get and print the most booked tour
def get_most_booked_tour(session):
    result = session.run(
        """
        MATCH (tour:Tour)-[r:BOOKED]->(user:User)
        RETURN tour.name AS tourName, COUNT(r) AS numBookings
        ORDER BY numBookings DESC
        LIMIT 1
        """
    )
    record = result.single()
    if record:
        print(f"Most booked tour: {record['tourName']} with {record['numBookings']} bookings")

# Function to get and print the user with the most bookings
def get_user_with_most_bookings(session):
    result = session.run(
        """
        MATCH (user:User)-[r:BOOKED]->(tour:Tour)
        RETURN user.id AS userId, user.email AS userEmail, COUNT(r) AS numBookings
        ORDER BY numBookings DESC
        LIMIT 1
        """
    )
    record = result.single()
    if record:
        print(f"User with the most bookings: {record['userEmail']} (ID: {record['userId']}) with {record['numBookings']} bookings")

# Query Neo4j for the most booked tour and the user with the most bookings
with neo4j_driver.session() as session:
    get_most_booked_tour(session)
    get_user_with_most_bookings(session)

# Close connections
mongo_client.close()
neo4j_driver.close()
