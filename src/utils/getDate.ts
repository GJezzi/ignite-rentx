import { addDays } from "date-fns";

export const getDate = (date: Date) => {
  return addDays(date, 1)
}