const express = require('express')
const Manager = require('../managers/manager')
let admin = new Manager("./src/files/productos.JSON")
const router = express.Router();


let authorization = true
const isAuthorized = (req=request, res = response,next)=>{
    if(!authorization){
        res.status(400).send({error:"error",message:"Ruta no autorizada"})
    }else{
        next()
    }
}


router.get('/', (req,res)=>{
    admin.get().then(result=>res.send(result))
})

router.get('/:id', (req,res)=>{
    admin.getById(req.params.id).then(result=>res.send(result))
})

router.post('/', isAuthorized, (req,res)=>{
    let product = req.body
    admin.save(product).then(result=>res.send(result))
})

router.put('/:id', isAuthorized, (req,res)=>{
    let update = req.body
    admin.put(req.params.id,update).then(result=>res.send(result))
})

router.delete('/:id', isAuthorized, (req,res)=>{
    admin.deleteById(req.params.id).then(result=>res.send(result))
})

module.exports = router;

