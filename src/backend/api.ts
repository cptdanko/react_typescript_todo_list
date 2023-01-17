const WEATHER_ENDPOINT = "/weather";
export type Weather = {
    min: number,
    max: number,
    current: number
    icon: string,
    description: string
};
//a private method
const processWeatherData = (data: any): Weather  => {
    const { main, weather } = data;
    console.log('The Weather data is');
    console.log(JSON.stringify(data));
    const weatherData: Weather = {
        min: main.temp_min,
        max: main.temp_max,
        current: main.temp,
        icon: weather[0] ? weather[0]?.icon : "",
        description: weather[0] ? weather[0]?.description : "",
    };
    return weatherData;
}
export const getWeather = async (city: string): Promise<Weather> => {

    const url = `${WEATHER_ENDPOINT}?city=${city}`;
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            resolve(processWeatherData(data))
        }).catch(err => {
            reject(err);
        })
    });
    
}