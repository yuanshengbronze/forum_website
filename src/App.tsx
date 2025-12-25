import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";
import Home from "./pages/Home";
import Movies from "./pages/movies";
import Tech from "./pages/tech";
import Gossip from "./pages/gossip";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
});

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/gossip" element={<Gossip />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
