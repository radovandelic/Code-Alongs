var eliumStudents = {
  name: "eliumStudents",
  students: {
    0: {
      id: 0,
      name: "Sanni",
      age: 31,
      sex: "female",
      country: "Liberia"
    }
  },
  currentId: 0,
  getAll: function(cb) {
    var studentsArray = [];
    for (var id in this.students) {
      studentsArray.push(this.students[id]);
    }
    cb(studentsArray);
  },
  addNewStudent(studentObj, callback) {
    var errorMessage = null;
    if (
      typeof studentObj.name === "string" &&
      !isNaN(studentObj.age) &&
      typeof studentObj.sex === "string" &&
      typeof studentObj.country === "string"
    ) {
      if (studentObj.name && Number(studentObj.age)) {
        this.currentId++;
        this.students[this.currentId] = studentObj;
        this.students[this.currentId].id = this.currentId;
      } else {
        errorMessage = "Please enter age and name";
      }
    } else {
      errorMessage = "Invalid entries";
    }
    callback(errorMessage);
  }
};
