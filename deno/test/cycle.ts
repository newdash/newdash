
export function isCyclic(obj: any): boolean {

  var objects = new Set()

  const detect = (obj: any): boolean => {
    if (obj && typeof obj === 'object') {
      if (objects.has(obj)) {
        return true;
      }
      objects.add(obj);
      for (var key in obj) {
        if (typeof obj.hasOwnProperty == "function" && obj.hasOwnProperty(key) && detect(obj[key])) {
          return true;
        }
      }
    }
    return false;
  }

  objects.clear()

  return detect(obj);
}
