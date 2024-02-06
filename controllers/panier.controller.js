



exports.getPagePanier=(req,res)=>{
    res.render('panier',{verifUser:req.session.userId})
}


