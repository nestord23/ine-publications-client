import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import FormPage from './pages/FormPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<ListPage />} />
          <Route path="/posts/new" element={<FormPage />} />
          <Route path="/posts/:id" element={<DetailPage />} />
          <Route path="/posts/:id/edit" element={<FormPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;