export default (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'tag can`t be empty',
        },
      },
    },
  }, {});

  // Tag.associate = (models) => {
  //   Tag.hasMany(models.Task, { foreignKey: 'statusId', as: 'status' });
  // };

  return Tag;
};
