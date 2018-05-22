export default (sequelize, DataTypes) => {
  const TaskStatus = sequelize.define('TaskStatus', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'task status can`t be empty',
        },
      },
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['active', 'inactive']],
      },
    },
  }, {
    classMethods: {
      associate() {},
    },
  });
  return TaskStatus;
};
