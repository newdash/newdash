import { any } from '../any';
import { allSettled } from './allSettled';
import { filter } from './filter';
import { LazyPromise } from './LazyPromise';
import { map } from './map';

/**
 * AsyncUtils
 *
 * @since 5.18.0
 */
export const AsyncUtils = {
  filter, map, allSettled, any, LazyPromise
};

export default AsyncUtils;
