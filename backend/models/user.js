const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    minlength: 4,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
        validator: function(email) {
            //see if email format is correct
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email);
        },
        message: 'Please enter a valid email'
      }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function (pswd) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/.test(pswd);
      },
      message: props => `${props.value} is not a valid password!`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
  
//     try {
//       const salt = await bcrypt.genSalt(10);
//       this.password = await bcrypt.hash(this.password, salt);
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });
//   userSchema.methods.comparePassword = async function (candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
//   };
  
  module.exports = mongoose.model("User", userSchema);