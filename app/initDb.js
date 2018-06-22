import db from './models';

export default async () => {
  await db.sequelize.sync({ force: true });
};
