export default (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'task status can`t be empty',
        },
      },
    },
  }, {
    classMethods: {
      associate() {},
    },
  });
  return Status;
};
