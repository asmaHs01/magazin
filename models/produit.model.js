const mongoose=require('mongoose')

var schemaProduit=mongoose.Schema({
        title:String,
        description:String,
        prix:Number,
        stock:Number,
        image:String,
        userId:String
    })

var Produit=mongoose.model('produit',schemaProduit)
var url="mongodb://localhost:27017/Magazin"

exports.getHomeProduits=()=>{
    return new Promise((resolve,reject)=>{

       mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return  Produit.find({}).limit(6)

   }).then(produits=>{
      mongoose.disconnect()
      resolve(produits)

   }).catch(err=>reject(err))

 })
}

exports.getAllProduits=()=>{
    return new Promise((resolve,reject)=>{

       mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return  Produit.find({})

   }).then(produits=>{
      mongoose.disconnect()
      resolve(produits)

   }).catch(err=>reject(err))

 })
}

exports.getOneProduitDetails=(id)=>{
    return new Promise((resolve,reject)=>{

       mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return  Produit.findById(id)

   }).then(produits=>{
      mongoose.disconnect()
      resolve(produits)

   }).catch(err=>reject(err))

 })
}


exports.postDataProduitModel=(title,description,stock,prix,image,userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

            let produit=new Produit({
                title:title,
                description:description,
                stock:stock,
                prix:prix,
                image:image,
                userId:userId
            })
           return produit.save()


        }).then(()=>{
            mongoose.disconnect()
            resolve('added !')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
   }


   exports.getMyProduits=(userId)=>{
    return new Promise((resolve,reject)=>{

       mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return  Produit.find({userId:userId})

   }).then(produits=>{
      mongoose.disconnect()
      resolve(produits)

   }).catch(err=>reject(err))

 })
}

  exports.deleteproduit=(id)=>{
    return new Promise((resolve,reject)=>{

       mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return  Produit.deleteOne({_id:id})

   }).then(produits=>{
      mongoose.disconnect()
      resolve(true)

   }).catch(err=>reject(err))

 })
}


  exports.getPageUpdateProduitModel=(id)=>{
    return new Promise((resolve,reject)=>{
    
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return Produit.findById(id)
   
       }).then(produits=>{
           mongoose.disconnect()
           resolve(produits)
   
       }).catch(err=>reject(err))
    })
 
 
 }


 exports.postUpdateProduitModel=(produitId,title,description,stock,prix,filename,userId)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

         return Produit.updateOne({_id:produitId},{title:title,description:description,stock:stock,image:filename,prix:prix,userId:userId})
        }).then(()=>{
            mongoose.disconnect()
            resolve('Updated!')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })

} 



