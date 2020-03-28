import User from "../models/User";
import Clinic from "../models/Clinic";
import ClinicReview from '../models/ClinicReview';

export const seedClinicReviews = async () => {
  
  //Get One User
  const userFromRepo = await User.find({});
  const user = userFromRepo[0];

  //Get One Clinic
  const clinicFromRepo = await Clinic.find({});
  const clinic = await clinicFromRepo[0];
  const clinicReviews = [
    {
        username:`${user.name} ${user.lastname}`,
        message:"Del Delicioso is the best experience i had in a long time"
    }
  ];

  for (const pl of clinicReviews) {
    for(const cli of clinicFromRepo){
      //conditions to determine if a clinic is not considered to insert
      const clinicReviewExist = await ClinicReview.findOne({
        review: pl,
        clinicId:cli._id
      });
      if (!clinicReviewExist) {
          const clinicReview = new ClinicReview({
              userId : user._id,
              clinicId: cli._id,
              review:pl
          });
          const reviewFromRepo = await clinicReview.save();
          cli.reviews.push(reviewFromRepo._id);
          await cli.save();
      }
    }
    
  }
};