var controller = {
  model: {},
  view: {},
  getModel: function(model) {
    this.model[model.name] = model;
  },
  getView: function(view) {
    this.view[view.name] = view;
  },
  displayStudents: function() {
    // v;ar arr = this.model.eliumStudents.getAll();
    // // arr.forEach(function(element) {
    // //   console.log(element.name);
    // //   console.log(element.age);
    // //   console.log(element.sex);
    // //   console.log(element.country);
    // // });

    // this.view.studentViewer.displayStudents(arr)
    this.model.eliumStudents.getAll(students => {
      this.view.studentViewer.displayStudents(students);
    });
  },
  addStudent: function(name, age, sex, country) {
    var studentObj = {
      name: name,
      age: age,
      sex: sex,
      country: country
    };

    this.model.eliumStudents.addNewStudent(studentObj, err => {
      if (err) {
        alert(err);
      } else {
        console.log(this);
        this.displayStudents();
      }
    });
  }
};
