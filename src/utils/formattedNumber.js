export const formattedAmount = number =>
  number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formattedDate = (date, delimiter) => {
  const year = `${date.getFullYear()}`;
  const month =
    date.getMonth() >= 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
  const day = `${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}`;

  return year + delimiter + month + delimiter + day;
};
