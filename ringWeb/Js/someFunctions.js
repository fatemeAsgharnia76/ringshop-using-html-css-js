const firstPopularTypeDOM = document.querySelector('#pt-frst-col')
const secondPopularTypeDOM = document.querySelector('#pt-scnd-col')
const thirdPopularTypeDOM = document.querySelector('#pt-thrd-col')
const bestProductsDOM = document.querySelector('.products-cards__container')
const midRangeProductsDOM = document.querySelector('.mid-range-products')
const navCrt = document.querySelector('.nav-cart')
const cartOverlay = document.querySelector('.cart-overlay')


function onresize() {
  const width = document.body.clientWidth;
  if ( width< 992 && navCrt.childElementCount >1) {
    navCrt.removeChild(cartOverlay)
  } else if (width > 992) {
    navCrt.appendChild(cartOverlay)
  }
}


function stickyNav (tagId, className) {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    tagId.classList.add(className);
   } else {
    tagId.classList.remove(className);
   }    
}



function populareTypesproducts(data){
  let resualt = ' '
  data.popularTypes.forEach((item) => {
    resualt = `
    <div class="popular-types__element">
      <div class="zoom-in dark-shadow bg h-100" style="background:url(${item.bgImg})no-repeat center/cover"></div>
      <div class="pt-element__content flex-column"> 
          <div class="mb-4">
            <img src= ${item.logo}  width="52px" height="fit-content">
          </div>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
          <button type="button" class="bns__Comon-featurs btn-50-radius">SEE RINGS</button>
      </div> 
    </div>`

    if (item.id == 20) {
      firstPopularTypeDOM.innerHTML = resualt
    }else if (item.id == 21)  {
    secondPopularTypeDOM.innerHTML = resualt
    }else if (item.id == 22) {
    thirdPopularTypeDOM.innerHTML = resualt   
  }  
})
}



function bestProducts(data) {
  const bestProducts = ((data.products.filter( item=> item.score > 7))
    .sort((a, b)=> b.score - a.score)).
    slice(0,8)
    bestProductsDOM.innerHTML = productsTemplate(bestProducts)
}

function midRangeProducts(data){
  const midRangeProducts =((data.products.filter( item=> item.score>5 && item.score<7))
  .sort((a, b)=> b.score - a.score))
  .slice(0,4)
  midRangeProductsDOM.innerHTML =productsTemplate(midRangeProducts)
}



function productsTemplate(products) { 
  let prosTemplate = ' '
  products.forEach((item) => {
    let star = ' '
    if(item.score >= 9){
      star = ` 
      <div class="d-flex justify-content-center pt-2">
        <img src="../icons/icons8-star.png"><img src="../icons/icons8-star.png">
        <img src="../icons/icons8-star.png"><img src="../icons/icons8-star.png">
        <img src="../icons/icons8-star.png">
      </div>
      `
    }
    prosTemplate += `
    <li class="col-6 col-md-3 mb-3 px-2">
      <div class="product-card">
        <div class="product-img__area">
            <div class="product-img__icon-pos eye-icon">
              <a href="">
                <div class="icon-circle">
                  <img src="../icons/icons8-eye(primary).png">
                  <img src="../icons/icons8-eye.png" class="change-icon-color">      
                </div>
              </a>
            </div>
            <div class="product-img__icon-pos heart-icon">
              <a href="">
                <div class="icon-circle">
                  <img src="../icons/icons8-heart(primary).png" class="chang-bg-color">    
                  <img src="../icons/icons8-heart-16.png" class="change-icon-color">      
                </div>
              </a>
            </div>
            <a  class="hidden-squere bns__Comon-featurs" data-id = ${item.id}>
              <span>ADD TO CART</span>
            </a>
            <a><img src= ${item.image} class="w-100"></a>
          </div>
          <div class="d-flex flex-column p-3">
            <a  class="product-type">Rings</a>
            <h3 class="product-name mb-4"><a href="">${item.title}</a></h3>
            <span class="product-price">$${item.price}</span>   
            ${star}
          </div>     
      </div>
    </li>` 
  })
  return prosTemplate
}



export{onresize,stickyNav,populareTypesproducts,bestProducts,midRangeProducts}