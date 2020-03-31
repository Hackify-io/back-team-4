import Blog from "../models/Blog";

export const seedBlogs = async () => {
  const blogs = [
    {
        title: "Brand new Blog 1",
        description: "Something is going to get cool really soon",
        startDate: Date.now(),
        endDate: new Date().setDate(new Date().getDate() + 3)
    },
    {
        title: "Brand new Blog 2",
        description: "Short Text",
        startDate: Date.now(),
        endDate: new Date().setDate(new Date().getDate() + 3)
    },
    {
        title: "Brand new Blog 3",
        description: "Very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long text",
        startDate: Date.now(),
        endDate: new Date().setDate(new Date().getDate() + 3)
    },
    {
        title: "Brand new Blog 4",
        description: "This is an blog with a common description that will be useful to messure some of the common length",
        startDate: Date.now(),
        endDate: new Date().setDate(new Date().getDate() + 3)
    }
  ];

  for (const pl of blogs) {
    //conditions to determine if a doctor is not considered to insert
    const blogExist = await Blog.findOne({
      title: pl.title
    });
    if (!blogExist) {
      const blog = new Blog({
        createdUser: "data seed",
        createdDate: new Date(),
        title: pl.title,
        description: pl.description,
        startDate: pl.startDate,
        endDate: pl.endDate
      });

      await blog.save();
    }
  }
};
