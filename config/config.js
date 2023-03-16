require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  whiteList: process.env.WHITE_LIST.split(','),
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  apiKey: process.env.API_KEY,
  adminRole: process.env.ADMIN_ROLE || '3F5FE685DAA1E',
  jwtSecret: process.env.JWT_SECRET || '1B9BE2D3CFA3FD244B62C544AAAEC'
}

module.exports = {config};
