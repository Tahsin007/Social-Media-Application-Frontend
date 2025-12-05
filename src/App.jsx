// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from './hooks/useAuth';
import PrivateRoute from './components/layout/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';

function App() {
  const { user, isLoadingUser } = useAuth(); // This hook will try to fetch the user

  if (isLoadingUser) {
    return <div>Loading application...</div>; // Or a spinner component
  }
  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />

        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/feed" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;