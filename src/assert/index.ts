import { JSType } from '../types';

/**
 * must provide value with type
 *
 * @param value
 * @param fieldName
 * @param type
 */
export function mustProvide(value: any, fieldName: string, type: JSType) {

  if (value === undefined || value === null || typeof value !== type) {
    throw new TypeError(`must provide ${type} for ${fieldName} with type ${type}`);
  }

}
