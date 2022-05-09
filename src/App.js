// import { shallowEqual, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/RegisterPage/Register';
import Login from './pages/LoginPage/Login';
import Home from './pages/HomePage/Home';
import UserProfilePage from './pages/ProfilePage/UserProfilePage';
import EditProfilePage from './pages/ProfilePage/EditProfilePage';
import MessagePage from './pages/MessagePage/MessagePage';
import SearchPage from './pages/SearchPage/SearchPage';

import './App.css';

function App() {
  // const {user} = useSelector(state=> state.userReducer,shallowEqual);
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/profile' element={<UserProfilePage />} />
        <Route exact path='/editprofile' element={<EditProfilePage />} />
        <Route exact path='/message' element={<MessagePage />} />
        <Route exact path='/search' element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
