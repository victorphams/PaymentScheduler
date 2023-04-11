import datetime
import holidays
import calendar
from typing import Dict, Iterable, Optional, Protocol, Tuple, Union, runtime_checkable


class BusinessDayRule:
    """Protocol of Business Day Rule Representation"""

    def dayChange(rule, date, country):
            #Assuming we use a check box system, intialize empty rule and change the string depending on activated rule
            currentRule = rule
            #used for comparison for modified
            previousDate = date
            #gets date that needs to be used, for now we just assume today
            currentDate = date
            #gets the holidays to compare, using US currently for test
            currentHolidays = holidaysTest.getHolidays(country)

            #Conditionals for which rule is activated, while the date violates a holiday or weekend, go to the next date available
            while currentDate.weekday() >= 5 or currentDate in currentHolidays :
                #Following: next business day
                if currentRule == "Following":
                    currentDate = frequency.addUnit(date, 2, 1)
                #Preceding: previous business day
                elif currentRule == "Preceding":
                    currentDate = frequency.addUnit(date, 2, -1)
                #Edge case for both, if the next day is a weekend but not the next month, we'll run into slipping cases
                #Modified Following: next business day, but it doesn’t go to the following month, stops at last business day of the month.    
                elif currentRule == "Modified Following":
                    currentDate += frequency.addUnit(date, 2, 1)
                    if currentDate.month() != previousDate.month():
                        while currentDate.weekday() >= 5 or currentDate in currentHolidays :
                            currentDate = frequency.addUnit(date, 2, -1)
                #Modified Preceding: previous business day, but it doesn’t go to the previous month, stops at last first day of the month.
                elif currentRule == "Modified Preceding":
                    currentDate = frequency.addUnit(date, 2, -1)
                    if currentDate.month() != previousDate.month():
                        while currentDate.weekday() >= 5 or currentDate in currentHolidays :
                            currentDate = frequency.addUnit(date, 2, 1)
                #set previous date as current for the next scenario
                previousDate = currentDate
                
            #returns the correctDate using the rule that we have given
            return currentDate

    def correctDates(data):
        if data['frequencyType'] == "Days":
            freq = 2
        if data['frequencyType'] == "Months":
            freq = 1
        else:
            freq = 0
        dates =  frequency.addTime(data['startDate'], data['endDate'], freqs, data['frequencyAmount'])
        for date in dates:
            dates[date] = BusinessDayRule.dayChange(data['businessDayRule'], date, data['country'])
        
        return dates
    

class endOfMonth:

    #check if the current date is the last day of that month 
    def lastDayCheck():
        currentDate = datetime.datetime.today()
        nextDate = currentDate.datetime.timedelta(days = 1)
        return currentDate.month is nextDate.month

    #checker to see if the user activated eom rule
    def isOn():
        return True
    
    def EOMRule():
        #check to see if the user turned on EOM rule
        if endOfMonth.isOn is True:
            #initialize first variable
            currentDate = datetime.datetime.today()
            nextDate = currentDate + datetime.timedelta(days = 1)

            
            """calendar.monthrange returns weekday of first day of the month and number of days in month, 
            for the specified year and month, which also properly handles leap years"""

            #find the last day of the next month 
            lastDayOfMonth = calendar.monthrange(nextDate.year, nextDate.month)[1]

            #increment the currentdate by the amount of days to get the last day of next motn
            updatedDate = currentDate + datetime.timedelta(days = (lastDayOfMonth))
        return updatedDate

class frequency:

    # number of days in each month
    days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    # function to compare dates
    def beforeDate(start, end):
        for i in range(0, 3):
            # return true if start date is before end date
            # return false otherwise
            if start[0][i] < end[1][i]:
                return 1
            elif start[0][i] > end[1][i]:
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
            date[2] += (days[date[1]] + (date[0]%4 == 0 and date[1] == 2)) 
            date = frequency.balanceMonth(date)
        while date[2] - (days[date[1]-1] + (date[0]%4 == 0 and date[1] == 2)) > 0:
            date[2] -= (days[date[1]-1] + (date[0]%4 == 0 and date[1] == 2))
            date[1] += 1
            date = frequency.balanceMonth(date)
        return date


    def balanceDate(date, ind):
        if ind == 1:
            return frequency.balanceMonth(date)
        return frequency.balanceDay(date)
    

    def addUnit(date, ind, amount):
        date[ind] += amount
        date = frequency.balanceDate(date, ind)
        return date


    def addTime(start, end, ind, amount):
        start = frequency.addUnit(start, ind, amount)
        output = []
        while frequency.beforeDate(start, end):
            approvedDate = datetime(start[0], start[1], start[2]).date()
            print(approvedDate)
            output.append(approvedDate)
            start = frequency.addUnit(start, ind, amount)
        return output
        
class holidaysTest:
    countryHolidays =[]
# Function to switch to countries based on case input
# Currently only includes the countries we decided to include at a previous meeting: USA, Brazil, France, Australia, China, and South Africa
    def getHolidays(country):
        if country == "United States":
            countryHolidays = holidays.US()

        elif country == "Brazil":
            currentHolidays = holidays.Brazil()
        elif country == "France":
            currentHolidays = holidays.France()
        elif country == "Australia":
            currentHOlidays = holidays.Australia()
        elif country == "China":
            currentHolidays = holidays.China()
        elif country == "South Africa":
            currentHolidays = holidays.SouthAfrica()
        
        return currentHolidays

data['frequency']
    


