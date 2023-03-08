import datetime
import holidays
from typing import Dict, Iterable, Optional, Protocol, Tuple, Union, runtime_checkable


class BusinessDayRule(Protocol):
    """Protocol of Business Day Rule Representation"""

#Assuming we use a check box system, intialize empty rule and change the string depending on activated rule
currentRule = ""
currentDate = datetime.datetime.now

#Conditionals for which rule is activated, #while the date violates a holiday or weekend, go to the next date available

if currentRule == "following":
    #Following: next business day
    while currentDate.weekday > 4 
    
elif currentRule == "preceding":
    #Preceding: previous business day

    
elif currentRule == "modifiedFollow":
    #Modified Following: next business day, but it doesn’t go to the following month, stops at last business day of the month.

   
elif currentRule == "modifiedPrecede":
    #Modified Preceding: previous business day, but it doesn’t go to the previous month, stops at last first day of the month.    
    while
    