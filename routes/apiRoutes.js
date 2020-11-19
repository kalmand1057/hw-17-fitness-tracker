var db = require("../models");

module.exports = function(app) {
// Continue Workout
 app.get("/api/workouts", (req, res) => {
    db.Workout.find({}, (err, found) => {
      if (err) {
        console.log(err);
      } else {
        res.json(found);
      }
    });
  });

  
// Create New Workout
  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
    .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
  });
  
  
  app.put("/api/workouts/:id", ({body, params}, res) => {
    const workoutId = params.id;
    let savedExercises = [];
    
    db.Workout.find({_id: workoutId})
    .then(dbWorkout => {
        savedExercises = dbWorkout[0].exercises;
        res.json(dbWorkout[0].exercises);
  
        const allExercises = [...savedExercises, body]
        updateWorkout(allExercises);
    })
    .catch(err => {
        res.json(err);
    });
  
    function updateWorkout(exercises) {
        db.Workout
        .findOneAndUpdate(workoutId, {exercises: exercises}, function(err, data) {
            if(err) {
                console.log(err);
            }
        })
    };
  });
  
  //dashboard
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}, (err, found) => {
      if (err) {
        console.log(err);
      } else {
        res.json(found);
      }
    });
  });
   
};


