import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { Home } from './Components/Home';
import Footer from './Components/Footer';
import Exchanges from './Components/Exchanges';
import Loader from './Components/Loader'
import Coins from './Components/Coins';
import CoinDetail from './Components/CoinDetail';
import ErrorComponent from './Components/ErrorComponent'



function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/exchanges' element={<Exchanges />} />
          <Route path='/loader' element={<Loader />} />
          <Route path='/coins' element={<Coins />} />
          <Route path='/coin/:id' element={<CoinDetail />} />
          <Route path='/error' element={<ErrorComponent />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
