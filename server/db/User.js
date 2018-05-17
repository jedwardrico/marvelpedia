const conn = require('./conn');
const Sequelize = require('sequelize');

const User = conn.define('user', {
  firstname: {
    type: Sequelize.STRING
  },
  lastname : {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  avatar: {
    type: Sequelize.TEXT
  }
}, {
  hooks:{
    afterCreate:{
      //send creation email
    },
    afterUpdate: {
      //only for password send email
    }
  }
})

User.prototype.hashPassword = function(password){
  console.log(password)
}

module.exports = User;