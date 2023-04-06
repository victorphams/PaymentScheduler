
from flask import Flask
from flask import jsonify
from flask_cors import CORS

import holidays
from datetime import date
app = Flask(__name__)
CORS(app)


# Members API Route

@app.route("/paymentscheduler/usholidays")
def addHolidays_USA():
   USholidays = []
  
   for holiday in sorted(holidays.UnitedStates(years=2023).items()):
       USholidays.append(holiday)
       print(USholidays)

   return jsonify({'USholidays' : USholidays})



