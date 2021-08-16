const Contact = require("./Contact");

exports.getAllContact = (req, res) => {
  Contact.find()
    .then((contacts) => {
       
       res.render('index',{contacts,error:{}})
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "Error",
      });
    });
};

exports.getSingleContact = (req, res) => {
  let { id } = req.parms;
  Contact.findById(id)
    .then((contact) => {
      res.json(contact);
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "Error",
      });
    });
};

exports.createContact = (req, res) => {
  let { name, phone, email, id} = req.body
   let error = {}
   if(!name){
     error.name = 'Please Enter Your Name'
   }
   if(!phone){
     error.phone = "Please Enter Your Phone Number";
   }
   if(!email){
     error.email = "Please Enter Your Email";
   }

   let isError = Object.keys(error).length > 0
   if(isError){
       Contact.find()
         .then((contacts) => {
           res.render("index", { contacts, error });
         })
         .catch((e) => {
           console.log(e);
           res.json({
             message: "Error",
           });
         });
        
   }

   console.log(error,isError);
   return
   
  let contact = new Contact({
    name,
    email,
    phone,
  });
  contact
    .save()
    .then((c) => {
      res.json(c);
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "Error",
      });
    });
};

exports.updateContact = (req, res) => {

    let{name,email,phone}= req.body
    let {id}= req.params
    Contact.findOneAndUpdate(
        {_id:id},
        {$set:{
            name,email,phone
        }},
        {new: true})
        .then(contact=>{

            res.json(contact)

        })
        .catch(e=>{
            console.log(e);
            res.json({
                message:"Error "
            })
        })
};
exports.deleteContact = (req, res) => {
  let { id } = req.params;
  Contact.findOneAndDelete({ _id: id })
    .then((contact) => {
      res.json(contact);
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "Error ",
      });
    }); 

};
