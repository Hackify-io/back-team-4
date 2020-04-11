import Doctor from '../models/Doctor';

export const seedDoctors = async () => {
  const dataSeeder = 'Data Seeder';
  const doctors = [
    {
      name: 'David Shafe 1',
      degree: 'Boared Certified Plastic Surgeon',
      pictureUrl:
        'https://www.bbrfoundation.org/sites/default/files/images/people/shaffer-165.jpg',
      expertiseTime: {
        years: 12,
        months: 0,
      },
    },
    {
      name: 'David Shafe 2',
      degree: 'Boared Certified Plastic Surgeon',
      pictureUrl:
        'https://www.bbrfoundation.org/sites/default/files/images/people/shaffer-165.jpg',
      expertiseTime: {
        years: 12,
        months: 0,
      },
    },
    {
      name: 'David Shafe 3',
      degree: 'Boared Certified Plastic Surgeon',
      pictureUrl:
        'https://www.bbrfoundation.org/sites/default/files/images/people/shaffer-165.jpg',
      expertiseTime: {
        years: 12,
        months: 0,
      },
    },
    {
      name: 'David Shafe 4',
      degree: 'Boared Certified Plastic Surgeon',
      pictureUrl:
        'https://www.bbrfoundation.org/sites/default/files/images/people/shaffer-165.jpg',
      expertiseTime: {
        years: 12,
        months: 0,
      },
    },
    {
      name: 'David Shafe 5',
      degree: 'Boared Certified Plastic Surgeon',
      pictureUrl:
        'https://www.bbrfoundation.org/sites/default/files/images/people/shaffer-165.jpg',
      expertiseTime: {
        years: 12,
        months: 0,
      },
    },
    {
      name: 'David Shafe 6',
      degree: 'Boared Certified Plastic Surgeon',
      pictureUrl:
        'https://www.bbrfoundation.org/sites/default/files/images/people/shaffer-165.jpg',
      expertiseTime: {
        years: 12,
        months: 0,
      },
    },
    {
      name: 'David Shafe 7',
      degree: 'Boared Certified Plastic Surgeon',
      pictureUrl:
        'https://www.bbrfoundation.org/sites/default/files/images/people/shaffer-165.jpg',
      expertiseTime: {
        years: 12,
        months: 0,
      },
    },
    {
      name: 'David Shafe 8',
      degree: 'Boared Certified Plastic Surgeon',
      pictureUrl:
        'https://www.bbrfoundation.org/sites/default/files/images/people/shaffer-165.jpg',
      expertiseTime: {
        years: 12,
        months: 0,
      },
    },
    {
      name: 'David Shafe 9',
      degree: 'Boared Certified Plastic Surgeon',
      pictureUrl:
        'https://www.bbrfoundation.org/sites/default/files/images/people/shaffer-165.jpg',
      expertiseTime: {
        years: 12,
        months: 0,
      },
    },
    {
      name: 'David Shafe 10',
      degree: 'Boared Certified Plastic Surgeon',
      pictureUrl:
        'https://www.bbrfoundation.org/sites/default/files/images/people/shaffer-165.jpg',
      expertiseTime: {
        years: 12,
        months: 0,
      },
    },
    {
      name: 'David Shafe 11',
      degree: 'Boared Certified Plastic Surgeon',
      pictureUrl:
        'https://www.bbrfoundation.org/sites/default/files/images/people/shaffer-165.jpg',
      expertiseTime: {
        years: 12,
        months: 0,
      },
    },
    {
      name: 'David Shafe 12',
      degree: 'Boared Certified Plastic Surgeon',
      pictureUrl:
        'https://www.bbrfoundation.org/sites/default/files/images/people/shaffer-165.jpg',
      expertiseTime: {
        years: 12,
        months: 0,
      },
    },
    {
      name: 'David Shafe 13',
      degree: 'Boared Certified Plastic Surgeon',
      pictureUrl:
        'https://www.bbrfoundation.org/sites/default/files/images/people/shaffer-165.jpg',
      expertiseTime: {
        years: 12,
        months: 0,
      },
    },
  ];

  for (const pl of doctors) {
    //conditions to determine if a doctor is not considered to insert
    const doctorExist = await Doctor.findOne({
      name: pl.name,
    });
    if (!doctorExist) {
      const doctor = new Doctor({
        createdUser: dataSeeder,
        modifiedUser: dataSeeder,
        createdDate: new Date(),
        name: pl.name,
        degree: pl.degree,
        pictureUrl: pl.pictureUrl,
        expertiseTime: pl.expertiseTime,
      });

      await doctor.save();
    }
  }
};
