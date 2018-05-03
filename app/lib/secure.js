import crypto from 'crypto';

export const secret = 'secret_token';

export const encrypt = value => crypto.createHmac('sha256', secret)
  .update(value)
  .digest('hex');
