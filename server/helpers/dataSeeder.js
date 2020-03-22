//data seed helper
import { seedSpecialties } from './specialtiesSeedMethod';
import { seedPlaces } from './placesSeedMethod';
import { seedDoctors } from './doctorsSeedMethod';
import { seedRateTypes } from './rateTypesSeedMethod';
import { seedUsers } from './userSeedMethod';
import { seedClinics } from './clinicSeedMethod';

export const seedDb = async () => {
    //Seed Independient Entities
    await seedSpecialties();
    await seedPlaces();
    await seedDoctors();
    await seedRateTypes();

    //Seed Dependant Entities
    await seedUsers();
    await seedClinics();
}