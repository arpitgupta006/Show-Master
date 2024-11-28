import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './Pages/MovieList';
import TicketsPage from './Pages/TicketsPage';
import MovieInfoPage from './Pages/MovieInfoPage';
import FinalPage from './Pages/FinalPage';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/tickets/:id" element={<TicketsPage />} />
      <Route path="/movies/:id" element={<MovieInfoPage />} />
      <Route path="/final" element={<FinalPage />} />
    </Routes>
  </Router>
  );
}

export default App;
