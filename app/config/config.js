module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './db.development.sqlite',
    operatorsAliases: false,
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    operatorsAliases: false,
    logging: false,
  },
  production: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    operatorsAliases: false,
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
  },
};
