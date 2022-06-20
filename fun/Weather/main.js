$(document).keypress(function(event) { // prevent page from refreshing on submission via the enter key and prevent user from using that key
	if(event.keyCode == 13){ 
	   event.preventDefault();
	}
});
$(document).ready(function() {
	$("#location").focus();
	
	var city = geoplugin_city(); // geoplugin is very forgiving of capitalization and underscoring spaces between words of the city name
	var state = geoplugin_region(); // geoplugin is very forgiving of capitalization
	
	$("#submit").click(function() {
		var locale = $("#location").val(); // user's input for location
			
		if (locale.indexOf(",") < 0) { // partial location (city only)
			city = locale;
			state = geoplugin_region();
		} else if (locale.indexOf(",") > 0) { // city and state provided by user
			city = locale.slice(0,locale.indexOf(","));
			state = locale.slice(locale.indexOf(",") + 1,locale.length);
		}
		getOutput();
	});
	
	function getOutput() {		
		$.ajax({
			url: "http://api.wunderground.com/api/db248854697bedc4/geolookup/conditions/q/" + state + "/" + city + ".json",
			dataType : "jsonp",
			success: function(parsed_json) {
				var capturedData = [];
				var location = ["city","state","zip"];
				var currentObservation = ["temperature_string","weather","wind_dir","wind_mph","wind_gust_mph","relative_humidity","pressure_in","pressure_trend","heat_index_f","windchill_f","UV","icon_url","forecast_url","history_url"];
				
				for (i in location) {
					try {
						capturedData.push(parsed_json['location'][location[i]]);
						$("#warning").hide();
					} 
					catch(e) {
						if (e instanceof TypeError) {
							$("#warning").show().text("Invalid entry. Please check your spelling.");
						}
					}
					
				}
				for (i in currentObservation) {
					capturedData.push(parsed_json['current_observation'][currentObservation[i]]);
				}
				buildDisplay(capturedData);
			}
		});
	}
	getOutput();
});

function buildDisplay(data) {
	$("#locationText strong.city").text(data[0]); // data[0] = city
	$("#locationText strong.state").text(data[1]); // data[1] = state
	$("#locationText strong.zip").text(data[2]); // data[2] = zip
	
	//data[3] = temperature - 52.6 F (11.4 C)
	var temperature = data[3];
	var tempF = temperature.slice(0,temperature.indexOf("F") + 1);
	var tempC = temperature.slice(temperature.indexOf("("),temperature.length);
	$("#temperatureDetailF").text(tempF);
	$("#temperatureDetailC").text(tempC);
	
	//data[4] = condition (weather) - fog/clear
	$("#weatherDetail").text(data[4]);
	
	var icon = ""; 	// wire up the icons for #weatherIcon.src
	switch(data[4]) {
		case "Freezing Drizzle":
		case "Light Freezing Drizzle":
		case "Heavy Freezing Drizzle":
		case "Freezing Rain":
		case "Light Freezing Rain":
		case "Heavy Freezing Rain":
			icon = "chn_sleet";
			break;
		case "Drizzle":
		case "Light Drizzle":
		case "Heavy Drizzle":
		case "Rain Mist":
		case "Light Rain Mist":
		case "Heavy Rain Mist":
		case "Rain Showers":
		case "Light Rain Showers":
		case "Heavy Rain Showers":
		case "Rain":
		case "Light Rain":
		case "Heavy Rain":
		case "Rain Mist":
		case "Light Rain Mist":
		case "Heavy Rain Mist":
		case "Rain Showers":
		case "Light Rain Showers":
		case "Heavy Rain Showers":
		case "Mist":
		case "Light Mist":
		case "Heavy Mist":
			icon = "rain";
			break;
		case "Light Snow":
		case "Snow Grains":
		case "Light Snow Grains":
		case "Heavy Snow Grains":
		case "Ice Crystals":
		case "Light Ice Crystals":
		case "Heavy Ice Crystals":
			icon="flurries";
			break;
		case "Hail":
		case "Light Hail":
		case "Heavy Hail":
		case "Ice Pellets":
		case "Light Ice Pellets":
		case "Heavy Ice Pellets":
		case "Ice Pellet Showers":
		case "Light Ice Pellet Showers":
		case "Heavy Ice Pellet Showers":
		case "Hail Showers":
		case "Light Hail Showers":
		case "Heavy Hail Showers":
		case "Small Hail Showers":
		case "Light Small Hail Showers":
		case "Heavy Small Hail Showers":
		case "Small Hail":
			icon = "sleet";
			break;
		case "Snow":	
		case "Heavy Snow":
		case "Low Drifting Snow":
		case "Light Low Drifting Snow":
		case "Heavy Low Drifting Snow":
		case "Blowing Snow":
		case "Light Blowing Snow":
		case "Heavy Blowing Snow":
		case "Snow Blowing Snow Mist":
		case "Light Snow Blowing Snow Mist":
		case "Heavy Snow Blowing Snow Mist":
			icon = "snow";
			break;
		case "Thunderstorm":
		case "Light Thunderstorm":
		case "Heavy Thunderstorm":
		case "Thunderstorms and Rain":
		case "Light Thunderstorms and Rain":
		case "Heavy Thunderstorms and Rain":
		case "Thunderstorms and Snow":
		case "Light Thunderstorms and Snow":
		case "Heavy Thunderstorms and Snow":
		case "Thunderstorms and Ice Pellets":
		case "Light Thunderstorms and Ice Pellets":
		case "Heavy Thunderstorms and Ice Pellets":
		case "Thunderstorms with Hail":
		case "Light Thunderstorms with Hail":
		case "Heavy Thunderstorms with Hail":
		case "Thunderstorms with Small Hail":
		case "Light Thunderstorms with Small Hail":
		case "Heavy Thunderstorms with Small Hail":
			icon = "thundr_storms";
			break;
		case "Fog":
		case "Light Fog":
		case "Heavy Fog":
		case "Fog Patches":
		case "Light Fog Patches":
		case "Heavy Fog Patches":
		case "Freezing Fog":
		case "Light Freezing Fog":
		case "Heavy Freezing Fog":
		case "Shallow Fog":
		case "Partial Fog":
			icon = "fog";
			break;
		case "Haze":
		case "Light Haze":
		case "Heavy Haze":
			icon = "hazy";
			break;
		case "Overcast":
		case "Cloudy":
			icon = "cloudy";
			break;
		case "Clear":
			icon = "sunny";
			break;
		case "Partly Cloudy":
			icon = "part_cloudy";
		case "Scattered Clouds":
		case "Mostly Cloudy":
			icon = "most_cloudy";
			break;
		default:
			icon = "empty";
	}
	$("#weatherIcon").attr("src","img/" + icon + ".png");
	
	//data[5] = wind direction
	$("#windDirection").text(data[5]);
	
	//data[6] = wind speed
	$("#windDetail").text(data[6] + " mph");
	
	//data[7] = wind gust
	$("#windGustDetail").text(data[7] + " mph");
	
	//data[8] = humidity
	$("#humidityDetail").text(data[8]);
	
	//data[9] = pressure, data[10] = pressure trend (+,0,-???)
	if (data[10] != 0) {
		$("#pressureDetail").text(data[9] + data[10]);
	} else {
		$("#pressureDetail").text(data[9]);
	}
}