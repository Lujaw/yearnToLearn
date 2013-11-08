/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', {
    'title': "ToDo App",
    'todos': [
      {
        description: "Create a new Todo App",
        due: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // 1 day from now
      done: "Not Yet!"
      },
      {
        description: "Create a MEAN app",
        due: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // 1 day from now
      done: "Not Yet!"
  },
   ]
  });
};