import { format } from "date-fns";

export const formatDate = (data: Date | string): string => {
  const dataObj = typeof data === "string" ? new Date(data) : data;
  return format(dataObj, "dd/MM/yyyy");
};
