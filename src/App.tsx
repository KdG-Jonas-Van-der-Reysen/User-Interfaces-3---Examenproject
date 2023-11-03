import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SettingsContextProvider from './contexts/SettingsContextProvider';
import { Header } from './components/navigation/Header';
import { Footer } from './components/navigation/Footer';
import { PoIs } from './components/PoIs';
import { Container } from "@mui/material";


function App() {
  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SettingsContextProvider>
          <Header/>
          <Routes>
            <Route path="/" element={
              <Container>
                <PoIs />
              </Container>
            } />
          </Routes>
          <Footer />
        </SettingsContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}


export default App
