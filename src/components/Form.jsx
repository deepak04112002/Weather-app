import { useState } from "react";
import { Box, TextField, Button, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getWeather } from "../services/api";

const Container = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.8)',
  padding: theme.spacing(1.5),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
  },
  borderRadius: 12,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 0 0 1px rgba(255, 255, 255, 0.05)'
    : '0 0 0 1px rgba(0, 0, 0, 0.05)',
  border: 'none',
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  [theme.breakpoints.up('sm')]: {
    flexDirection: "row",
    gap: theme.spacing(2),
    alignItems: "center",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : theme.palette.divider,
      transition: 'all 0.2s ease',
    },
    "&:hover fieldset": {
      borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
      borderWidth: '1px',
    },
  },
}));

const SearchButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  textTransform: "none",
  fontSize: "0.95rem",
  fontWeight: 500,
  borderRadius: 8,
  transition: 'all 0.2s ease',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 4px 12px rgba(96, 165, 250, 0.3)'
      : '0 4px 12px rgba(14, 165, 233, 0.3)',
  },
}));

export default function Form({ setResult, setLoading, setError }) {
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const response = await getWeather(city);
    setLoading(false);

    if (response.success) {
      setResult(response.data);
    } else {
      setError(response.error);
    }
  };

  return (
    <Container component="form" onSubmit={handleSubmit}>
      <StyledTextField
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        variant="outlined"
        size="medium"
        fullWidth
      />
      <SearchButton
        type="submit"
        variant="contained"
        color="secondary"
        startIcon={<SearchIcon />}
      >
        Search
      </SearchButton>
    </Container>
  );
}
