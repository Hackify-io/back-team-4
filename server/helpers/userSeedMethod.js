import User from "../models/User";
import Login from '../models/Login';
export const seedUsers = async () => {
  const users = [
    {
      email: "user@mtravel.com",
      password: "$2a$10$/D1WQi9GwOfnoGVjh/fW5uAiPzO1A9hr67Fpm0I8B7QAohRIafliu",//User123
      role: "member",
      name: "John",
      lastname: "Doe",
      age: 30,
      gender: "Male"
    }
  ];

  for (const pl of users) {
    //conditions to determine if a user is not considered to insert
    const userExist = await User.findOne({
      name: pl.name
    });
    if (!userExist) {
        const login = new Login({
            email: pl.email,
            password: pl.password,
            role: pl.role,
            createdUser: "data seed",
            createdDate: new Date(),
        });
        const loginFromRepo = await login.save();
      const user = new User({
          loginId:loginFromRepo._id,
          createdUser: "data seed",
          createdDate: new Date(),
          name: pl.name,
          lastname: pl.lastname,
          age: pl.age,
          gender: pl.gender
      });

      await user.save();
    }
  }
};
