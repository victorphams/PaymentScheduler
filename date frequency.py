from datetime import datetime, timedelta

# number of days in each month
days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


# function to compare dates
def beforeDate(start, end):
    for i in range(0, 3):
        # return true if start date is before end date
        # return false otherwise
        if dates[0][i] < dates[1][i]:
            return 1
        elif dates[0][i] > dates[1][i]:
            return 0


def balanceMonth(date):
    while date[1] - 12 > 0:
        date[0] += 1
        date[1] -= 12
    return date


def balanceDay(date):
    # (date[0]%4 == 0 and date[1] == 2) adds a day to february if leap year
    while date[2] - (days[date[1]-1] + (date[0]%4 == 0 and date[1] == 2)) > 0:
        date[2] -= (days[date[1]-1] + (date[0]%4 == 0 and date[1] == 2))
        date[1] += 1
        date = balanceMonth(date)
    return date


def balanceDate(date, ind):
    if ind == 1:
        return balanceMonth(date)
    return balanceDay(date)


def addTime(start, end, ind, amount):
    start[ind] += amount
    start = balanceDate(start, ind)
    while beforeDate(start, end):
        print(datetime(start[0], start[1], start[2]).date())
        start[ind] += amount
        start = balanceDate(start, ind)


# test input values
## change to data from front end once connected
dates = [[2023, 1, 1], [2030, 5, 25]]
# get start/end dates
if beforeDate(dates[0], dates[1]) == 1:
    startDate = dates[0]
    endDate = dates[1]
else:
    startDate = dates[1]
    endDate = dates[0]
# 0 for annual; 1 for every * months; 2 for every * days
freq_unit = 2
# number of units
freq_num = 14

addTime(startDate, endDate, freq_unit, freq_num)







