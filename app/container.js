import dotenv from 'dotenv';
import logger from './lib/logger';
import buildFormObj from './lib/formObjectBuilder';
import { encrypt } from './lib/secure';
import { User, TaskStatus } from './models';

dotenv.config();

export default {
  logger,
  buildFormObj,
  encrypt,
  User,
  TaskStatus,
};
