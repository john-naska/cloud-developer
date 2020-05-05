import {Sequelize} from 'sequelize-typescript'; // this is the actual library that it used from npm
import { config } from './config/config'; // some configs from a config file


const c = config.postgress;

// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": c.username,
  "password": c.password,
  "database": c.database,
  "host":     c.host,

  dialect: 'postgres',
  storage: ':memory:',
});

