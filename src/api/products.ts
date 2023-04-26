import { PRODUCTS } from './apiUrls'
import {Get} from './index'

export const fetchProductsAPI = () =>{
    return Get(`${PRODUCTS.getProducts}`)
}