import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import ProductsScreen from './screens/ProductsScreen';
import ProductScreen from './screens/ProductScreen';
import CategoryScreen from './screens/CategoryScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
        <Routes>
          <Route path="/" element={<ProductsScreen />} />
          <Route path="/products/:id" element={<ProductScreen/>} />
          <Route path="/products" element={<ProductsScreen/>} />
          <Route path="/products/catergories" element={<CategoryScreen/>} />
          <Route path="/products/catergories/:category" element={<CategoryScreen/>} />
        </Routes>
        </Container> 
      </main>
      <Footer />
    </Router>
  );
}

export default App;
