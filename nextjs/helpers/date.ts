import { format } from "date-fns";

export const isoFormat = (date: Date) => format(date, "yyyy-MM-dd");
