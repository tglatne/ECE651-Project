import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CategoryScreen from './screens/CategoryScreen';
import DepartmentScreen from './screens/DepartmentScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductAddScreen from './screens/ProductAddScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/products/:id' element={<ProductScreen />} />
            <Route path='/products' element={<HomeScreen />} />
            <Route
              path='/products/catergories'
              element={<DepartmentScreen />}
            />
            <Route
              path='/products/categories/:id'
              element={<CategoryScreen />}
            />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/cart/' element={<CartScreen />} />

            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/login/' element={<LoginScreen />} />
            <Route path='/register/' element={<RegisterScreen />} />
            <Route path='/admin/productlist/' element={<ProductListScreen />} />
            <Route
              path='/admin/product/edit/:id'
              element={<ProductEditScreen />}
            />
            <Route path='/admin/product/add/' element={<ProductAddScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
