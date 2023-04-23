import datetime
import holidays
import calendar
from typing import Dict, Iterable, Optional, Protocol, Tuple, Union, runtime_checkable


class BusinessDayRule:
    """Protocol of Business Day Rule Representation"""

    def dayChange(rule, date, country):
        # initializes the current rule we use
        currentRule = rule
        # initializes the holidays to compare, using US currently for test
        currentHolidays = holidaysTest.getHolidays(country)
        # initializes the date using an date array
        currentDateArray = date
        # conversion of date array to datetime object
        currentDatetime = datetime.date(date[0], date[1], date[2])
        previousDatetime = currentDatetime
        # Conditionals for which rule is activated, while the date violates a holiday or weekend, go to the next date available
        while currentDatetime.weekday() >= 5 or currentDatetime in currentHolidays:
            # Following: next business day
            if currentRule == "Following":
                currentDateArray = frequency.addUnit(currentDateArray, 2, 1)
            # Preceding: previous business day
            elif currentRule == "Preceding":
                currentDateArray = frequency.addUnit(currentDateArray, 2, -1)
            # Edge case for both, if the next day is a weekend but not the next month, we'll run into slipping cases
            # Modified Following: next business day, but it doesn’t go to the following month, stops at last business day of the month.
            elif currentRule == "Modified Following":
                currentDateArray += frequency.addUnit(currentDateArray, 2, 1)
                if currentDatetime.month != previousDatetime.month:
                    while currentDatetime.weekday() >= 5 or currentDatetime in currentHolidays:
                        currentDateArray = frequency.addUnit(
                            currentDateArray, 2, -1)
                        currentDatetime = datetime.date(
                            currentDateArray[0], currentDateArray[1], currentDateArray[2])
            # Modified Preceding: previous business day, but it doesn’t go to the previous month, stops at last first day of the month.
            elif currentRule == "Modified Preceding":
                currentDateArray = frequency.addUnit(currentDateArray, 2, -1)
                if currentDatetime.month != previousDatetime.month:
                    while currentDatetime.weekday() >= 5 or currentDatetime in currentHolidays:
                        currentDateArray = frequency.addUnit(
                            currentDateArray, 2, 1)
                        currentDatetime = datetime.date(
                            currentDateArray[0], currentDateArray[1], currentDateArray[2])
            # set previous date as current for the next scenario
            previousDatetime = currentDatetime
            # change the current datetime object to match the given date
            currentDatetime = datetime.date(
                currentDateArray[0], currentDateArray[1], currentDateArray[2])

        # returns the correctDate as an array
        return currentDateArray

    def correctDates(data):
        if data['frequencyType'] == "Days":
            freq = 2
        elif data['frequencyType'] == "Months":
            freq = 1
        else:
            freq = 0

        start = data['startDate']
        end = data['endDate']

        freqAmt = int(data['frequencyAmount'])
        dates = frequency.addTime(start, end, freq, freqAmt)
        for date in range(len(dates)):
            #print(dates[date])
            dates[date] = BusinessDayRule.dayChange(
                data['businessDayRule'], dates[date], data['country'])
            #print(dates[date])
            
        return dates


class endOfMonth:

    # check if the current date is the last day of that month
    def lastDayCheck():
        currentDate = datetime.datetime.today()
        nextDate = currentDate.datetime.timedelta(days=1)
        return currentDate.month is nextDate.month

    # checker to see if the user activated eom rule
    def isOn(rule):
        return rule

    def EOMRule():
        # check to see if the user turned on EOM rule
        if endOfMonth.isOn is True:
            # initialize first variable
            currentDate = datetime.datetime.today()
            nextDate = currentDate + datetime.timedelta(days=1)

            """calendar.monthrange returns weekday of first day of the month and number of days in month, 
            for the specified year and month, which also properly handles leap years"""

            # find the last day of the next month
            lastDayOfMonth = calendar.monthrange(
                nextDate.year, nextDate.month)[1]

            # increment the currentdate by the amount of days to get the last day of next motn
            updatedDate = currentDate + \
                datetime.timedelta(days=(lastDayOfMonth))
        return updatedDate


class frequency:

    # number of days in each month
    days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    # function to compare dates
    def beforeDate(start, end):
        for i in range(0, 3):
            # return true if start date is before end date
            # return false otherwise
            if start[i] < end[i]:
                return 1
            elif start[i] > end[i]:
                return 0

    def balanceMonth(date):
        while date[1] <= 0:
            date[0] -= 1
            date[1] += 12
        while date[1] - 12 > 0:
            date[0] += 1
            date[1] -= 12
        return date

    def balanceDay(date):
        # (date[0]%4 == 0 and date[1] == 2) adds a day to february if leap year
        while date[2] <= 0:
            date[1] -= 1
            date[2] += (frequency.days[date[1]] +
                        (date[0] % 4 == 0 and date[1] == 2))
            date = frequency.balanceMonth(date)
        while date[2] - (frequency.days[date[1]-1] + (date[0] % 4 == 0 and date[1] == 2)) > 0:
            date[2] -= (frequency.days[date[1]-1] +
                        (date[0] % 4 == 0 and date[1] == 2))
            date[1] += 1
            date = frequency.balanceMonth(date)
        return date

    def balanceDate(date, ind):
        if ind == 1:
            return frequency.balanceMonth(date)
        return frequency.balanceDay(date)

    def addUnit(date, ind, amount):
       # if isinstance(date, datetime.date):
        #    date = [int(i) for i in str(date).split('-')][::-1]
        #   date[1], date[2] = date[2], date[1]

        date[ind] += amount
        date = frequency.balanceDate(date, ind)
        return date

    def addTime(start, end, ind, amount):
        start = frequency.addUnit(start, ind, amount)
        output = []
        while frequency.beforeDate(start, end):
            # approvedDate = datetime.date(start[0], start[1], start[2])
            approvedDate = start
            output.append(list(approvedDate))
            start = frequency.addUnit(start, ind, amount)
        return output


class holidaysTest:
    countryHolidays = []
# Function to switch to countries based on case input
# Currently only includes the countries we decided to include at a previous meeting: USA, Brazil, France, Australia, China, and South Africa

    def getHolidays(country):
        if country == "United States":
            currentHolidays = holidays.US()

        elif country == "Brazil":
            currentHolidays = holidays.Brazil()
        elif country == "France":
            currentHolidays = holidays.France()
        elif country == "Australia":
            currentHolidays = holidays.Australia()
        elif country == "China":
            currentHolidays = holidays.China()
        elif country == "South Africa":
            currentHolidays = holidays.SouthAfrica()

        return currentHolidays
