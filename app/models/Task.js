export default (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'task status can`t be empty',
        },
      },
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    creator: DataTypes.STRING,
    assignedTo: DataTypes.STRING,
    tags: DataTypes.STRING,
  }, {
    classMethods: {
      associate() {},
    },
  });
  return Task;
};
