const express = require('express')
const Manager = require('../managers/manager')
let admin = new Manager("./files/carrito.JSON")
const router = express.Router();

router.post('/',(req,res)=>{
    admin.cart().then(result=>res.send(result))
})

router.delete('/:id', (req,res)=>{
    admin.deleteById(req.params.id).then(result=>res.send(result))
})

router.get("/:id/productos", (req,res)=>{
    admin.getById(req.params.id).then(result=>res.send(result))
})

router.post('/:id/productos',(req,res)=>{
    let update = req.body
    admin.addProduct(req.params.id,update).then(result=>res.send(result))
})

router.delete("/:id/productos/:product", (req,res)=>{
    admin.deleteProduct(req.params.id,req.params.product).then(result=>res.send(result))
    })
    
module.exports = router;
