import db from './models';

export default async () => {
  const { sequelize } = db;
  await sequelize.sync({ force: true });
};
