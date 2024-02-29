import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Homepage from './pages/Homepage'
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/signup" Component={Signup} />
        <Route path="/login" Component={Login} />
      </Routes>
    </>
  );
}

export default App
