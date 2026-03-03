class User {
  private id?: number;
  private name: string;
  private email: string;
  private passwordHash: string;

  constructor(name: string, email: string, passwordHash: string, id?: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
  }

  getId() {
    if (!this.id) {
      throw new Error("User ID is not defined");
    }
    return this.id;
  }
  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getPasswordHash() {
    return this.passwordHash;
  }
  toPersistence() {
    return {
      name: this.name,
      email: this.email,
      passwordHash: this.passwordHash,
    };
  }
}

export default User;
