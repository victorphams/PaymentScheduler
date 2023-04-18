
from flask import Flask, request
from flask import jsonify
from flask_cors import CORS
import holidays

import helper
import datetime

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
    startDate = [int(i) for i in data['startDate'].split("/")][::-1]
    startDate[1], startDate[2] = startDate[2], startDate[1]
    data['startDate'] = startDate
    endDate = [int(i) for i in data['endDate'].split("/")][::-1]
    endDate[1], endDate[2] = endDate[2], endDate[1]
    data['endDate'] = endDate
    frequency = data['frequency']
    businessDayRule = data['businessDayRule']
    endMonthRule = data['endMonthRule']
    frequencyType = data['frequencyType']
    frequencyAmount = data['frequencyAmount']
    
    # output = businessDayRule.correctDate(date)

    # print('Country:', country)
    # print('Start date:', startDate)
    # print('End date:', endDate)
    # print('Frequency:', frequency)
    # print('Frequency Type:', frequencyType)
    # print('Frequency Amount:', frequencyAmount)
    # print('Business day rule:', businessDayRule)
    # print('End of month rule:', endMonthRule)
    
    dates = helper.BusinessDayRule.correctDates(data)
    dates = [str(date[0]) + "-" + str(date[1]) + "-" + str(date[2]) for date in dates]
    print("We return: ", dates)

    return jsonify({'dates': dates})
