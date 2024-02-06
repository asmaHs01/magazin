const router=require('express').Router()
const produitController=require('../controllers/produit.controller')
const multer=require('multer')
const GuardAuth=require('./guardAuth')


router.get('/',GuardAuth.isAuth,produitController.getMyproduitsPage)
router.get('/delete/:id',GuardAuth.isAuth,produitController.deleteProduitController)


router.get('/update/:id',GuardAuth.isAuth,produitController.getMyproduitUpdatePage)


router.post('/update', multer({
    storage:multer.diskStorage({
        destination:function (req, file, cb) {  
          cb(null, 'assets/upload')          
          },
        filename:function (req, file, cb) { 
                cb(null, Date.now()+'-'+ file.originalname )  
        }
    })
    }).single('image'),GuardAuth.isAuth,produitController.postUpdateProduitController)


module.exports=router