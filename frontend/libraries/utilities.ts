export const serialize = (obj: any, prefix?: string): string => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + '[' + p + ']' : p,
        v = obj[p];
      str.push(
        v !== null && typeof v === 'object'
          ? serialize(v, k)
          : encodeURIComponent(k) + '=' + encodeURIComponent(v),
      );
    }
  }
  return str.join('&');
};

export const getDaysMonthsYears = (time: string): object[] => {
  const _ = <object[]>[];
  switch (time) {
    case 'days':
      for (let i = 1; i <= 31; i++) {
        _.push({ label: i, value: i });
      }
      return _;
    case 'months':
      for (let i = 1; i <= 12; i++) {
        _.push({ label: i, value: i });
      }
      return _;

    case 'years':
      const year = new Date().getFullYear();
      for (let i = 0; i <= 50; i++) {
        _.push({ label: year - i, value: year - i });
      }
      return _;
    default:
      return [];
  }
};
