import container from './container';

const {
  User, Status, Task, Tag, TaskTag,
} = container;

export default async () => {
  await User.sync({ force: true });
  await Status.sync({ force: true });
  await Task.sync({ force: true });
  await Tag.sync({ force: true });
  await TaskTag.sync({ force: true });
};
