import{onresize,stickyNav} from "./someFunctions.js";
import {DataPrepration} from "../js/DataPrepration.js" ;
import {View} from "../js/View.js";
import {Storage} from "../js/Storage.js";


window.onscroll = () => { 
  stickyNav( document.getElementById("nav-bar") ,"shrink-nav");
  stickyNav( document.getElementById("navbar-section") ,"nav-section__properties");
  stickyNav( document.getElementById("nav-bar__logo"),"nav-bar__logo__resize");
}

window.addEventListener("resize", onresize);


document.addEventListener('DOMContentLoaded', () => {
  const view = new View()
  const dataPrepration = new DataPrepration()
  view.initApp()

  dataPrepration
    .getdata()
    .then((data) => {
      data = dataPrepration.dataSeparation(data)
      view.displayData(data)
      Storage.saveData(data)
    }).then(() =>{
      view.getCartButtons()
      view.cartProcess()
})
})

