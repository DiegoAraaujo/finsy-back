import Month from "../../../entities/Month";

export const monthMapper = (month: Month) => {
  return {
    id: month.getId(),
    month: month.getMonth(),
    year: month.getYear(),
    salary: month.getSalary(),
  };
};
