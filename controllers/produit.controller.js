const produitModel=require('../models/produit.model')


exports.getAllProduitsController=(req,res,next)=>{

    produitModel.getAllProduits().then(produits=>{
        res.render('produits',{produits:produits,verifUser:req.session.userId})
    })
}

exports.getOneProduitDetailsController=(req,res,next)=>{
    let id=req.params.id
    produitModel.getOneProduitDetails(id).then(produit=>{
        res.render('details',{produit:produit,verifUser:req.session.userId})
    })
}


//

exports.getAddProduitController =(req,res,next)=>{
    res.render('addproduit',{verifUser:req.session.userId,Smessage:req.flash('Successmessage')[0],Emessage:req.flash('Errormessage')[0]})
}

exports.postAddProduitController=(req,res,next)=>{
    console.log(req.body)
    console.log(req.file.filename)    
    produitModel.postDataProduitModel(req.body.title,req.body.description,req.body.stock,req.body.prix,req.file.filename,req.session.userId).then((msg)=>{
        req.flash('Successmessage',msg)
        res.redirect('/addproduit')
    }).catch((err)=>{
        req.flash('Errormessage',err)
        res.redirect('/addproduit')
    })

}



exports.getMyproduitsPage=(req,res,next)=>{
    produitModel.getMyProduits(req.session.userId).then((produits)=>{
        // console.log(produits)  
        res.render('myproduits',{
            verifUser:req.session.userId,
            myproduits:produits})
    })
    
}


exports.deleteProduitController=(req,res,next)=>{
    let id=req.params.id
    
    produitModel.deleteproduit(id).then((verif)=>{
       res.redirect('/myproduits')
    }).catch((err)=>{
        console.log(err)
    })
}


exports.getMyproduitUpdatePage=(req,res,next)=>{
    let id=req.params.id
    produitModel.getPageUpdateProduitModel(id).then((produit)=>{
        console.log(produit)
        res.render('updateProduit',{produitUpdate:produit,verifUser:req.session.userId,Smessage:req.flash('Successmessage')[0],Emessage:req.flash('Errormessage')[0]})
    }) 

}




exports.postUpdateProduitController=(req,res,next)=>{ 
    if(req.file){
              produitModel.postUpdateProduitModel(req.body.produitId,req.body.title,req.body.description,req.body.stock,req.body.prix,req.file.filename,req.session.userId).then((msg)=>{
                req.flash('Successmessage',msg)
                res.redirect(`/myproduits/update/${req.body.produitId}`)
            }).catch((err)=>{
                req.flash('Errormessage',err)
                res.redirect(`/myproduits/update/${req.body.produitId}`)
            })
        }else{
               produitModel.postUpdateProduitModel(req.body.produitId,req.body.title,req.body.description,req.body.stock,req.body.prix,req.body.oldImage,req.session.userId).then((msg)=>{
                req.flash('Successmessage',msg)
                res.redirect(`/myproduits/update/${req.body.produitId}`)
            }).catch((err)=>{
                req.flash('Errormessage',err)
                res.redirect(`/myproduits/update/${req.body.produitId}`)
            })
        }
}