import Event from "../models/Event";

export const seedEvents = async () => {
  const events = [
    {
        title: "Brand new Event 1",
        description: "Something is going to get cool really soon",
        startDate: Date.now(),
        endDate: new Date().setDate(new Date().getDate() + 3)
    },
    {
        title: "Brand new Event 2",
        description: "Short Text",
        startDate: Date.now(),
        endDate: new Date().setDate(new Date().getDate() + 3)
    },
    {
        title: "Brand new Event 3",
        description: "Very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long text",
        startDate: Date.now(),
        endDate: new Date().setDate(new Date().getDate() + 3)
    },
    {
        title: "Brand new Event 4",
        description: "This is an event with a common description that will be useful to messure some of the common length",
        startDate: Date.now(),
        endDate: new Date().setDate(new Date().getDate() + 3)
    }
  ];

  for (const pl of events) {
    //conditions to determine if a doctor is not considered to insert
    const eventExist = await Event.findOne({
      title: pl.title
    });
    if (!eventExist) {
      const event = new Event({
        createdUser: "data seed",
        createdDate: new Date(),
        title: pl.title,
        description: pl.description,
        startDate: pl.startDate,
        endDate: pl.endDate
      });

      await event.save();
    }
  }
};
