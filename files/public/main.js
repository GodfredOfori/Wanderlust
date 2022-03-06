// Foursquare API Info
const foursquareKey = 'Z1B1Y2LIGHEVVEQKLNGXKMPKSFQRJR4T3EWATO3JRV0WSTXS';
const url = 'https://api.foursquare.com/v3/places/search?near=';

// OpenWeather Info
const openWeatherKey = '5e6434db18694a82b738b2fa017ad40a';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $placeDivs = [$("#place1"), $("#place2"), $("#place3"), $("#place4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  }
};

// Add AJAX functions here:
const getPlaces = async () => {
  const city = $input.val();
  const urlToFetch = '${url}${city}&limit=10&client_id=${clientId}&client_secert=${clientSecret}&v=20210404';

  try {
    const response = await fetch(urlToFetch);
    if(response.ok) {
      console.log(response);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const places = jsonResponse.response.groups[0].items.map(item => item.place);
      console.log(places);
      return places;
    }
    else {
      throw new Error('Request failed!');
    }
  }
  catch(error) {
    console.log(error.message);
  }
};

const getForecast = async () => {
  const urlToFetch = '${forecastUrl}${apiKey}&q=${input.val()}&days=4&hour=11';
  try {
    const response =  await fetch(urlToFetch);
    if(response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const days = jsonResponse.forecast.forecastday;
      return days;
    }
    else {
      throw new Error('Request Failed!');
    }
  }
  catch(error) {
    console.log(error.message);
  }
};


// Render functions
const renderPlaces = (places) => {
  $placeDivs.forEach(($place, index) => {
    // Add your code here:
    const place = places[index]
    const placeIcon = place.categories[0].icon;
    const placeImgSrc = '{placeIcon.prefix}bg_64${placeIcon.suffix}';
    const placeContent = createplaceHTML(place.name, place.location, placeImgSrc);
    $place.append(placeContent);
  });
  $destination.append(`<h2>${places[0].location.locality}</h2>`);
};

const renderForecast = (forecast) => {
  $weatherDiv.forEach($day, index) 
  const currentDay = days[index]
   const weatherContent = createWeatherHTML(currentDay);
  $weatherDiv.append(weatherContent);
  }



const executeSearch = () => {
  $placeDivs.forEach(place => place.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getPlaces().then(venues => renderPlaces(places));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch);