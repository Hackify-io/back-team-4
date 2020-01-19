import Clinic from '../models/Clinic';

export const seedClinics = async () => {
  const clinics = [
    {
      name: 'Seguro imms',
      location: 'Ensenada',
      procedures: ['urology', 'cardiology', 'dentist'],
      description: 'first description'
    },
    {
      name: 'Velmar',
      location: 'Ensenada',
      procedures: ['urology', 'cardiology'],
      description: 'second description'
    }
  ];

  clinics.forEach(c => {
    const clinic = new Clinic({
      createdUser: 'data seed',
      feedback: 'dummy feedback',
      telephone: '1234567890',
      address: 'dummy address',
      createdDate: new Date(),
      name: c.name,
      location: c.location,
      procedures: c.procedures,
      description: c.description,
      imgs: []
    });

    //TODO
    //check if clinic exist
    //search by name and createdUser
    const clinicExist = Clinic.findOne({
      name: c.name,
      createdUser: c.createdUser
    });

    if (clinicExist) {
      //do nothing
      return;
    } else {
      console.log('Running clinics seed method');

      clinic.save().then();
    }
  });
};
