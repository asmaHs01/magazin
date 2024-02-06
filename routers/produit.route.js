const produitController=require('../controllers/produit.controller')
const route = require('./auth.route')
const router=require('express').Router()
const GuardAuth=require('./guardAuth')
const multer=require('multer')



router.get('/',GuardAuth.isAuth,produitController.getAllProduitsController)
router.get('/:id',GuardAuth.isAuth,produitController.getOneProduitDetailsController)

route.get('/addproduit',GuardAuth.isAuth,produitController.getAddProduitController)
route.post('/addproduit',multer({
storage:multer.diskStorage({
    destination:function (req, file, cb) {
            cb(null, 'assets/upload')  
      },
    filename:function (req, file, cb) {
            cb(null, Date.now()+'-'+ file.originalname )      
    }
})
}).single('image'),
GuardAuth.isAuth,produitController.postAddProduitController)



module.exports=router


