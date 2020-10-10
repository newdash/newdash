import { any } from '../any';
import { limit } from './limit';
import { timeout } from './timeout';

/**
 * concurrency functions
 */
export const concurrency = {
  limit,
  timeout,
  any
};
