import { format } from 'date-fns'

export const getDateForEmailNotification = (date: Date) => {
  return format(date, 'yyyy-MM-dd a h:mm')
}
