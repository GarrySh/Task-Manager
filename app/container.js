import dotenv from 'dotenv';
import logger from './lib/logger';
import buildFormObj from './lib/formObjectBuilder';
import { encrypt } from './lib/secure';
import { User, Status, Task, Tag, TaskTag } from './models';

dotenv.config();

export default {
  logger,
  buildFormObj,
  encrypt,
  User,
  Status,
  Task,
  Tag,
  TaskTag,
};
