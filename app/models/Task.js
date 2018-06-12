export default (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'task name can`t be empty',
        },
      },
    },
    description: DataTypes.TEXT,
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        notEmpty: {
          msg: 'task status can`t be empty',
        },
      },
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'creator can`t be empty',
        },
      },
    },
    assignedToId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'task assignedTo can`t be empty',
        },
      },
    },
    // tags: DataTypes.STRING,
  }, {});

  Task.associate = (models) => {
    Task.belongsTo(models.User, { as: 'creator' });
    Task.belongsTo(models.User, { as: 'assignedTo' });
    Task.belongsTo(models.Status, { as: 'status' });
    Task.belongsToMany(models.Tag, {
      through: 'TaskTag',
    });
  };
  return Task;
};
