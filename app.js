const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = require('./routes')
 
const app = express()

app.set('view engine','ejs')
     

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/contacts',router)

 

 


app.get('/',(req,res)=>{
   

    
})


// Database cont......................................................................
const PORT = process.PORT || 3000
mongoose
  .connect(`mongodb+srv://ramimTitle:xFfqsAJBt1w5kbh6@cluster0.0tm16.mongodb.net/test-db?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
