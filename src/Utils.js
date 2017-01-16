import mini_icons_cloundy from "../res/drawable-hdpi/mini_icons_cloundy.png";
import mini_icons_drizzle from "../res/drawable-hdpi/mini_icons_drizzle.png";
import mini_icons_fog from "../res/drawable-hdpi/mini_icons_fog.png";
import mini_icons_hail from "../res/drawable-hdpi/mini_icons_hail.png";
import mini_icons_lightning from "../res/drawable-hdpi/mini_icons_lightning.png";
import mini_icons_night_clear from "../res/drawable-hdpi/mini_icons_night_clear.png";
import mini_icons_night_clound from "../res/drawable-hdpi/mini_icons_night_clound.png";
import mini_icons_overcast from "../res/drawable-hdpi/mini_icons_overcast.png";
import mini_icons_rain from "../res/drawable-hdpi/mini_icons_rain.png";
import mini_icons_rain_snow from "../res/drawable-hdpi/mini_icons_rain_snow.png";
import mini_icons_snow from "../res/drawable-hdpi/mini_icons_snow.png";
import mini_icons_sunny from "../res/drawable-hdpi/mini_icons_sunny.png";
import mini_icons_sunny_lightning from "../res/drawable-hdpi/mini_icons_sunny_lightning.png";
import mini_icons_sunny_rain from "../res/drawable-hdpi/mini_icons_sunny_rain.png";
import mini_icons_wind from "../res/drawable-hdpi/mini_icons_wind.png";
import mini_icons_cold from "../res/drawable-hdpi/mini_icons_cold.png";
import mini_icons_hot from "../res/drawable-hdpi/mini_icons_hot.png";


import mini_icons_cloundy_h from "../res/drawable-hdpi/mini_icons_cloundy_h.png";
import mini_icons_drizzle_h from "../res/drawable-hdpi/mini_icons_drizzle_h.png";
import mini_icons_fog_h from "../res/drawable-hdpi/mini_icons_fog_h.png";
import mini_icons_hail_h from "../res/drawable-hdpi/mini_icons_hail_h.png";
import mini_icons_lightning_h from "../res/drawable-hdpi/mini_icons_lightning_h.png";
import mini_icons_night_clear_h from "../res/drawable-hdpi/mini_icons_night_clear_h.png";
import mini_icons_night_clound_h from "../res/drawable-hdpi/mini_icons_night_clound_h.png";
import mini_icons_overcast_h from "../res/drawable-hdpi/mini_icons_overcast_h.png";
import mini_icons_rain_h from "../res/drawable-hdpi/mini_icons_rain_h.png";
import mini_icons_rain_snow_h from "../res/drawable-hdpi/mini_icons_rain_snow_h.png";
import mini_icons_snow_h from "../res/drawable-hdpi/mini_icons_snow_h.png";
import mini_icons_sunny_h from "../res/drawable-hdpi/mini_icons_sunny_h.png";
import mini_icons_sunny_lightning_h from "../res/drawable-hdpi/mini_icons_sunny_lightning_h.png";
import mini_icons_sunny_rain_h from "../res/drawable-hdpi/mini_icons_sunny_rain_h.png";
import mini_icons_wind_h from "../res/drawable-hdpi/mini_icons_wind_h.png";
import mini_icons_cold_h from "../res/drawable-hdpi/mini_icons_cold_h.png";
import mini_icons_hot_h from "../res/drawable-hdpi/mini_icons_hot_h.png";

/**
 * Created by shenjiajun on 2016/3/21.
 */
const bg_clear = require("../res/drawable-xxhdpi/bg_clear.png");
const bg_cloudy = require("../res/drawable-xxhdpi/bg_cloudy.png");
const bg_fog = require("../res/drawable-xxhdpi/bg_fog.png");
const bg_frost = require("../res/drawable-xxhdpi/bg_frost.png");
const bg_rainy = require("../res/drawable-xxhdpi/bg_rainy.jpg");
const bg_snow = require("../res/drawable-xxhdpi/bg_snow.png");
const bg_storm = require("../res/drawable-xxhdpi/bg_storm.png");
const bg_sunny = require("../res/drawable-xxhdpi/bg_sunny.jpg");


var APIKEY = "0efd9b4f14275d37789a2f57e5101852";

const lang = "zh-CN";

function buildUrl(url, parameters) {
    var qs = "";
    for (var key in parameters) {
        var value = parameters[key];
        qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1); //chop off last "&"
        url = url + "?" + qs;
    }
    return url;
}

var iconDailyMap = {

    28: mini_icons_cloundy,
    30: mini_icons_cloundy,

    9: mini_icons_drizzle,
    11: mini_icons_drizzle,
    45: mini_icons_drizzle,
    46: mini_icons_drizzle,

    19: mini_icons_fog,
    20: mini_icons_fog,
    21: mini_icons_fog,
    22: mini_icons_fog,

    17: mini_icons_hail,

    3: mini_icons_lightning,
    4: mini_icons_lightning,

    31: mini_icons_night_clear,
    33: mini_icons_night_clear,

    27: mini_icons_night_clound,
    29: mini_icons_night_clound,

    26: mini_icons_overcast,

    12: mini_icons_rain,
    40: mini_icons_rain,

    5: mini_icons_rain_snow,
    6: mini_icons_rain_snow,
    7: mini_icons_rain_snow,
    8: mini_icons_rain_snow,
    10: mini_icons_rain_snow,
    18: mini_icons_rain_snow,
    35: mini_icons_rain_snow,


    13: mini_icons_snow,
    14: mini_icons_snow,
    15: mini_icons_snow,
    16: mini_icons_snow,
    41: mini_icons_snow,
    42: mini_icons_snow,
    43: mini_icons_snow,

    32: mini_icons_sunny,
    34: mini_icons_sunny,
    44: mini_icons_sunny,

    37: mini_icons_sunny_lightning,
    38: mini_icons_sunny_lightning,
    47: mini_icons_sunny_lightning,

    39: mini_icons_sunny_rain,

    0: mini_icons_wind,
    1: mini_icons_wind,
    2: mini_icons_wind,
    23: mini_icons_wind,
    24: mini_icons_wind,

    25: mini_icons_cold,

    36: mini_icons_hot,
};

export function getDailyIcon(icon) {
    if (iconDailyMap[icon] != null) {
        return iconDailyMap[icon];
    } else {
        return mini_icons_sunny;
    }
}

const iconHourlyMap = {
    28: mini_icons_cloundy_h,
    30: mini_icons_cloundy_h,

    9: mini_icons_drizzle_h,
    11: mini_icons_drizzle_h,
    45: mini_icons_drizzle_h,
    46: mini_icons_drizzle_h,

    19: mini_icons_fog_h,
    20: mini_icons_fog_h,
    21: mini_icons_fog_h,
    22: mini_icons_fog_h,

    17: mini_icons_hail_h,

    3: mini_icons_lightning_h,
    4: mini_icons_lightning_h,

    31: mini_icons_night_clear_h,
    33: mini_icons_night_clear_h,

    27: mini_icons_night_clound_h,
    29: mini_icons_night_clound_h,

    26: mini_icons_overcast_h,

    12: mini_icons_rain_h,
    40: mini_icons_rain_h,

    5: mini_icons_rain_snow_h,
    6: mini_icons_rain_snow_h,
    7: mini_icons_rain_snow_h,
    8: mini_icons_rain_snow_h,
    10: mini_icons_rain_snow_h,
    18: mini_icons_rain_snow_h,
    35: mini_icons_rain_snow_h,


    13: mini_icons_snow_h,
    14: mini_icons_snow_h,
    15: mini_icons_snow_h,
    16: mini_icons_snow_h,
    41: mini_icons_snow_h,
    42: mini_icons_snow_h,
    43: mini_icons_snow_h,

    32: mini_icons_sunny_h,
    34: mini_icons_sunny_h,
    44: mini_icons_sunny_h,

    37: mini_icons_sunny_lightning_h,
    38: mini_icons_sunny_lightning_h,
    47: mini_icons_sunny_lightning_h,

    39: mini_icons_sunny_rain_h,

    0: mini_icons_wind_h,
    1: mini_icons_wind_h,
    2: mini_icons_wind_h,
    23: mini_icons_wind_h,
    24: mini_icons_wind_h,

    25: mini_icons_cold_h,

    36: mini_icons_hot_h,
};


export function getHourlyIcon(icon) {
    if (iconHourlyMap[icon] != null) {
        return iconHourlyMap[icon];
    } else {
        return mini_icons_sunny_h;
    }
    // return mini_icons_cloundy;
}


var backgoundImageMap = {
    27: bg_clear,
    29: bg_clear,
    31: bg_clear,
    33: bg_clear,

    26: bg_cloudy,
    28: bg_cloudy,
    30: bg_cloudy,
    34: bg_cloudy,

    19: bg_fog,
    20: bg_fog,
    21: bg_fog,
    22: bg_fog,
    23: bg_fog,
    24: bg_fog,

    25: bg_frost,

    4: bg_rainy,
    5: bg_rainy,
    6: bg_rainy,
    8: bg_rainy,
    9: bg_rainy,
    10: bg_rainy,
    11: bg_rainy,
    12: bg_rainy,
    40: bg_rainy,

    7: bg_snow,
    13: bg_snow,
    14: bg_snow,
    15: bg_snow,
    16: bg_snow,
    17: bg_snow,
    18: bg_snow,
    42: bg_snow,

    38: bg_storm,
    47: bg_storm,

    32: bg_sunny
};

export function getBackgroundImage(id) {
    if (backgoundImageMap[id] != null) {
        return backgoundImageMap[id];
    } else {
        return bg_sunny;
    }
}

var backgoundColorMap = {
    27: "#202959",
    29: "#202959",
    31: "#202959",
    33: "#202959",

    26: "#2193f0",
    28: "#2193f0",
    30: "#2193f0",
    34: "#2193f0",

    19: "#37474f",
    20: "#37474f",
    21: "#37474f",
    22: "#37474f",
    23: "#37474f",
    24: "#37474f",

    25: "#37474f",

    4: "#37474f",
    5: "#37474f",
    6: "#37474f",
    8: "#37474f",
    9: "#37474f",
    10: "#37474f",
    11: "#37474f",
    12: "#37474f",
    40: "#37474f",

    7: "#37474f",
    13: "#37474f",
    14: "#37474f",
    15: "#37474f",
    16: "#37474f",
    17: "#37474f",
    18: "#37474f",
    42: "#37474f",

    38: "#009688",
    47: "#009688",

    32: "#2193f0"
};

export function getBackgroundColor(id) {
    if (backgoundColorMap[id] != null) {
        return backgoundColorMap[id];
    } else {
        return "#2193f0";
    }
}


export function currentWeatherUrl(lantitude, longitude) {
    var url = "http://api.weather.com/v1/" + "geocode/" + lantitude + "/" + longitude + "/" + "observations/current.json?apiKey=" + APIKEY + "&language=" + lang + "&units=m";
    return encodeURI(url);
}

export function forcastHourlyWeatherUrl(lantitude, longitude) {
    var url = "http://api.weather.com/v1/" + "geocode/" + lantitude + "/" + longitude + "/" + "forecast/hourly/24hour.json?apiKey=" + APIKEY + "&language=" + lang + "&units=m";
    return encodeURI(url);
}

export function forecastDailyWeatherUrl(lantitude, longitude) {
    var url = "http://api.weather.com/v1/" + "geocode/" + lantitude + "/" + longitude + "/" + "forecast/daily/5day.json?apiKey=" + APIKEY + "&language=" + lang + "&units=m";
    return encodeURI(url);
}


export function findCityByGeoLocation(geolocation) {
    var url = "http://api.weather.com/v2/location?" + "geocode=" + geolocation + "&language=" + lang + "&format=" + "json" + "&apiKey=" + APIKEY;
    return encodeURI(url);
}

export function findCityByName(name) {
    var url = "http://api.weather.com/v2/location?" + "address=" + name + "&language=" + lang + "&format=" + "json" + "&apiKey=" + APIKEY;
    var temp = "http://api.weather.com/v2/location?address=%E4%B8%8A%E6%B5%B7&language=zh-CN&format=json&apiKey=0efd9b4f14275d37789a2f57e5101852";
    return encodeURI(url);
}


