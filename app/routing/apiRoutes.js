var userData = require("../data/friends");


module.exports = function(app) {


  app.get("/api/friends", function(req, res) {
    res.json(userData);
  });

  var TotalScore = 0;

  var friendScores = [];

  app.post("/api/friends", function(req, res) {

    var currentScores = req.body.scores;

    console.log("Current Scores: " + currentScores);

    for (var i = 0; i < userData.length; i++) {

      var comparisonScores = userData[i].scores;

      TotalScore = compatibilityScore(currentScores, comparisonScores);

      friendScores.push(TotalScore);

    }

    console.log("Array of Friend Scores: " + friendScores);

    var index = 0;
    var value = friendScores[0];

    for (var i = 0; i < friendScores.length; i++) {
      console.log("Value of Item in Array: " + friendScores[i]);
      if (friendScores[i] < value) {
        value = friendScores[i];
        index = i;
      }
    }

    console.log("Game of Throne's friend name: " + userData[index].name);

    res.send(userData[index]);

    userData.push(req.body);

  });
};

var totalDifference = 0;

function compatibilityScore(currentScores, comparisonScores) {

  totalDifference = 0;

  for (var i = 0; i < currentScores.length; i++) {

    totalDifference+=Math.abs(currentScores[i] - comparisonScores[i]);
  }

  console.log("Final Total Difference: " + totalDifference);

  return totalDifference;
};