import User from '../models/User';
import Clinic from '../models/Clinic';
import ClinicReview from '../models/ClinicReview';

export const seedClinicReviews = async () => {
  const dataSeeder = 'Data Seeder';
  //Get One User
  const userFromRepo = await User.find({});
  const user = userFromRepo[0];

  //Get One Clinic
  const clinicFromRepo = await Clinic.find({});
  const clinicReviews = [
    {
      username: `${user.name} ${user.lastname}`,
      message: 'Del delicatesen is the best experience i had in a long time',
    },
  ];

  for (const pl of clinicReviews) {
    for (const cli of clinicFromRepo) {
      //conditions to determine if a clinic is not considered to insert
      const clinicReviewExist = await ClinicReview.findOne({
        review: pl,
        clinic: cli._id,
      });
      if (!clinicReviewExist) {
        const clinicReview = new ClinicReview({
          user: user._id,
          clinic: cli._id,
          review: pl,
          createdUser: dataSeeder,
          modifiedUser: dataSeeder,
        });
        const reviewFromRepo = await clinicReview.save();
        cli.reviews.push(reviewFromRepo._id);
        await cli.save();
      }
    }
  }
};
