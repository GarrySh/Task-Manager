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
    getterMethods: {
      fullName() {
        return this.name;
      },
    },
    freezeTableName: true,
  });

  Status.associate = (models) => {
    Status.hasMany(models.Task, {
      foreignKey: 'statusId',
      as: 'status',
      onDelete: 'SET NULL',
    });
  };

  return Status;
};
