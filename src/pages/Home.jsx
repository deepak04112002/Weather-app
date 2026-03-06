import { useState } from "react";
import { Box, Container, IconButton, styled, Typography } from "@mui/material";
import { WbSunny, NightsStay, CloudQueue } from "@mui/icons-material";
import Form from "../components/Form";
import Information from "../components/Information";
import { useThemeMode } from "../context/ThemeContext";

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background:
    theme.palette.mode === "dark"
      ? "#000000"
      : "linear-gradient(135deg, #e0f2fe 0%, #ffffff 100%)",
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  position: "relative",
  overflow: "hidden",
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '400px',
    background: theme.palette.mode === 'dark'
      ? 'radial-gradient(circle at 50% 0%, rgba(96, 165, 250, 0.1) 0%, transparent 50%)'
      : 'radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
}));

const DashboardCard = styled(Box)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.03)"
      : "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(40px)",
  borderRadius: 12,
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    borderRadius: 16,
    padding: theme.spacing(3),
  },
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.5)"
      : "0 0 0 1px rgba(0, 0, 0, 0.05), 0 20px 40px rgba(0, 0, 0, 0.08)",
  border: "none",
  maxWidth: "1000px",
  margin: "0 auto",
  position: "relative",
  zIndex: 1,
}));

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const TitleSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
}));

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { mode, toggleTheme } = useThemeMode();

  return (
    <PageContainer>
      <Container maxWidth="xl">
        <DashboardCard>
          <Header>
            <TitleSection>
              <CloudQueue sx={{ fontSize: { xs: 24, sm: 28 }, color: "secondary.main" }} />
              <Box>
                <Typography variant="h5" fontWeight="700" color="text.primary" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                  Weather Dashboard
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.5, display: { xs: 'none', sm: 'block' } }}
                >
                  Real-time weather data and air quality monitoring
                </Typography>
              </Box>
            </TitleSection>
            <IconButton
              onClick={toggleTheme}
              size="small"
              sx={(theme) => ({
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                '&:hover': { 
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              })}
            >
              {mode === "dark" ? <WbSunny fontSize="small" /> : <NightsStay fontSize="small" />}
            </IconButton>
          </Header>
          <Form
            setResult={setResult}
            setLoading={setLoading}
            setError={setError}
          />
          <Information result={result} loading={loading} error={error} />
        </DashboardCard>
      </Container>
    </PageContainer>
  );
}
