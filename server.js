const express= require('express')
const path=require('path')
const RouterHome=require('./routers/home.route')
const RouterProduit=require('./routers/produit.route')
const RouterAuth=require('./routers/auth.route')
const RouterMyProduits=require('./routers/myproduits.route')
const routeContact=require('./routers/contact.route')
const routeAbout=require('./routers/about.route')
const routePanier=require('./routers/panier.route')
const session=require('express-session')
const MongoDbStore=require('connect-mongodb-session')(session)
const flash=require('connect-flash')

const app=express()

app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine','ejs')
app.set('views','views') // tkhalih yet3aref 3la les fils wahdou

var Store=new MongoDbStore({
    uri:'mongodb://localhost:27017/Magazin',
    collection:'sessions'
})

app.use(flash())

app.use(session({
    secret:"secret key is gseythsbddjklsueyrylvnmpoavwgqfrdyndb",
    // ki ma ta3melhech wa9t tsaker  l browser wa9etha yetbadel e token
   cookie:{
        maxAge:3600000 // 1h
    },
    store:Store,
    resave:true,
    saveUninitialized:true
}))

app.use('/',RouterHome)
app.use('/produits',RouterProduit)
app.use('/',RouterAuth)
app.use('/myproduits',RouterMyProduits)
app.use('/',routeContact)
app.use('/',routeAbout)
app.use('/',routePanier)



app.listen(5000,()=>console.log('server running'))