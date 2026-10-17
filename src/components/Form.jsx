import { useState } from "react";
import { Box, TextField, Button, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getWeather } from "../services/api";

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),

  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    gap: theme.spacing(3),
    alignItems: "center",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,

  "& .MuiOutlinedInput-root": {
    height: 48,
    background: "transparent",
    borderRadius: 8,

    "& fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.3)"
          : theme.palette.divider,
      transition: "all 0.2s ease",
    },

    "&:hover fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.6)"
          : theme.palette.primary.main,
    },

    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
      borderWidth: "1px",
    },
  },

  "& input": {
    color: theme.palette.text.primary,
  },

  "& input::placeholder": {
    color: theme.palette.text.secondary,
    opacity: 0.7,
  },
  "& input:-webkit-autofill": {
    WebkitBoxShadow: `0 0 0 100px transparent inset !important`,
    WebkitTextFillColor: theme.palette.text.primary,
    transition: "background-color 5000s ease-in-out 0s",
  },
}));

const SearchButton = styled(Button)(({ theme }) => ({
  height: 45,
  padding: theme.spacing(1.5, 3),
  textTransform: "none",
  fontSize: "0.95rem",
  fontWeight: 500,
  borderRadius: 8,
  transition: "all 0.2s ease",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  "&:hover": {
    transform: "translateY(-1px)",
    backgroundColor: theme.palette.secondary.main,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 6px 18px rgba(96, 165, 250, 0.5)"
        : "0 6px 18px rgba(14, 165, 233, 0.5)",
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

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await getWeather(city);

      if (!response) return;

      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
