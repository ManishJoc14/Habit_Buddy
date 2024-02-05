export const getCurrentDate = () => {
    const fullISOString = new Date().toISOString();
    const [year, month, day] = fullISOString.split("T")[0].split("-");

    // Convert numerical month to its corresponding string representation
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthString = monthNames[parseInt(month) - 1];

    return `${monthString}, ${parseInt(day, 10)}`;
};
