import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import ReviewPage from './components/ReviewPage';

function App() {
  return (
    <div className="App">      
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route
            path="/"
            element={<Home/>}
          ></Route>

          <Route
            path="/add-review"
            element={<ReviewPage/>}
          ></Route>
        </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
