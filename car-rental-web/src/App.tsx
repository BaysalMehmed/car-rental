import './App.css';
import CreateProfile from './components/CreateProfile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import MyVehicles from './components/MyVehicles';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <div className='app-space'>
        <Routes>
          <Route path="/profile" element={<CreateProfile />} />
          <Route path="/vehicles" element={<MyVehicles />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
