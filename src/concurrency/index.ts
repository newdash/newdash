import { any } from '../any';
import series from '../series';
import { limit } from './limit';
import { timeout } from './timeout';


/**
 * concurrency functions
 */
export const concurrency = {
  limit,
  timeout,
  any,
  series
};
