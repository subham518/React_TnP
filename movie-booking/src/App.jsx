import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import BookingSummary from "./components/BookingSummary";
import Login from "./components/Login";
import movies from "./data";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MovieList movies={movies} />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/booking" element={<BookingSummary />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;