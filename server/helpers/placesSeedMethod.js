import Place from "../models/Place";

export const seedPlaces = async () => {
  const dataSeeder = "Data Seeder";
  const places = [
    {
      country: "Mexico",
      state: "Baja California",
      city: "Tijuana"
    },
    {
      country: "Mexico",
      state: "Yucatan",
      city: "Merida"
    },
    {
      country: "Mexico",
      state: "Jalisco",
      city: "Guadalajara"
    },
    {
      country: "Mexico",
      state: "Monterrey",
      city: "Monterrey"
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
        createdUser: "data seed",
        createdDate: new Date(),
        country: pl.country,
        state: pl.state,
        city: pl.city,
        createdUser:dataSeeder,
        modifiedUser:dataSeeder
      });

      await place.save();
    }
  }
};
