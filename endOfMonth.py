import datetime
import calendar
import holidays
from typing import Dict, Iterable, Optional, Protocol, Tuple, Union, runtime_checkable


#follow python protocols
#add frequency checker, if its not month don't allow it also

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
            
print(endOfMonth.EOMRule())

