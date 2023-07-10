
class DataPrepration {
    async getdata() {
      try {
        const result = await fetch('../js/data.json')
        const data = await result.json()
        return data
      } catch (err) {
        console.log(err)
      }
    }
  
    dataSeparation(data){
      let products = data.Products
      let popularTypes = data.popularTypes
  
        products = products.map((item) => {
            const {title,price} = item.fields
            const {id,score} = item.sys              //{id}???? ******
            const image = item.fields.image.fields.file.url 
            return {title,price,id,score,image}
        })
        popularTypes= popularTypes.map((item) => {
          const {title,text} = item.fields
          const {id} = item.sys        
          const logo = item.fields.logo.fields.file.url        
          const bgImg = item.fields.bgImg.fields.file.url 
          return {title,text,id,logo,bgImg} 
        })
  
      return {products,popularTypes} 
    }
  
}

export { DataPrepration }