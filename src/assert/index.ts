type JSType = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';

export function mustProvide(value: any, fieldName: string, type: JSType) {

  if (value === undefined || value === null || typeof value !== type) {
    throw new TypeError(`must provide ${type} for ${fieldName}`);
  }

}
