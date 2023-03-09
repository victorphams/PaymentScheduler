import datetime
import holidays
from typing import Dict, Iterable, Optional, Protocol, Tuple, Union, runtime_checkable


class BusinessDayRule:
    """Protocol of Business Day Rule Representation"""

    def isOn():
        #return whether or not the box is checked for it, for now we use true
        return True

    def dayChange():
        if BusinessDayRule.isOn():
            #Assuming we use a check box system, intialize empty rule and change the string depending on activated rule
            currentRule = "following"
            #used for comparison for modified
            previousDate = datetime.datetime.today()
            #gets date that needs to be used, for now we just assume today
            currentDate = datetime.datetime.today()
            #gets the holidays to compare, using US currently for test
            currentHolidays = holidays.US()

            #Conditionals for which rule is activated, while the date violates a holiday or weekend, go to the next date available
            while currentDate.weekday() >= 3 or currentDate in currentHolidays :
                #Following: next business day
                if currentRule == "following":
                    currentDate += datetime.timedelta(days = 1)
                #Preceding: previous business day
                elif currentRule == "preceding":
                    currentDate -= datetime.timedelta(days = 1)
                #Edge case for both, if the next day is a weekend but not the next month, we'll run into slipping cases
                #Modified Following: next business day, but it doesn’t go to the following month, stops at last business day of the month.    
                elif currentRule == "modifiedFollow":
                    currentDate += datetime.timedelta(days = 1)
                    if currentDate.month() != previousDate.month():
                        return previousDate
                #Modified Preceding: previous business day, but it doesn’t go to the previous month, stops at last first day of the month.
                elif currentRule == "modifiedPrecede":
                    currentDate -= datetime.timedelta(days = 1)
                    if currentDate.month() != previousDate.month():
                        return previousDate
                #set previous date as current for the next scenario
                previousDate = currentDate
            
            print(currentDate.weekday())
                
            #returns the correctDate using the rule that we have given
            return currentDate

print(BusinessDayRule.dayChange())
