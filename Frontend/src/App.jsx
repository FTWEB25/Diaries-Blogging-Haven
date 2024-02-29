import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Homepage from './pages/Homepage'
import Login from './pages/Login';
import BlogPage from './pages/BlogPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/signup" Component={Signup} />
        <Route path="/login" Component={Login} />
        <Route path="/blog" Component={BlogPage} />
      </Routes>
    </>
  );
}

export default App
