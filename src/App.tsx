import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SettingsContextProvider from "./contexts/SettingsContextProvider";
import { Header } from "./components/navigation/Header";
import { Footer } from "./components/navigation/Footer";
import { PoIs } from "./components/PoIs";
import { Container } from "@mui/material";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { deDE } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PoIDetail } from "./components/poi/PoIDetail";
import AuthContextProvider from "./contexts/AuthContextProvider";
import { PoIAdd } from "./components/poi/PoIAdd";
import { PoIEdit } from "./components/poi/PoIEdit";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SettingsContextProvider>
          <AuthContextProvider>
            <LocalizationProvider
              localeText={
                deDE.components.MuiLocalizationProvider.defaultProps.localeText
              }
              dateAdapter={AdapterDayjs}
            >
              <Header />
              <Container
                sx={{ marginTop: "2rem", minHeight: "calc(100vh - 175px)" }}
              >
                <Routes>
                  <Route path="/pois" element={<PoIs />} />
                  <Route path="/pois/:id" element={<PoIDetail />} />
                  <Route path="/pois/:id/edit" element={<PoIEdit />} />
                  <Route path="/" element={<PoIs />} />
                  <Route path="/pois/add" element={<PoIAdd />} />
                </Routes>
              </Container>
            </LocalizationProvider>
          </AuthContextProvider>
          <Footer />
        </SettingsContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
