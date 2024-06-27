from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime, timedelta
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Replace with your MongoDB connection string
connection_string = "mongodb://localhost:27017"

# Connect to MongoDB
client = MongoClient(connection_string)

# Access the TravelNest database
db = client['travelnest']

# Access the UserAnalysis, Discounts, Users, and Destinations collections
user_analysis_collection = db['userAnalysis']
discounts_collection = db['discounts']
users_collection = db['users']
destinations_collection = db['destinations']

# SMTP configuration
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USERNAME = 'mounica2906@gmail.com'
SMTP_PASSWORD = "zagz vfmx seoh rthk"
EMAIL_FROM = 'mounica2906@gmail.com'

# Function to fetch all documents from the UserAnalysis collection
def fetch_all_user_analysis():
    try:
        user_analysis_data = user_analysis_collection.find()
        return list(user_analysis_data)
    except Exception as e:
        print(f"An error occurred while fetching data: {e}")
        return []

# Function to check if a user already has an active or unused discount for a destination
def has_active_or_unused_discount(user_id, destination_id):
    try:
        discount = discounts_collection.find_one({
            'userId': user_id,
            'destinationId': destination_id,
            'status': {'$in': ['active', 'unused']}
        })
        return discount is not None
    except Exception as e:
        print(f"An error occurred while checking discount: {e}")
        return False

# Function to send discount to eligible users
def send_discount(user_id, destination_id):
    new_discount = {
        'destinationId': destination_id,
        'userId': user_id,
        'offerStartDate': datetime.now(),
        'offerEndDate': datetime.now() + timedelta(days=30),  # Offer valid for 30 days
        'discountPercentage': 10,
        'status': 'active',
        'promoCode': 'NEWOFFER10'
    }
    try:
        discounts_collection.insert_one(new_discount)
        print(f"Discount sent to user {user_id} for destination {destination_id}")
        send_email(user_id, destination_id, new_discount['discountPercentage'])
    except Exception as e:
        print(f"An error occurred while sending discount: {e}")

# Function to send an email
def send_email(user_id, destination_id, discount_percentage):
    try:
        user = users_collection.find_one({'_id': ObjectId(user_id)})
        destination = destinations_collection.find_one({'_id': ObjectId(destination_id)})

        if user and destination:
            msg = MIMEMultipart()
            msg['From'] = EMAIL_FROM
            msg['To'] = user['email']
            msg[
                'Subject'] = f"{user['firstName']}, get exclusive discount of {discount_percentage}% on {destination['destinationName']}"

            body = f"""
            <html>
            <body>
                <h1>Exclusive Offer Just for You!</h1>
                <p>Dear {user['firstName']},</p>
                <p>We are excited to offer you an exclusive {discount_percentage}% discount on your next trip to {destination['destinationName']}.</p>
                <p>{destination['description']}</p>
                <p><a href="http://localhost:3001" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block;">Book Now</a></p>
            </body>
            </html>
            """
            msg.attach(MIMEText(body, 'html'))

            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                server.starttls()
                server.login(SMTP_USERNAME, SMTP_PASSWORD)
                server.sendmail(EMAIL_FROM, user['email'], msg.as_string())

            print(f"Email sent to {user['email']}")
        else:
            print("User or destination not found for email sending")
    except Exception as e:
        print(f"An error occurred while sending email: {e}")

# Function to remove expired and inactive discounts
def remove_expired_and_inactive_discounts():
    try:
        current_date = datetime.now()
        result = discounts_collection.delete_many(
            {'offerEndDate': {'$lt': current_date}, 'status': 'inactive'}
        )
        print(f"Removed {result.deleted_count} expired and inactive discounts")
    except Exception as e:
        print(f"An error occurred while removing expired and inactive discounts: {e}")

# Function to remove an entry from the UserAnalysis collection
def remove_user_analysis_entry(entry_id):
    try:
        user_analysis_collection.delete_one({'_id': entry_id})
        print(f"Removed UserAnalysis entry with ID {entry_id}")
    except Exception as e:
        print(f"An error occurred while removing UserAnalysis entry: {e}")

# Remove expired and inactive discounts
remove_expired_and_inactive_discounts()

# Fetch the user analysis data and process it
user_analysis_data = fetch_all_user_analysis()
for document in user_analysis_data:
    user_id = document['userId']
    destination_id = document['destination']
    number_of_clicks = document['numberOfClicks']
    entry_id = document['_id']
    if number_of_clicks >= 8:
        if not has_active_or_unused_discount(user_id, destination_id):
            send_discount(user_id, destination_id)
            remove_user_analysis_entry(entry_id)

client.close()
