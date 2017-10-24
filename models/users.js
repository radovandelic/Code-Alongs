var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
const SALT_FACTOR = 10;

var userSchema =  mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", function (done) {
   var user = this;
   if(!user.isModified("password")){
       return done();
   } 
   bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
       if(err){
           return done(err);
       } else {
           bcrypt.hash(user.password, salt, null, function (err, hashedPassword) {
               if(err){
                   return done(err);
               } else {
                   user.password = hashedPassword;
                   done();
               }
               
           });
       }
   });
});

userSchema.methods.comparePasswords = function (guess, done) {
    bcrypt.compare(guess, this.password, function (err, isMatch) {
        done(err, isMatch);
    })
    
};

var User = mongoose.model("User", userSchema);

module.exports = User;