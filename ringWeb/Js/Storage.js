

class Storage {
    static saveData(data){
        localStorage.setItem('data', JSON.stringify(data))
    }

    static getProdct(id){
        let data = JSON.parse(localStorage.getItem('data')) 
        return data.products.find((item) => item.id === id)
    }

    static saveCart(cart){
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    static getCart() {
        return localStorage.getItem('cart')
          ? JSON.parse(localStorage.getItem('cart'))
          : []
      }
  
}

export {Storage}