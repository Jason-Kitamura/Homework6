The weather Dashboard was a fun activity that I felt very capable of finishing from the start.

The dashboard has default weather infor for toronto. Users can add a city with thesearch bar that will both add the city to the list below as well as display its weather info. The City list can be clicked to re-render a city's info, and is saved to local storage so that the list saves when the page is exited. 

The code works by taking the value of the search box, and then inserting it into the queryURL to get weather info for that city. Two api's are used. One for current forcast and one for 5 day forcast. The script then gathers relevent information from the returned object and appends it to the appropriate div(found by unique id). When the city is searched, it aleo appends it to the list of cities below for future use, and adds it to local storage so the list remains even when the page is reloaded.

A few things can be approved upon.
    - remove options for the cities
    - weather forccast for the next 5 days displays the forcast for the same time as the current day, not the max temp since the api is for every 3 hours (for loop skips 24hours ahead), and they daily forcast api for max temp must be purchased
    - needs error function so that a button if a user doesnt not enter a valid city
    - button converted to submit button