import axios from 'axios';

class CategoryService {

    getAllCategories() {
        return axios.get(`https://fakestoreapi.com/products/categories`)
    }


    getCategory(category) {
        return axios.get(`https://fakestoreapi.com/products/category/${category}`)
    }


}

export default new CategoryService()