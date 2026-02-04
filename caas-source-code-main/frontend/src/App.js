import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import Chat from './pages/Chat';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <AdminPage />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
