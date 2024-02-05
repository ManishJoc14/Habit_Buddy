export const getNextDay = (dateString) => {
  // Convert the input string to a Date object
  const currentDate = new Date(dateString);

  // Get the current date and add one day
  const nextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);

  // Return the next day as a string in ISO format
  return nextDay.toISOString();
};
