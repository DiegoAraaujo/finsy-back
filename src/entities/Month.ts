class Month {
  private id?: number;
  private userId: number;
  private month: number;
  private year: number;
  private salary: number;

  constructor(
    userId: number,
    year: number,
    month: number,
    salary: number,
    id?: number,
  ) {
    this.id = id;
    this.userId = userId;
    this.month = month;
    this.year = year;
    this.salary = salary;
  }

  getId() {
    if (!this.id) {
      throw new Error("Category ID is not defined");
    }
    return this.id;
  }
  getUserId() {
    return this.id;
  }
  getMonth() {
    return this.month;
  }
  getYear() {
    return this.year;
  }
  getSalary() {
    return this.salary;
  }
  toPersistence() {
    return {
      salary: this.salary,
      month: this.month,
      year: this.year,
      userId: this.userId,
    };
  }
}

export default Month;
