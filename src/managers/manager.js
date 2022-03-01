const fs = require('fs');

class Manager{
    constructor(path){
        this.path = path
    }
    get = async()=>{
        if(fs.existsSync(this.path)){
        let data = await fs.promises.readFile(this.path, "utf-8")
        let products = JSON.parse(data)
        return { status: "success", products };
        }
        else return{status:"error", error: "List not found"}
    }

    getById = async(search) =>{
        if(fs.existsSync(this.path)){
            let data = await fs.promises.readFile(this.path, "utf-8")
            let products = JSON.parse(data)
            if(products.length>=search) return {status:"success", payload: products[search-1]}
            else return {status:"error", error: "Product not found"}
            }  
        }
    save = async (product)=>{

            try{
            if(fs.existsSync(this.path)){
                let data = await fs.promises.readFile(this.path, "utf-8")
                let products = JSON.parse(data)
                let id = products.length
                id++
                product.id = id      
                products.push(product)
                await fs.promises.writeFile(this.path,JSON.stringify(products,null,2))
                return {status:"success", message:"Product added"}
                
    
            }else{
            product.id = 1
            await fs.promises.writeFile(this.path,JSON.stringify([product],null,2))
            return {status:"success", message:"Product added"}
    
            }
           
        }
        catch(error){
            return{status:"error", message:error}
        }
    }
    put = async(search,update) =>{
        if(fs.existsSync(this.path)){
            let data = await fs.promises.readFile(this.path, "utf-8")
            let products = JSON.parse(data)
            if(search<=products.length){
                update.id = products[search-1].id
                products[search-1] = update
                await fs.promises.writeFile(this.path,JSON.stringify(products,null,2))
                return {status:"success", message:"Product updated"}

            }
            else return {status:"error", error: "Product not found"}

        }
    }

    deleteById = async (id) =>{
        if(fs.existsSync(this.path)){
            let data = await fs.promises.readFile(this.path, "utf-8")
            let products = JSON.parse(data)
            let newProducts = products.splice(id-1,1)
            await fs.promises.writeFile(this.path,JSON.stringify(products,null,2))
            return {status:"success", message:"Deleted"}
        }
        else return {status:"error", error: "Not found"}
    }

    cart = async() =>{
        try{
            if(fs.existsSync(this.path)){
                let data = await fs.promises.readFile(this.path, "utf-8")
                let carts = JSON.parse(data)
                let id = carts.length
                id++
                let time = Date.now()
                let cart = {}
                cart.timestamp = time
                cart.id = id      
                carts.push(cart)
                await fs.promises.writeFile(this.path,JSON.stringify(carts,null,2))
                return {status:"success", message:cart.id}
                
    
            }else{
            cart.id = 1
            let time = Date.now()
            cart.timestamp = time
            await fs.promises.writeFile(this.path,JSON.stringify([],null,2))
            return {status:"success", message:"Product added"}
    
            }
           
        }
        catch(error){
            return{status:"error", message:error}
        }
    }
    addProduct = async(search,product)=>{
        try{
            if(fs.existsSync(this.path)){
                let data = await fs.promises.readFile(this.path, "utf-8")
                let carts = JSON.parse(data)
                if(carts[search-1].products){
                    if(search<=carts.length){
                        let add = product.products
                        carts[search-1].products.push(add)
                        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,2))
                        return {status:"success", message:"Product added"}   
                }
            }else{
                if(search<=carts.length){
                    carts[search-1].products = [product.products]
                    await fs.promises.writeFile(this.path,JSON.stringify(carts,null,2))
                    return {status:"success", message:"Product added"} 
            }
        }
    }
        }catch(error){
            return{status:"error",message:error}
        }
    

    }
    deleteProduct = async(id,product)=>{
        if(fs.existsSync(this.path)){
            let data = await fs.promises.readFile(this.path, "utf-8")
            let carts = JSON.parse(data)
            let filter = Number(product)
            let filtered = carts[id-1].products.filter((item)=> item !== filter)
            carts[id-1].products = filtered
            await fs.promises.writeFile(this.path,JSON.stringify(carts,null,2))
            return {status:"success", message:"Deleted"}
        }
        else return {status:"error", error: "Not found"}
    }
    

}


module.exports = Manager
