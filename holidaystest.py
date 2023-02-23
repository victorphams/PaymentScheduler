import holidays # do "pip install holidays" in your terminal to install holidays API
from datetime import date

USA = ['US', 'USA', 'United States']
# Function to switch to countries based on case input
# Currently only includes the countries we decided to include at a previous meeting: USA, Brazil, France, Australia, China, and South Africa
def printHolidays(country):
    if country in USA:
        # Displays all holidays in the United States for 2023
        print("Holidays in the United States: " + "\n")
        for day in sorted(holidays.UnitedStates(years=2023).items()):
            print(day)

    elif country == "Brazil":
            # Displays all holidays in the Brazil for 2023
            print("Holidays in Brazil: " + "\n")
            for day in sorted(holidays.Brazil(years=2023).items()):
                print(day)

    elif country == "France":
            # Displays all holidays in the France for 2023
            print("Holidays in France: " + "\n")
            for day in sorted(holidays.France(years=2023).items()):
                print(day)

    elif country == "Australia":
            # Displays all holidays in the Australia for 2023
            print("Holidays in Australia: " + "\n")
            for day in sorted(holidays.AU(years=2023).items()):
                print(day)

    elif country == "China":
            # Displays all holidays in the China for 2023
            print("Holidays in China: " + "\n")
            for day in sorted(holidays.China(years=2023).items()):
                print(day)
    
    elif country == "South Africa":
            print("Holidays in South Africa: " + "\n")
            # Displays all holidays in the South Africa for 2023
            for day in sorted(holidays.ZA(years=2023).items()):
                print(day)

country = input('Enter a country to list its holidays: ')
printHolidays(country)

