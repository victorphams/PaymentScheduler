
from flask import Flask, request
from flask import jsonify
from flask_cors import CORS

import holidays
from datetime import date
app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])


# Members API Route

@app.route("/paymentscheduler/usholidays")
def addHolidays_USA():
    USholidays = []

    for holiday in sorted(holidays.UnitedStates(years=2023).items()):
        USholidays.append(holiday)
        print(USholidays)

    return jsonify({'USholidays': USholidays})


@app.route('/paymentscheduler/send-data', methods=['POST'])
def send_data():
    data = request.get_json()
    country = data['country']
    startDate = data['startDate']
    endDate = data['endDate']
    frequency = data['frequency']
    businessDayRule = data['businessDayRule']
    endMonthRule = data['endMonthRule']

    print('Country:', country)
    print('Start date:', startDate)
    print('End date:', endDate)
    print('Frequency:', frequency)
    print('Business day rule:', businessDayRule)
    print('End of month rule:', endMonthRule)

    return jsonify({'message': 'Data received'})
