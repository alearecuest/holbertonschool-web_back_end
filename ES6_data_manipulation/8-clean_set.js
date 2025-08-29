export default function cleanSet(set, startString) {
  if (!(set instanceof Set) || typeof startString !== 'string' || startString.length === 0) {
    return '';
  }

  const filtered = [];

  for (const value of set) {
    if (typeof value === 'string' && value.startsWith(startString)) {
      filtered.push(value.slice(startString.length));
    }
  }

  return filtered.join('-');
}
