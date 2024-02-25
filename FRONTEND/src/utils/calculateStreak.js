export function calculateStreak(dates) {
  if (dates.length === 0) {
    return {
      currentStreak: 0,
      bestStreak: 0,
    };
  }

  let currentStreak = 1;
  let bestStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const prevDate = new Date(dates[i - 1]);
    const currentDate = new Date(dates[i]);

    // Check if the current date is one day after the previous date
    const diffInTime = currentDate.getTime() - prevDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    if (diffInDays === 1) {
      currentStreak++;
      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
      }
    } else {
      currentStreak = 1;
    }
  }

  return {
    currentStreak,
    bestStreak,
  };
}
