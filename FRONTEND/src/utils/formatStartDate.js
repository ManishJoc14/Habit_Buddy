export const formatStartDate = (inputDateString) => {
    const dateObj = new Date(inputDateString);
    
    // Convert numerical month to its corresponding string representation
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const monthString = monthNames[dateObj.getMonth()];

    // Get day without leading zero
    const day = dateObj.getDate();

    return `${monthString} ${day}`;
};
