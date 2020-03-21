import Clinic from "../models/Clinic";
import Login from '../models/Login';
import Specialty from '../models/Specialty';
import Place from '../models/Place';
import Doctor from '../models/Doctor';

export const seedClinics = async () => {
  const clinics = [
    {
      email: "clinic@mtravel.com",
      password: "$2a$10$jsja/4phQg1D9/XQF4nVoOn2sYDztCSeLOHk9lYeksmp50Th.snji",//Clinic123
      role: "clinic",
      name: "Del Delicioso",
      description: "Del Delicioso is the centerpiece of each resident’s community outpatient experience. EBMC is located off-campus in one of the most underserved and disadvantaged communities in the city.",
      images: [
        "https://static.dentaldepartures.com/clinics/dd_201604030325_5397cbeba0bbf.jpg",
        "https://hospitalcmq.com/wp-content/uploads/2018/06/walkingclinic.jpg",
        "https://www.lavanguardia.com/r/GODO/LV/p6/WebSite/2019/03/19/Recortada/img_xcervera_20190317-230448_imagenes_lv_propias_xcervera_xcervera_s9a0502hospclinic_4_6_1101864324-kujH-U461037507323eGD-992x558@LaVanguardia-Web.jpg",
        "https://healthengine.com.au/info/assets/photo-1519494140681-8b17d830a3e9-1024x680.jpeg"
      ],
      averageTime:{
        hours: 1,
        minutes: 30
      },
      averageCost:3
    }
  ];

  for (const pl of clinics) {
    //conditions to determine if a clinic is not considered to insert
    const clinicExist = await Clinic.findOne({
      name: pl.name
    });
    if (!clinicExist) {
        const login = new Login({
            email: pl.email,
            password: pl.password,
            role: pl.role,
            createdClinic: "data seed",
            createdDate: new Date(),
        });
        const loginFromRepo = await login.save();
        //Get All Specialties
        const specialtiesFromRepo = await Specialty.find({});
        const specialtiesIds = specialtiesFromRepo.map(s => s._id);

        //Get One Place
        const placesFromRepo = await Place.find({});
        const placeId = placesFromRepo[0]._id;
        
        //Get One Doctor
        const doctorsFromRepo = await Doctor.find({});
        const doctorsId = doctorsFromRepo.map(s => s._id);
        
        const clinic = new Clinic({
          loginId:loginFromRepo._id,
          createdClinic: "data seed",
          createdDate: new Date(),
          name: pl.name,
          description: pl.description,
          images: pl.images,
          averageTime: pl.averageTime,
          averageCost: pl.averageCost,
          specialties: specialtiesIds,
          doctors: doctorsId,
          location: placeId,
          images: pl.images
      });

      await clinic.save();
    }
  }
};
