const  mongoose = require('mongoose')
const bcrypt=require('bcrypt')


var schemaAuth=mongoose.Schema({
        firstname:String,
        lastname:String,
        email:String,
        age:Number,
        password:String
})


var User=mongoose.model('user',schemaAuth)
var url="mongodb://localhost:27017/Magazin"




exports.registerFunctionModel=(firstname,lastname,email,age,password)=>{
//test email if exist y9olek emchi lel login w ken much mawjoud yzidou lel BD
  return new Promise((resolve,reject)=>{
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

       return User.findOne({email:email})

    }).then((user)=>{
       if(user){
        mongoose.disconnect()
        reject('Email already exists')
       }else{
          return bcrypt.hash(password,10)
       }

    }).then((hPassword)=>{
        let user=new User({
            firstname : firstname ,
            lastname : lastname ,
            email : email ,
            age : age,
            password : hPassword
        })
       return user.save()
    }).then((user)=>{
        mongoose.disconnect()
        resolve('registered ')
    }).catch((err)=>{
        mongoose.disconnect()
        reject(err)
    })
 
   })

}




exports.loginFunctionModel=(email,password)=>{
   return new Promise ((resolve,reject)=>{
       mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

       return User.findOne({email:email})

        }).then((user)=>{
            if(user){
               bcrypt.compare(password,user.password).then((verif)=>{
                  if(verif){
                     mongoose.disconnect()
                     resolve(user._id)
                  }else{
                     mongoose.disconnect()
                     reject("wrong password,Try again")
                  }
               })
            }else{
               mongoose.disconnect()
               reject("User not founded ")
          }
      }).catch(()=>{
         reject(err)
      })


   })


}
       
   

