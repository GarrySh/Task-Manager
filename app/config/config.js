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
  },
  production: {
    dialect: 'postgres',
    use_env_variable: 'postgres://nwcrpyhahsmqod:d4ef32d867f2516c1aae6b8fb3cb7e0c9691b6fca3d42d3c77fd313e53626111@ec2-54-246-84-200.eu-west-1.compute.amazonaws.com:5432/d1dps8d760mt6p',
    // protocol: 'postgres',
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // host: process.env.DB_HOSTNAME,
    operatorsAliases: false,
  },
};
