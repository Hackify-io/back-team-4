import User from "../models/User";
import Clinic from "../models/Clinic";
import RateType from '../models/RateType';
import ClinicRate from '../models/ClinicRate';

export const seedClinicRates = async () => {
  
  //Get One User
  const userFromRepo = await User.find({});
  const user = userFromRepo[0];

  //Get RateTypes
  const rateTypesFromRepo = await RateType.find({});
  const rateType = rateTypesFromRepo[0];

  //Get One Clinic
  const clinicFromRepo = await Clinic.find({});
  const clinic = await clinicFromRepo[0];
  const clinicRates = [
    {
        value: 5
    }
  ];

  for (const pl of clinicRates) {
    //conditions to determine if a clinic is not considered to insert
    const clinicRateExist = await ClinicRate.findOne({
        userId: user._id
    });
    if (!clinicRateExist) {
        const clinicRate = new ClinicRate({
            userId : user._id,
            clinicId: clinic._id,
            rateTypeId: rateType._id,
            value:pl.value
        });
        const rateFromRepo = await clinicRate.save();
        clinic.rates.push(rateFromRepo._id);
        await clinic.save();
    }
  }
};