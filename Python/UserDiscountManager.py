import random
import time
import schedule as schedule
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime, timedelta
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
import os

connection_string = "mongodb://localhost:27017"

# Connect to MongoDB
client = MongoClient(connection_string)

# Access the TravelNest database
db = client['travelnest']

# Access the UserAnalysis, Discounts, Users, and Destinations collections
user_analysis_collection = db['useranalyses']
discounts_collection = db['discounts']
users_collection = db['users']
destinations_collection = db['destinations']

# SMTP configuration
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USERNAME = 'travelnestbyechologic@gmail.com'
SMTP_PASSWORD = "zgcf wtdy mkgj vzez"
EMAIL_FROM = 'travelnestbyechologic@gmail.com'


# Function to fetch all documents from the UserAnalysis collection
def fetch_all_user_analysis():
    try:
        user_analysis_data = user_analysis_collection.find()
        return list(user_analysis_data)
    except Exception as e:
        print(f"An error occurred while fetching data: {e}")
        return []


# Function to check if a user already has an active discount for a destination
def has_active_or_unused_discount(user_id, destination_id):
    try:
        discount = discounts_collection.find_one({
            'userId': user_id,
            'destinationId': destination_id,
            'status': {'$in': ['active']}
        })
        return discount is not None
    except Exception as e:
        print(f"An error occurred while checking discount: {e}")
        return False


def generate_promo_code(destination_name):
    return f"{destination_name[:3].upper()}{random.randint(1000, 9999)}"


# Function to send discount to eligible users
def send_discount(user_id, destination_id):
    try:
        discount_percentage = random.randint(10, 15)
        destination = destinations_collection.find_one({'_id': ObjectId(destination_id)})
        promo_code = generate_promo_code(destination['destinationName'])

        new_discount = {
            'destinationId': destination_id,
            'userId': user_id,
            'offerStartDate': datetime.now(),
            'offerEndDate': datetime.now() + timedelta(days=30),  # Offer valid for 30 days
            'discountPercentage': discount_percentage,
            'status': 'active',
            'promoCode': promo_code
        }
        send_email(user_id, destination_id, discount_percentage, promo_code)  # Send email first
        discounts_collection.insert_one(new_discount)  # Insert discount after email is sent
        print(f"Discount sent to user {user_id} for destination {destination_id}")
    except Exception as e:
        print(f"An error occurred while sending discount: {e}")
        raise


# Function to send an email with an embedded image using cid
def send_email(user_id, destination_id, discount_percentage, promo_code):
    try:
        user = users_collection.find_one({'_id': ObjectId(user_id)})
        destination = destinations_collection.find_one({'_id': ObjectId(destination_id)})

        if user and destination:
            msg = MIMEMultipart('related')
            msg['From'] = EMAIL_FROM
            msg['To'] = user['email']
            msg['Subject'] = f"{user['firstName']}, get exclusive discount of {discount_percentage}% on {destination['destinationName']}"

            body = f"""
               <html>
               <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                   <h1 style="color: #4CAF50; text-align: center;">Exclusive Offer Just for You!</h1>
                   <div style="text-align: center;">
                       <img src="cid:destination_image" alt="Destination Image" style="max-width: 100%; height: auto;"/>
                   </div>
                   <p>Dear <span style="font-weight: bold;">{user['firstName']}</span>,</p>
                   <p>We are excited to offer you an exclusive <span style="color: #4CAF50; font-weight: bold;">{discount_percentage}%</span> discount on your next trip to <span style="font-weight: bold;">{destination['destinationName']}</span>.</p>
                   <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">{destination['description']}</p>
                   <p>Your promo code is: <strong style="color: #ff0000;">{promo_code}</strong></p>
                   <p style="text-align: center;">
                       <a href="http://localhost:3001" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Book Now</a>
                   </p>
                   <br/><br/>
                    <p style="font-size: 10px; color: #777;">
                        This email was sent by Travel Nest and this offer can only be redeemed by {user['email']}.<br/>
                        *{discount_percentage}% off is valid through {datetime.now() + timedelta(days=30):%m/%d/%Y} at 11:59PM PT and is valid only for one booking made through Travel Nest. Discount will be applied to the total purchase price, and excludes taxes, service fees, special handling fees, and/or other fees. Travel is subject to availability. In order to take advantage of this offer, customers must have a valid account on Travel Nest with a valid form of accepted payment. Only one offer per household. Travel Nest reserves the right to cancel this offer at any time. Offer may not be sold, copied, modified, transferred, or used retroactively for prior purchases. Void where restricted or prohibited by law. Offer may not be combined with any other sale, promotion, discount, code, coupon, and/or offer. Offer has no cash value. Travel Nest is not a retailer or seller. Travel Nest may not be available in all regions.
                    </p>
               </body>
               </html>
               """
            msg_alternative = MIMEMultipart('alternative')
            msg.attach(msg_alternative)
            msg_alternative.attach(MIMEText(body, 'html'))

            image_path = os.path.join(destination['image'])

            if os.path.exists(image_path):
                with open(image_path, 'rb') as img:
                    mime_img = MIMEImage(img.read())
                    mime_img.add_header('Content-ID', '<destination_image>')
                    mime_img.add_header('Content-Disposition', 'inline', filename=os.path.basename(image_path))
                    msg.attach(mime_img)

            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                server.starttls()
                server.login(SMTP_USERNAME, SMTP_PASSWORD)
                server.sendmail(EMAIL_FROM, user['email'], msg.as_string())

            print(f"Email sent to {user['email']}")
        else:
            raise ValueError("User or destination not found for email sending")
    except Exception as e:
        print(f"An error occurred while sending email: {e}")
        raise


# Function to remove expired discounts
def remove_expired_and_inactive_discounts():
    try:
        current_date = datetime.now()
        result = discounts_collection.delete_many(
            {'offerEndDate': {'$lt': current_date}}
        )
        print(f"Removed {result.deleted_count} expired discounts")
    except Exception as e:
        print(f"An error occurred while removing expired discounts: {e}")


# Function to remove an entry from the UserAnalysis collection
def remove_user_analysis_entry(entry_id):
    try:
        user_analysis_collection.delete_one({'_id': entry_id})
        print(f"Removed UserAnalysis entry with ID {entry_id}")
    except Exception as e:
        print(f"An error occurred while removing UserAnalysis entry: {e}")


# Main function to run the entire process
def run_process():
    # Remove expired discounts
    print("Proocess Started")
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
                try:
                    send_discount(user_id, destination_id)
                    remove_user_analysis_entry(entry_id)
                except Exception as e:
                    print(f"An error occurred while processing discount for user {user_id}: {e}")

    client.close()


run_process()
