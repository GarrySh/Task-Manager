import { encrypt } from '../lib/secure';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
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
      set: function set(value) {
        this.setDataValue('passwordDigest', encrypt(value));
        this.setDataValue('password', value);
        return value;
      },
      validate: {
        len: {
          args: [8, +Infinity],
          msg: 'Password must contains minimum 8 characters in length',
        },
      },
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
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
