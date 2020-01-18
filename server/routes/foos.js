import express from "express";
import passport from "passport";

const router = express();

// Foo model
import Foo from "./../models/Foo";
// FooChild model
import FooChild from "./../models/FooChild";
// ApiResponse model
import ApiResponse from "./../models/ApiResponse";

//Validations on Foo
import { validateFooFields } from "./../validations/foo";
import { validateFooChildFields } from "./../validations/fooChild";

// @route   GET api/foos
// @desc    Get foos
// @access  Public
router.get("/", async (req, res) => {
  let response = new ApiResponse();
  try {
    let foos = await Foo.find();
    response.Ok(foos);
    res.status(response.statusCode).json(response);
  } catch (err) {
    response.InternalServerError(err);
    res.status(response.statusCode).json(response);
  }
});

// @route   GET api/foos/:id
// @desc    Get foos by id
// @access  Public
router.get("/:id", async (req, res) => {
  let response = new ApiResponse();
  try {
    let foo = await Foo.findById(req.params.id);
    if (!foo) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
    await response.Ok(foo);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err);
    res.status(response.statusCode).json(response);
  }
});

// @route   POST api/foos
// @desc    Create post
// @access  Public
router.post("/", async (req, res) => {
  let response = new ApiResponse();
  const { errors, isValid } = validateFooFields(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);
    return res.status(response.statusCode).json(response);
  }

  const newFoo = new Foo({
    key: req.body.key,
    value: req.body.value,
    description: req.body.description,
    createdUser: req.body.createdUser,
    createdDate: new Date()
  });

  try {
    let saveResponse = await newFoo.save();
    await response.Ok(saveResponse);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err);
    res.status(response.statusCode).json(response);
  }
});

// @route   PUT api/foos/id
// @desc    Update foos
// @access  Public
router.put("/:id", async (req, res) => {
  let response = new ApiResponse();
  //Validations
  const { errors, isValid } = validateFooFields(req.body);
  //Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);
    return res.status(response.statusCode).json(response);
  }

  //Look if foo Exist
  let foo;
  try {
    foo = await Foo.findById(req.params.id);
    if (!foo) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
  } catch (err) {
    await response.InternalServerError(err);
    res.status(response.statusCode).json(response);
  }

  const updatedFoo = {
    key: req.body.key,
    description: req.body.description,
    value: req.body.value,
    modifiedUser: req.body.modifiedUser,
    modifiedDate: new Date()
  };

  try {
    let updateResponse = await Foo.findOneAndUpdate(req.params.id, {
      $set: updatedFoo
    });
    let updatedModel = await Foo.findById(updateResponse._id);
    await response.Ok(updatedModel);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err);
    res.status(response.statusCode).json(response);
  }
});

// @route   DELETE api/foo/:id
// @desc    Delete foo
// @access  Public
router.delete("/:id", async (req, res) => {
  let response = new ApiResponse();
  try {
    let foo = await Foo.findById(req.params.id);
    if (!foo) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
    await foo.remove();
    await response.NoContent();
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err);
    res.status(response.statusCode).json(response);
  }
});

// @route   POST api/foos/:fooId/foochildren
// @desc    Create a FooChild for a Foo
// @access  Private
router.post(
  "/:id/foochildren",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let response = new ApiResponse();
    const { errors, isValid } = validateFooChildFields(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      await response.ValidationError(errors);
      return res.status(response.statusCode).json(response);
    }
    try {
      let fooParent = await Foo.findById(req.params.id);
      if (!fooParent) {
        await response.InvalidUrlParameter("Foo");
        return res.status(response.statusCode).json(response);
      }
      const newFooChild = new FooChild({
        foo: fooParent,
        relationshipType: req.body.relationshipType,
        active: req.body.active,
        createdUser: req.body.createdUser,
        createdDate: new Date()
      });

      let newFooChildResponse = await newFooChild.save();
      response.Ok(newFooChildResponse);
      res.json(response);
    } catch (err) {
      await response.InternalServerError(err);
      res.status(response.statusCode).json(response);
    }
  }
);

export default router;
