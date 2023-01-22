import { Box, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react"
import { getWeather, Weather } from "../backend/api";

export const WeatherComopnent = () => {
    const [city, setCity] = useState("");
    const [weatherInfo, setWeatherInfo] = useState<Weather>();

    useEffect(() => {

    });

    const handleChange: ChangeEventHandler<Element> = async (event: ChangeEvent) => {
        const elem = event.target as HTMLTextAreaElement;
        const city = elem.value;
        localStorage.setItem('city', city);
        setCity(city);
        const details = await getWeather(city);
        setWeatherInfo(details);
    }

    const handleKeyDown = async (event: any) => {
        if (event.key === "Enter") {
            //invoke API and refresh weather
            console.log(city);
            setCity(city);
            const details = await getWeather(city);
            setWeatherInfo(details);
        }
    };
    return (
        <>
            <Box>
            <TextField
                id="standard-basic"
                label="Your city"
                variant="standard"
                onChange={handleChange}
                value={city}
                onKeyDown={handleKeyDown}
            />
            </Box>
            <Card>
                <Container className='weather-container'>
                    <Box marginBottom={2} marginTop={4}>
                        <Container className='temp-container'>
                            <Typography variant={'h4'} align='center' color='primary'>
                                Current: {weatherInfo ? Math.round(weatherInfo['current']) : ''}°C
                            </Typography>
                            <Typography variant={'h5'} align='center' color='primary'>
                                High: {weatherInfo ? Math.round(weatherInfo['max']) : ''}°C
                            </Typography>
                            <Typography variant={'h5'} align='center' color='primary'>
                                Low: {weatherInfo ? Math.round(weatherInfo['min']) : ''}°C
                            </Typography>
                        </Container>
                    </Box>
                </Container>
            </Card>
        </>

    );
}