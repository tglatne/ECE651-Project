<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b5961c8eeb1c87863a98cbc7c9a0cfcd44eb4d22
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CategoryScreen from './screens/CategoryScreen';
import DepartmentScreen from './screens/DepartmentScreen';
<<<<<<< HEAD
=======
import CartScreen from './screens/CartScreen';
>>>>>>> b5961c8eeb1c87863a98cbc7c9a0cfcd44eb4d22

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
<<<<<<< HEAD
=======
          <Route path="/cart/:id" element={<CartScreen/>} />
          <Route path="/cart/" element={<CartScreen/>} />
>>>>>>> b5961c8eeb1c87863a98cbc7c9a0cfcd44eb4d22
        </Routes>
        </Container> 
      </main>
      <Footer />
    </Router>
<<<<<<< HEAD
=======
import './App.css';
import ConnectorApp from './components/ConnectorApp';
function App() {
  return (
    <div className="App">
      

     <ConnectorApp/>
    </div>
>>>>>>> sagar
=======
>>>>>>> b5961c8eeb1c87863a98cbc7c9a0cfcd44eb4d22
  );
}

export default App;
