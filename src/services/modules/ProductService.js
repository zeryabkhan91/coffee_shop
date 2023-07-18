import { AuthorizedService } from ".."

const productService = AuthorizedService('/products')

class ProductService {
  static getProduct(params) {
    return productService({
      method: 'GET',
      url: '/',
      params
    })
  }

  static getAllProduct(params) {
    return productService({
      method: 'GET',
      url: '/all',
      params
    })
  }

  static addNewProduct(data) {
    return productService({
      method: 'POST',
      url: '/',
      data
    })
  }

  static deleteProduct(id) {
    return productService({
      method: 'DELETE',
      url: `/${id}`,
    }) 
  }
}

export default ProductService;