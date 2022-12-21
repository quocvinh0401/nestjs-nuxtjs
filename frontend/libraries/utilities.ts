import dist from "@vitejs/plugin-vue";

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

export const isValidDate = (day: number, month: number, year: number) => {
  const _year = new Date().getFullYear()
  const _month = new Date().getMonth() + 1
  const _day = new Date().getDate()

  const timeNow = new Date(`${_year}-${_month}-${_day}`)
  const timeRegister = new Date(`${year}-${month}-${day}`)
  // check time is not in future
  if (timeNow < timeRegister) return false

  // check number of days on February
  if (month == 2) {
    if (year % 4 == 0) {
      if (day > 28) return false
      return true
    } else {
      if (day > 29) return false
      return true
    }
  } 
  // check number of day on Jan, Mar, May, Jul, Agu, Oct, Dec
  else if ([1, 3, 5, 7, 8, 10, 12].includes(month)){
    if (day > 31) return false
    return true
  }
  // check number of day on 
  else {
    if (day > 30) return false
    return true
  }
}

export const formatTime = (time: Date) => {
  const now = new Date().getTime()
  const created = new Date(time).getTime()

  let str: string = ''

  const distance = (now - created) / 1000

  if (distance < 60) str = Math.round(distance) + 's'
  else if (distance < 60 * 60) str = Math.round(distance/60) + 'm'
  else if (distance < 60 * 60 * 24) str = Math.round(distance/(60 * 60)) + 'h'
  else if (distance < 60 * 60 * 24 * 7) str = Math.round(distance/(60 * 60 * 24)) + 'd' 
  else if (distance < 60 * 60 * 24 * 7 * 4) str = Math.round(distance/(60 * 60 * 24 * 7)) + 'w'
  else if (distance < 60 * 60 * 24 * 7 * 4 * 12) str = Math.round(distance/(60 * 60 * 24 * 7 * 4)) + 'm'
  else str = Math.round(distance/(60 * 60 * 24 * 7 * 4 * 12)) + 'y'
  return str
} 