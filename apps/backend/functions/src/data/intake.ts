const currentDate = new Date();

export const intakeData = {
  intake: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
  startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
  deadline: new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 10),
};
