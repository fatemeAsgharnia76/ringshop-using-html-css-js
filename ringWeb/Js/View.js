import {Storage} from "../js/Storage.js";
import{populareTypesproducts,bestProducts,midRangeProducts} from "./someFunctions.js";

const orderCount = document.querySelector('.order-count')
const subTotal = document.querySelector('.sub-total')
const cartContent = document.querySelector('.cart-content')
const cartOverlay = document.querySelector('.cart-overlay')
const cartFooter = document.querySelector('.cart-footer')
const noProduct = document.querySelector('.no-product')
let cart = []

class View {
 
  displayData(data){
    populareTypesproducts(data)
    bestProducts(data)
    midRangeProducts(data)
  }


  getCartButtons() {
    const buttons = [...document.querySelectorAll('.hidden-squere')]
    buttons.forEach((item) => {  
      let id = item.dataset.id   
      let count = 0 
      item.addEventListener('click',(event) => {
        count += 1; 
        if (count === 1){
          let cartItem = {...Storage.getProdct(id), amount :1}
          cart = [...cart, cartItem ]
          Storage.saveCart(cart)
          this.setCartValues(cart)
          this.addCartItem(cartItem)
          this.footer()
          item.style.backgroundColor = "#13aff0"
          item.children[0].innerHTML = `
          view cart<img src="../icons/icons8-bag-16.png" class="before-hover">
          <img src="../icons/icons8-bag-16(another).png" class="on-hover"> `
          item.children[0].classList.add('new-features')
          this.carttitle()
        }else {
          item.setAttribute('href',"customerCart(empty).html")    
        }
      })
    })  
  }


  setCartValues(cart) {
    let totalPrice = 0
    let totalItems = 0
    cart.map((item) => {
      totalPrice = totalPrice + item.price*item.amount
      totalItems = totalItems + item.amount
    }) 
    orderCount.innerText = totalItems
    subTotal.innerHTML = "$"+(totalPrice)
  }

 
  addCartItem(item){
    const div = document.createElement('div')
    div.classList.add('cart-item')
    div.innerHTML = `
    <div class="cart-content__img">
      <a class="d-block w-100 h-100">
        <img src= ${item.image} style="width: inherit;height: inherit;">                                               
      </a>                                            
    </div>      
    <div class="cart-content__details pt-2 d-flex w-75 pe-3">
      <div>
        <h3 class="product-name"><a>${item.title}</a></h3>
        <span class="product-count">                                              
          ${item.amount} *
          <span class="cart-content__product-price">$${item.price}</span>                                                   
        </span>                                                                                             
      </div>                                            
      <a class="delete-product" data-id="${item.id}">                                            
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x delete-product__icon" viewBox="0 0 16 16" data-id="${item.id}">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 
          1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>                                                
      </a>                                            
    </div>                                                                               
    `
    cartContent.appendChild(div)
  }


  footer(){
    if (cartContent.children.length == 0) {
      cartOverlay.removeChild(cartFooter)
    }else {
      cartOverlay.appendChild(cartFooter)
    }
  }


  carttitle(){
    if (cartContent.children.length == 0) {
      cartOverlay.appendChild(noProduct)
    }else if (cartOverlay.childElementCount > 2) {
        cartOverlay.removeChild(noProduct)
    }
  }


  removeProduct(id) {
    cart = cart.filter((item) => {
      return item.id !== id
    })
    this.setCartValues(cart)
    Storage.saveCart(cart)
  }


  cartProcess(){
    cartContent.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-product')) {
        let removeItem = event.target
        let id = removeItem.dataset.id
        cartContent.removeChild(removeItem.parentElement.parentElement)
        this.removeProduct(id)
      }
      if (event.target.classList.contains('delete-product__icon') ) {
        let removeItem = event.target
        let id = removeItem.dataset.id
        cartContent.removeChild(removeItem.parentElement.parentElement.parentElement)
        this.removeProduct(id)
      }
      this.footer()
      this.carttitle()
    })
  }


  populate(cart) { 
    cart.forEach((item) => {
      return this.addCartItem(item)
    })
  }

  initApp() {
    cart = Storage.getCart(cart)
    this.setCartValues(cart)
    this.populate(cart)
    this.footer()
    this.carttitle()
  }
}

export {View}




  