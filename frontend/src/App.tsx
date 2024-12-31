import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ManageSourcesPage from './pages/ManageSources/ManageSources';
import EditSourcePage from './pages/EditSource/EditSource';
import AddSourcePage from './pages/AddSource/AddSource';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/manage_sources" element={<ManageSourcesPage />} /> 
        <Route path="/edit_source" element={<EditSourcePage />} /> 
        <Route path="/add_source" element={<AddSourcePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
