const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value))
            {
              throw new Error("Email is Invalid");
            }
          }
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    //     validate(value){
    //     if(!validator.isAlphanumeric(value))
    //     {
    //       throw new Error("invalid password")
    //     }
    //   }
    },
    cpassword:{
        type: String,
        required: true,
        minlength: 7
        // validate(value){
        //     if(!validator.isAlphanumeric(value))
        //     {
        //       throw new Error("invalid password")
        //     }
        //   }
    },
    date: {
        type: Date,
        default: Date.now()
    },
    messages:[
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            message:{
                type: String,
                required: true
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next();
});

//we are generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}


// stored the message
userSchema.methods.addMessage = async function(name, email, message){
    try{
        this.messages = this.messages.concat({name, email, message})
        await this.save();
        return this.messages;
    }
    catch(err)
    {
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema);

module.exports = User;