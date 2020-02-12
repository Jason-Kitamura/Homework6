document.getElementById('search-btn').addEventListener('click', createCity)
        // document.getElementById('search-btn').addEventListener('click', retreiveData)
        document.getElementById('cityList').addEventListener('click', retreiveDataFromList)

       let newCity

       startUp();

        function startUp () {
            newCity = 'Toronto';
            
            console.log('start up');

            $('#cityList').append (`
            <li class="list-group-item" id="${newCity}">${newCity}</li>
            `);
            $('#cityInput').val('');
             retreiveData();
        }

        let cityArray = [];

        function renderList(){
            $('cityList').html('');

            if( !localStorage.cityArray ){
            console.log( ` nothing to render, empty todos.` );
            return;
            }

            cityArray = JSON.parse( localStorage.cityArray );
            
            console.log( `storage cities: `, cityArray );

            cityArray.forEach( function(newItem){
            console.log( `.. reading todo and sending to appendItemToList() function` );
            appendItemToList(newItem);
            })
        }

      renderList();

        function appendItemToList(newItem) {

            newCity=newItem

            $('#cityList').append (`
            <li class="list-group-item" id="${newCity}">${newCity}</li>
            `);
            $('#cityInput').val('');
        }

        function createCity () {


            newCity = $('#cityInput').val();
            
            console.log('search button');

            $('#cityList').append (`
            <li class="list-group-item" id="${newCity}">${newCity}</li>
            `);
            $('#cityInput').val('');

            cityArray.push( newCity );

            localStorage.cityArray = JSON.stringify( cityArray );

            retreiveData();
        };

        function retreiveData(){

            retreiveOneDay();
            retreiveFiveDay();
        }

        function retreiveOneDay (){
            $.ajax({
                    url: `http://api.openweathermap.org/data/2.5/weather?q=${newCity}&APPID=748ff1a0b719ff81bb15bda076c9541d`,
                    method: "GET"
                }).then(displayCityWeather);
        } 

        function retreiveFiveDay (){
            $.ajax({
                    url: `http://api.openweathermap.org/data/2.5/forecast?q=${newCity}&appid=748ff1a0b719ff81bb15bda076c9541d`,
                    method: "GET"
                }).then(displayFiveDayWeather);
        } 
        

        function retreiveDataFromList() {
            newCity = event.target.id;
                
            console.log(`You clicked on: ${newCity}`);

            retreiveData();
        }
        
        function displayCityWeather(response) {
            console.log(response);
            console.log(response.name);
            $('#cityName').html(response.name);
            $('#description').html(`Weather: ${response.weather[0].description}`);
            $('#temperature').html(`Temperature: ${Math.round(response.main.temp-273.15)}°C`);
            $('#humidity').html(`Humidity: ${response.main.humidity}%`);
            $('#windSpeed').html(`Wind Speed: ${response.wind.speed} mph`);

            var iconCode = response.weather[0].icon;
            var iconurl = `https://openweathermap.org/img/w/${iconCode}.png`;

            $(`#weatherIcon`).attr('src', iconurl);

            // $('#uvIndex').html(`UV Index: ${response.name}`);
        }

        function displayFiveDayWeather(response2) {

            $('#dayList').html('');


            for(i=7; i<40; i+=8) {
            var date = response2.list[i].dt_txt;
            date = date.substring(0,11);

            var iconCode = response2.list[i].weather[0].icon;
            var iconurl = `https://openweathermap.org/img/w/${iconCode}.png`;

            $('#dayList').append(`
                <div class=" weatherDay">
                    <div id="innerWeatherDay"
                        <p>${date}</p>
                        <div id="icon"><img id="${i}" src="" alt="Weather icon"></div>
                        <p>Temp: ${Math.round(response2.list[i].main.temp-273.15)}°</p>
                        <p>Humidity: ${response2.list[i].main.humidity}</p>
                    </div>
                </div>
            `);
            $(`#${i}`).attr('src', iconurl);
            }
        }
        