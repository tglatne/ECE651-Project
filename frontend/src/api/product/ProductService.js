import axios from 'axios';

class ProductService {

    getAllProducts() {
        return axios.get(`https://fakestoreapi.com/products`)
    }

    deleteProduct(id) {
        return axios.delete(`https://fakestoreapi.com/products/${id}`)
    }


}

export default new ProductService()