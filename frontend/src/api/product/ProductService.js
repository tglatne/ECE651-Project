import axios from 'axios';

class ProductService {

    getAllProducts() {
        return axios.get(`https://fakestoreapi.com/products`)
    }

    getProduct(id) {
        return axios.get(`https://fakestoreapi.com/products/${id}`)
    }


}

export default new ProductService()