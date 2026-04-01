'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    // method check if the entered password is match
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

    generateAuthToken() {
      const token = jwt.sign({ id: this.id, email: this.email, role: this.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return token;
    }

    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    },
    auth_provider: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'email'
    },
    logged_out_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      // beforeUpdate: async (user) => {
      //   if (user.changed('password')) {
      //     const salt = await bcrypt.genSalt(10);
      //     user.password = await bcrypt.hash(user.password, salt);
      //   }
      // }
    }
  });
  return User;
};