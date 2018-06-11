import container from './container';

const { User, Status, Task } = container;

export default async () => {
  await User.sync({ force: true });
  await Status.sync({ force: true });
  await Task.sync({ force: true });
};
