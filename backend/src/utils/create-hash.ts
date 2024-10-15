import { INTRIC_SALT } from '@/config';
import 'crypto';
import { createHash } from 'crypto';

export const generateHash = (user: string, assistant_id: string, app: string) => {
  const salt = INTRIC_SALT;
  const input = `${user}${assistant_id}${app}${salt}`;

  // const _hash = createHmac('sha256', salt).update(input).digest('base64url');
  const hash = createHash('sha256').update(input).digest('base64');

  return hash;
};
