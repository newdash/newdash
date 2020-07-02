export function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

export default baseUnary
