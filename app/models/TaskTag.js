export default (sequelize) => {
  const TaskTag = sequelize.define('TaskTag', {}, {});

  return TaskTag;
};
