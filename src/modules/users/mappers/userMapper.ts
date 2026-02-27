import User from "../../../entities/User";

export const userMapper = (user: User) => {
  return {
    id: user.getId(),
    name: user.getName(),
    email: user.getEmail(),
  };
};
