export const dateFormat = (date) => {
  if (!date) return "";
  const [year, mounth, day] = date.split("-");
  return `${day}-${mounth}-${year}`;
}

export const dateFormatToInput = (date) => {
  if (!date) return "";
  const [day, mounth, year] = date.split("-");
  return `${year}-${mounth}-${day}`;
}

export const parseDate = (date) => {
  if (!date) return new Date(0);
  const [day, month, year] = date.split('-');
  return new Date(`${year}-${month}-${day}`);
}

export const dateToMonth = (date) => {
  if (!date) return "";
  const [year, month] = date.split("-");
  return `${month}-${year}`;
}
