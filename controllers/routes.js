var express = require("express");
var router = express.Router();
var data = require("../models/students");
var Student = require("../models/schema");

var test = {
  name: "George",
  age: 32,
  sex: "male",
  country: "Thailand"
};
//Student.delete()
//Student.create(test);
// Read
/*router.use((req, res, next) => {
  if(req.isAuthenticated()){
    next();
  } else {
    req.flash("danger", "Please log in.");
    res.redirect("/auth");
  }
});*/

router.get("/", (req, res) => {
  //res.render("home", { students: data.getAll() });
  //res.send(studentsArray);

  /*
  Student.find(function (err, students) {
    if (err) {
      console.log(err)
    } else {
      res.render("index", { students: students });
    }
  });
  */

  Student.find()
    .then(students => res.render("index", { students: students }))
    .catch(error => console.log(error));

});

// CREATE
router.get("/add", (req, res) => {
  var message = "Please fill in the form";
  res.render("addStudent", { message: message });
});

router.post("/add", (req, res) => {

  var object = new Student(req.body);
  var msg = "";
  object.save(function (err) {
    if (err) {
      console.log(err)
    } else {
      res.render("addStudent", { message: object.name + " succesfully added" });
    }
  });
  /*
  data.addNewStudent(studentObj, err => {
    if (err) {
      message = err;
    } else {
      message = "Student successfully added";
    }
    res.render("addStudent", { message: message });
  });
  */
});

// Get one Student
router.get("/profile/:id", (req, res) => {
  var id = req.params.id;
  Student.findById(id)
    .then(student => res.render("profile", { message: null, student: student }))
    .catch(error => console.log(err));
  //res.json({ id: id, profile: data.getStudentById(id) });

  //res.render("profile", { message: null, student: data.getStudentById(id) });
});

router.post("/profile/:id", (req, res) => {
  var id = req.params.id;
  var obj = req.body;
  var message = "";

  Student.findByIdAndUpdate(id, obj)
    .then(obj => res.render("profile", { message: "Student succesfully modified", student: req.body }))
    .catch(err => res.redirect("/profile/" + id));
  /*data.getStudentByIdAndUpdate(id, obj, (err, student) => {
    if (err) {
      message = err;
    } else {
      message = "Student successfully modified";
      console.log(student);
    }
    res.redirect("/");
  });*/
});

router.delete("/profile/:id", (req, res) => {
  var id = req.params.id;
  Student.remove({ _id: id })
    .then(msg => res.json(message))
    .catch(err => console.log(err));

  /*data.deleteStudent(id, message => {
    res.json(message);
  });*/
});

module.exports = router;
