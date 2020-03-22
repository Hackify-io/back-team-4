import Specialty from "../models/Specialty";

export const seedSpecialties = async () => {
  const specialties = [
    {
      name:"Plastic Surgery 1",
      imageUrl:"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-img.instyle.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F684xflex%2Fpublic%2Fimages%2F2017%2F10%2F100317-plastic-surgery-lead.jpg%3Fitok%3D-khOFrD-"
    },   
    {
      name:"Steam Cell Research 1",
      imageUrl:"https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/200/200904/stem-cells-in-storage.jpg?w=1155&h=1541"
    },
    {
      name:"Cancer Treatment 1",
      imageUrl:"https://www.cancer.gov/sites/g/files/xnrzdm211/files/styles/cgov_social_media/public/cgov_image/media_image/100/500/8/files/woman-with-headscarf-getting-chemo-treatment-article.jpg"
    },
    {
      name:"Plastic Surgery 2",
      imageUrl:"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-img.instyle.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F684xflex%2Fpublic%2Fimages%2F2017%2F10%2F100317-plastic-surgery-lead.jpg%3Fitok%3D-khOFrD-"
    },
    {
      name:"Dentistry 1",
      imageUrl:"https://res.cloudinary.com/sagacity/image/upload/c_crop,h_3840,w_5760,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/shutterstock_364820018_koj0to.jpg"
    },
    {
      name:"Weight Loss 1",
      imageUrl:"https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/05/23/19/istock-490178734.jpg?w968h681"
    },
    {
      name:"Cancer Treatment 2",
      imageUrl:"https://www.cancer.gov/sites/g/files/xnrzdm211/files/styles/cgov_social_media/public/cgov_image/media_image/100/500/8/files/woman-with-headscarf-getting-chemo-treatment-article.jpg"
    },
    {
      name:"Plastic Surgery 3",
      imageUrl:"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-img.instyle.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F684xflex%2Fpublic%2Fimages%2F2017%2F10%2F100317-plastic-surgery-lead.jpg%3Fitok%3D-khOFrD-"
    }
  ];
  for (const proc of specialties) {
    const specialtyExist = await Specialty.findOne({ name: proc.name });
    if (!specialtyExist) {
      const specialty = new Specialty({
        createdUser: "data seed",
        createdDate: new Date(),
        name: proc.name,
        imageUrl: proc.imageUrl
      });
      await specialty.save();
    }
  }
};
