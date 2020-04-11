import User from '../models/User';
import Login from '../models/Login';
export const seedUsers = async () => {
  const dataSeeder = 'Data Seeder';
  const users = [
    {
      email: 'user@mtravel.com',
      password: '$2a$10$/D1WQi9GwOfnoGVjh/fW5uAiPzO1A9hr67Fpm0I8B7QAohRIafliu', //User123
      role: 'member',
      name: 'John',
      lastname: 'Doe',
      age: 30,
      gender: 'Male',
      avatar:
        'https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-creador-de-avatar-masculino.jpg',
    },
  ];

  for (const pl of users) {
    //conditions to determine if a user is not considered to insert
    const userExist = await User.findOne({
      name: pl.name,
    });
    if (!userExist) {
      const login = new Login({
        email: pl.email,
        password: pl.password,
        role: pl.role,
        createdUser: dataSeeder,
        modifiedUser: dataSeeder,
        createdDate: new Date(),
      });
      const loginFromRepo = await login.save();
      const user = new User({
        loginId: loginFromRepo._id,
        createdUser: dataSeeder,
        modifiedUser: dataSeeder,
        createdDate: new Date(),
        name: pl.name,
        lastname: pl.lastname,
        age: pl.age,
        gender: pl.gender,
        avatar: pl.avatar,
      });

      await user.save();
    }
  }
};
