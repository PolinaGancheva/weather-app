
if(navigator.geolocation){
	navigator.geolocation.getCurrentPosition
	(position =>{
		long = position.coords.longitude;
		lat = position.coords.latitude;
		let appid = "appid=8e1880f460a20463565be25bc573bdc6";
		const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&${appid}`;

		fetch(api)
		.then(response =>{
			return response.json();
		})
		.then(data => {
			console.log(data);
			//set DOM elements from the API 
			let currentDate = new Date();
			let dayNight = "day";
			let dateElem = document.getElementById("date");
			dateElem.innerHTML = currentDate.toDateString();
			let city = data.name;
			let country = data.country;
			location.innerHTML = `${city}, ${country}`;
			let weatherDesc = data.weather[0].description;
			let id = data.weather[0].id;
			let icon = `<i class="wi wi-owm-${id}"></i>`
			let temperature = data.main.temp;
			let tempCel = Math.round(temperature -273.15);
				// console.log(tempFaren)
			let humidity = data.main.humidity;
			let windSpeed = data.wind.speed; 
			//converting visibility to miles 
			let visibility = Math.round(data.visibility / 1000);
			// console.log(visibility)

			//find whether is day or night
			let sunSet = data.sys.sunset;
			//sunset is 10 digits and currentDate 13 so div by 1000
			let timeNow = Math.round(currentDate / 1000);
			console.log(timeNow + "<" + sunSet +" = "+(timeNow < sunSet))
			dayNight = (timeNow < sunSet) ? "day" : "night";
			//insert into html page
			let description = document.getElementById("description");
			description.innerHTML = `<i id="icon-desc" class="wi wi-owm-${dayNight}-${id}"></i><p>${weatherDesc}</p>`;
			let tempElement = document.getElementById("temperature");
			tempElement.innerHTML = `${tempCel}<i id="icon-thermometer" class="wi wi-thermometer"></i>`	;
			let humidityElem = document.getElementById("humidity");
			humidityElem.innerHTML = `${humidity}%`;
			let windElem = document.getElementById("wind");
			windElem.innerHTML = `${windSpeed}m/h`;
			let visibilityElem = document.getElementById("visibility");
			visibilityElem.innerHTML = `${visibility} miles`;
		});
	});
}
else{
	h1.content="please, allow your location"
}
