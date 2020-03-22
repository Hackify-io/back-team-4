import RateType from "../models/RateType";

export const seedRateTypes = async () => {
  const rateTypes = [
    {
        name: "Service"
    },
    {
        name: "Puntuality"
    },
    {
        name: "Instalations"
    }
  ];

  for (const pl of rateTypes) {
    //conditions to determine if a rateType is not considered to insert
    const rateTypeExist = await RateType.findOne({
      name: pl.name
    });
    if (!rateTypeExist) {
      const rateType = new RateType({
        createdUser: "data seed",
        createdDate: new Date(),
        name: pl.name
      });

      await rateType.save();
    }
  }
};
