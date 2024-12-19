export const getMinAllowedBdate = () => {
  return new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    .toISOString()
    .split("T")[0];
};

// export function getUpcomingSundayMidnight(): Date {
//   const now = new Date();
//   const daysUntilSunday = 7 - now.getDay();
//   const nextSunday = new Date(now);
//   nextSunday.setDate(now.getDate() + daysUntilSunday);
//   nextSunday.setHours(0, 0, 0, 0);
//   return nextSunday;
// }

export function getAge(birthDate: Date): number {
  const now = new Date();
  const diff = now.getTime() - birthDate.getTime();
  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  return age;
}

export const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const daysUntil = (date1: Date, date2: Date) => {
  let Difference_In_Time = date2.getTime() - date1.getTime();

  return Math.round(Difference_In_Time / (1000 * 3600 * 24));
};
