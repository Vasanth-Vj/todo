import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/Loginpage/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Category from './Components/Category/Category';
import Client from './Components/Client/Client';
import SideNavigation from './Components/Home/Home';

function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LoginPage/>}></Route>
          <Route path='/home' element={ <SideNavigation/>}></Route>
          <Route path='/category' element={<Category/> }></Route>
          <Route path='/client' element={<Client/> }></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
