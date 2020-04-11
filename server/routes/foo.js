import express from "express";
import Repository from "./../services/repository";
const router = express();

// Foo model
import Model from "./../models/Foo";
// FooChild model
import FooChild from "./../models/FooChild";

//Validations on Foo
import { validateFooFields as validateModelFields } from "./../validations/foo";
import { validateFooChildFields } from "./../validations/fooChild";

// @route   GET api/foos
// @desc    Get foos
// @access  Public
router.get("/", async (req, res) => {
  let response = await Repository.getAll(Model, null, null, req.query);
  res.status(response.statusCode).json(response);
});

// @route   GET api/foos/:id
// @desc    Get foos by id
// @access  Public
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  let response = await Repository.getById(Model, id);
  res.status(response.statusCode).json(response);
});

// @route   POST api/foos
// @desc    Create post
// @access  Public
router.post("/", async (req, res) => {
  let response = await Repository.create(Model, req.body, validateModelFields);
  return res.status(response.statusCode).json(response);
});

// @route   PUT api/foos/id
// @desc    Update foos
// @access  Public
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  let response = await Repository.update(
    Model,
    id,
    req.body,
    validateModelFields
  );
  return res.status(response.statusCode).json(response);
});

// @route   DELETE api/foo/:id
// @desc    Delete foo
// @access  Public
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let response = await Repository.remove(Model, id);
  return res.status(response.statusCode).json(response);
});

// @route   POST api/foos/:fooId/foochildren
// @desc    Create a FooChild for a Foo
// @access  Private
router.post(
  "/:id/foochildren",
  //passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    //Get Parent Id
    let fooId = req.params.id;
    let fooParentResponse = await Repository.getById(Model, fooId);
    if (fooParentResponse.result === null) {
      fooParentResponse.InvalidUrlParameter("Foo");
      return res.status(fooParentResponse.statusCode).json(fooParentResponse);
    }
    let response = await Repository.create(
      FooChild,
      req.body,
      validateFooChildFields
    );
    return res.status(response.statusCode).json(response);
  }
);

// @route   GET api/foos/:id/foodchildren
// @desc    Get foo children
// @access  Public
router.get("/:id/foochildren", async (req, res) => {
  const fooId = req.params.id;
  const filter = {
    foo: fooId,
  };
  const populate = ["foo"];
  let response = await Repository.getAll(FooChild, filter, populate);
  res.status(response.statusCode).json(response);
});

// @route   GET api/foos/:id/foodchildren
// @desc    Get foo children
// @access  Public
router.get("/:id/foochildren/:childrenId", async (req, res) => {
  const id = req.params.childrenId;
  const populate = ["foo"];
  let response = await Repository.getById(FooChild, id, populate);
  res.status(response.statusCode).json(response);
});

export default router;
