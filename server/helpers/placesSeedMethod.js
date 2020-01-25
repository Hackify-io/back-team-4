import Place from '../models/Place';

export const seedPlaces = async () => {
  const places = [
    {
      country: 'mexico',
      state: 'baja califas',
      city: 'ensenada'
    },
    {
      country: 'mexico',
      state: 'baja california',
      city: 'tijuana'
    }
  ];

  for (const pl of places) {
    //conditions to determine if a place is not considered to insert
    const placeExist = await Place.findOne({
      country: pl.country,
      state: pl.state,
      city: pl.city
    });
    if (!placeExist) {
      const place = new Place({
        createdUser: 'data seed',
        createdDate: new Date(),
        country: pl.country,
        state: pl.state,
        city: pl.city
      });

      await place.save();
    }
  }
};
