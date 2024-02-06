const produitModel=require('../models/produit.model')


exports.homeProduitController=(req,res,next)=>{

    produitModel.getHomeProduits().then(produits=>{
        res.render('index',{
            produits:produits,
            verifUser:req.session.userId})
    })
}


