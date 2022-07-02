import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export const TZ = 'Asia/Shanghai';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(TZ);

export function utcDayjs(args?: any) {
  return dayjs.tz(args);
}

export * from './const';
