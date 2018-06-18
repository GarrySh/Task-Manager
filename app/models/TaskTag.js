export default (sequelize) => {
  const TaskTag = sequelize.define('TaskTag', {}, {
    timestamps: false,
    freezeTableName: true,
  });

  return TaskTag;
};
