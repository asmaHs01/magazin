const route=require('express').Router()
const PanierController=require('../controllers/panier.controller')


route.get('/panier',PanierController.getPagePanier)


module.exports=route