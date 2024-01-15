export const getDaysLeft = (startDateString, endDateString) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    // Calculate the difference in milliseconds
    const differenceInMillis = endDate - startDate;

    // Convert milliseconds to days
    const daysLeft = Math.ceil(differenceInMillis / (1000 * 60 * 60 * 24));

    return daysLeft;
};
