import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CategoryScreen from './screens/CategoryScreen';
import DepartmentScreen from './screens/DepartmentScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products/:id" element={<ProductScreen/>} />
          <Route path="/products" element={<HomeScreen/>} />
          <Route path="/products/catergories" element={<DepartmentScreen/>} />
          <Route path="/products/categories/:category" element={<CategoryScreen/>} />
        </Routes>
        </Container> 
      </main>
      <Footer />
    </Router>
  );
}

export default App;
