const express = require("express");
const router = express.Router();
const {
  addEmployer,
  getAllEmployers,
  getEmployerById,
  deleteEmployer,
  updateEmployer,
  getAllJobsByEmployer
} = require("../controllers/Employer");
const Employer = require("../models/Employer");
const requireAuth=require("../middleware/requireAuth");



// require auth for Employer
router.use(requireAuth)

// Get all employers
router.get("/all-employers", getAllEmployers);

// Get a single employer by ID
router.get("/single-employer/:id", getEmployerById);

// Add a new employer
router.post("/add-employer", addEmployer);

// Delete an employer by ID
router.delete("/delete-employer/:id", deleteEmployer);

// Update an employer by ID
router.patch("/update-employer/:id", updateEmployer);


// get by all jobs by employer 
router.get("/all-jobs-byEmployer/:idEmployer", getAllJobsByEmployer);

module.exports = router;
