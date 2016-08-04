var friendData = require('../data/friends.js');


module.exports = function (app) {

	app.get('/api/friends', function(req, res){
		res.json(friendData);
	})

	app.post('/api/friends', function(req, res){
		var foundFriend = req.body;

		for(var i = 0; i < foundFriend.scores.length; i++) {
			if(foundFriend.scores[i] == "1 (Strongly Disagree)") {
				foundFriend.scores[i] = 1;
			} else if(foundFriend.scores[i] == "5 (Strongly Agree)") {
				foundFriend.scores[i] = 5;
			} else {
				foundFriend.scores[i] = parseInt(foundFriend.scores[i]);
			}
		}

		var differencesArray = [];

		for(var i = 0; i < friendData.length; i++) {

			var possibleFriend = friendData[i];
			var totalDiff = 0;
			
			for(var x = 0; x < possibleFriend.scores.length; x++) {
				var diffScore = Math.abs(possibleFriend.scores[x] - foundFriend.scores[x]);
				totalDiff += diffScore;
			}

			differencesArray[i] = totalDiff;
		}

		var foundFriendNumber = differencesArray[0];
		var foundFriendIndex = 0;

		for(var i = 1; i < differencesArray.length; i++) {
			if(differencesArray[i] < foundFriendNumber) {
				foundFriendNumber = differencesArray[i];
				foundFriendIndex = i;
			}
		}

		friendData.push(foundFriend);

		res.json(friendData[foundFriendIndex]);
	})
}