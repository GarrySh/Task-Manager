import { encrypt } from '../lib/secure';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'firstName can not be empty',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'lastName can not be empty',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Email address must be valid',
        },
      },
    },
    passwordDigest: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.VIRTUAL,
      set: (value) => {
        this.setDataValue('passwordDigest', encrypt(value));
        this.setDataValue('password', value);
        return value;
      },
      validate: {
        len: {
          args: [6, +Infinity],
          msg: 'Password must contains minimum 6 characters in length',
        },
      },
    },
  }, {
    classMethods: {
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
      associate() {},
    },
  });
  return User;
};
