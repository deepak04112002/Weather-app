import {
  Box,
  Typography,
  styled,
  Grid,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import {
  LocationOn,
  Thermostat,
  Opacity,
  Cloud,
  Air,
  Explore,
  Visibility,
  Speed,
  WbSunny,
  Nightlight,
  WaterDrop,
  WindPower,
} from "@mui/icons-material";

const Container = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const InfoCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.8)',
  borderRadius: 12,
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 0 0 1px rgba(255, 255, 255, 0.05)'
    : '0 0 0 1px rgba(0, 0, 0, 0.05)',
  border: 'none',
  height: "100%",
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 0 0 1px rgba(255, 255, 255, 0.1), 0 12px 24px rgba(0, 0, 0, 0.4)'
      : '0 0 0 1px rgba(0, 0, 0, 0.08), 0 12px 24px rgba(0, 0, 0, 0.12)',
  },
}));

const LocationHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  [theme.breakpoints.up('sm')]: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
  background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.8)',
  borderRadius: 12,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 0 0 1px rgba(255, 255, 255, 0.05)'
    : '0 0 0 1px rgba(0, 0, 0, 0.05)',
}));

const WeatherIcon = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  [theme.breakpoints.up('sm')]: {
    width: 60,
    height: 60,
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  background: theme.palette.mode === 'dark' ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)',
}));

const StatBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(1),
}));

export default function Information({ result, loading, error }) {
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!result) {
    return (
      <Box mt={3}>
        <Alert severity="info">Enter a city name to check the weather</Alert>
      </Box>
    );
  }

  return (
    <Container>
      <LocationHeader>
        <Box display="flex" alignItems="center" gap={1}>
          <LocationOn fontSize="medium" color="secondary" />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {result.location.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {result.location.region}, {result.location.country} • {result.location.localtime}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <WeatherIcon>
            <img src={result.current.condition.icon} alt="weather" width="50" />
          </WeatherIcon>
          <StatBox>
            <Typography variant="h3" fontWeight="700" sx={{ fontSize: { xs: '1.75rem', sm: '3rem' } }}>
              {result.current.temp_c}°
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
              {result.current.condition.text}
            </Typography>
          </StatBox>
        </Box>
      </LocationHeader>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard>
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Thermostat color="secondary" />
                <Typography variant="body2" color="text.secondary">Temperature</Typography>
              </Box>
              <Typography variant="h6" fontWeight="700">{result.current.temp_c}°C / {result.current.temp_f}°F</Typography>
            </CardContent>
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard>
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Thermostat color="secondary" />
                <Typography variant="body2" color="text.secondary">Feels Like</Typography>
              </Box>
              <Typography variant="h6" fontWeight="700">{result.current.feelslike_c}°C / {result.current.feelslike_f}°F</Typography>
            </CardContent>
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard>
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Opacity color="secondary" />
                <Typography variant="body2" color="text.secondary">Humidity</Typography>
              </Box>
              <Typography variant="h6" fontWeight="700">{result.current.humidity}%</Typography>
            </CardContent>
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard>
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                {result.current.is_day ? <WbSunny color="secondary" /> : <Nightlight color="secondary" />}
                <Typography variant="body2" color="text.secondary">UV Index</Typography>
              </Box>
              <Typography variant="h6" fontWeight="700">{result.current.uv}</Typography>
            </CardContent>
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard>
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Air color="secondary" />
                <Typography variant="body2" color="text.secondary">Wind Speed</Typography>
              </Box>
              <Typography variant="h6" fontWeight="700">{result.current.wind_kph} kph / {result.current.wind_mph} mph</Typography>
            </CardContent>
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard>
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Explore color="secondary" />
                <Typography variant="body2" color="text.secondary">Wind Direction</Typography>
              </Box>
              <Typography variant="h6" fontWeight="700">{result.current.wind_dir} ({result.current.wind_degree}°)</Typography>
            </CardContent>
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard>
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <WindPower color="secondary" />
                <Typography variant="body2" color="text.secondary">Wind Gust</Typography>
              </Box>
              <Typography variant="h6" fontWeight="700">{result.current.gust_kph} kph / {result.current.gust_mph} mph</Typography>
            </CardContent>
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard>
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Visibility color="secondary" />
                <Typography variant="body2" color="text.secondary">Visibility</Typography>
              </Box>
              <Typography variant="h6" fontWeight="700">{result.current.vis_km} km / {result.current.vis_miles} mi</Typography>
            </CardContent>
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard>
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Cloud color="secondary" />
                <Typography variant="body2" color="text.secondary">Cloud Cover</Typography>
              </Box>
              <Typography variant="h6" fontWeight="700">{result.current.cloud}%</Typography>
            </CardContent>
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard>
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Speed color="secondary" />
                <Typography variant="body2" color="text.secondary">Pressure</Typography>
              </Box>
              <Typography variant="h6" fontWeight="700">{result.current.pressure_mb} mb / {result.current.pressure_in} in</Typography>
            </CardContent>
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard>
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <WaterDrop color="secondary" />
                <Typography variant="body2" color="text.secondary">Precipitation</Typography>
              </Box>
              <Typography variant="h6" fontWeight="700">{result.current.precip_mm} mm / {result.current.precip_in} in</Typography>
            </CardContent>
          </InfoCard>
        </Grid>

        <Grid item xs={12}>
          <InfoCard>
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h6" fontWeight="600">
                  Air Quality Index
                </Typography>
                <Chip label="Live" color="secondary" size="small" />
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center" p={1}>
                    <Typography variant="body2" color="text.secondary">CO</Typography>
                    <Typography variant="h6" fontWeight="700">{result.current.air_quality.co.toFixed(1)}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center" p={1}>
                    <Typography variant="body2" color="text.secondary">NO₂</Typography>
                    <Typography variant="h6" fontWeight="700">{result.current.air_quality.no2.toFixed(1)}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center" p={1}>
                    <Typography variant="body2" color="text.secondary">O₃</Typography>
                    <Typography variant="h6" fontWeight="700">{result.current.air_quality.o3.toFixed(1)}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center" p={1}>
                    <Typography variant="body2" color="text.secondary">SO₂</Typography>
                    <Typography variant="h6" fontWeight="700">{result.current.air_quality.so2.toFixed(1)}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center" p={1}>
                    <Typography variant="body2" color="text.secondary">PM2.5</Typography>
                    <Typography variant="h6" fontWeight="700">{result.current.air_quality.pm2_5.toFixed(1)}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center" p={1}>
                    <Typography variant="body2" color="text.secondary">PM10</Typography>
                    <Typography variant="h6" fontWeight="700">{result.current.air_quality.pm10.toFixed(1)}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center" p={1}>
                    <Typography variant="body2" color="text.secondary">US EPA</Typography>
                    <Typography variant="h6" fontWeight="700">{result.current.air_quality['us-epa-index']}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center" p={1}>
                    <Typography variant="body2" color="text.secondary">GB DEFRA</Typography>
                    <Typography variant="h6" fontWeight="700">{result.current.air_quality['gb-defra-index']}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </InfoCard>
        </Grid>
      </Grid>
    </Container>
  );
}
