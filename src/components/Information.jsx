import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { LocationOn, SettingsBrightness, Opacity, Cloud } from '@mui/icons-material'
import AirIcon from '@mui/icons-material/Air';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import DirectionsIcon from '@mui/icons-material/Directions';

const Row = styled(Typography)({
    padding: 10,
    fontSize: 20,
    letterSpacing: 2,
    '& > svg': {
        marginRight: 10
    }
});

const Error = styled(Typography)({
    color: 'red',
    margin: 50,
    padding: 20
})

const Information = ({ result }) => {

    return (
        result && Object.keys(result).length > 0 ?
        <Box style={{ margin: '7px 60px 30px 30px' ,display:'flex',flexDirection:'column'}}>
            <Row style={{display:'flex',alignItems:'center'}}><LocationOn />Location: {result.location.name},{result.location.region},{result.location.country}</Row>
            <Row style={{display:'flex',alignItems:'center'}}><SettingsBrightness />Temperature: {result.current.temp_c}°C</Row>
            <Row style={{display:'flex',alignItems:'center'}}><Opacity />Humidity: {result.current.humidity}</Row>
            <Row style={{display:'flex',alignItems:'center'}}><ThunderstormIcon />Condition:{result.current.condition.text}</Row>
            <Row style={{display:'flex',alignItems:'center'}}><DirectionsIcon/>Wind Direction: {result.current.wind_dir}</Row>
            <Row style={{display:'flex',alignItems:'center'}}><AirIcon />Wind Speed: {result.current.wind_kph} kph</Row>
            <Row style={{display:'flex',alignItems:'center'}}><Cloud />Clouds: {result.current.cloud}%</Row>
            <Row><Typography sx={{fontSize:'20px',fontWeight:'bold'}}>Air Quality</Typography></Row>
            <Row style={{display:'flex',alignItems:'center'}}>CO: {result.current.air_quality.co}</Row>
            <Row style={{display:'flex',alignItems:'center'}}>NO2: {result.current.air_quality.no2}</Row>
            <Row style={{display:'flex',alignItems:'center'}}>O3: {result.current.air_quality.o3}</Row>
            <Row style={{display:'flex',alignItems:'center'}}>SO2: {result.current.air_quality.so2}</Row>
        </Box>
        : <Error>Please enter the values to check weather</Error>
    )
}

export default Information;