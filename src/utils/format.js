import { dayjs } from 'element-plus'

export function formatTime(time) {
  return dayjs(time).format('YYYY年MM月DD日')
}
