

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCMHKUYO8GtJCG-fC1L03XbaPeP17AU6EY",
	authDomain: "trainscheduler-13471.firebaseapp.com",
	databaseURL: "https://trainscheduler-13471.firebaseio.com",
	projectId: "trainscheduler-13471",
	storageBucket: "trainscheduler-13471.appspot.com",
	messagingSenderId: "494223302186"
};
firebase.initializeApp(config);

var database = firebase.database();

$('#add-train-btn').on('click', function (event) {
	event.preventDefault();

	var trainName = $("#train-name-input").val().trim();
	var trainDest = $("#dest-input").val().trim();
	var trainFirstTime = moment($("#first-train-time-input").val().trim(), "HH:mm").format("X");
	var trainFreq = $("#frequency-input").val().trim();

	var newTrain = {
		train: trainName
		, dest: trainDest
		, firstTime: trainFirstTime
		, freq: trainFreq
	};

	database.ref().push(newTrain);

	console.log(newTrain.train);
	console.log(newTrain.dest);
	console.log(newTrain.firstTime);
	console.log(newTrain.freq);

	alert('Train successfully added');

	$('#train-name-input').val('');
	$('#dest-input').val('');
	$('#first-train-time-input').val('');
	$('#frequency-input').val('');
});

database.ref().on('child_added', function (childSnapshot, prevChildkey) {
	console.log(childSnapshot.val());

// variables for firebase

var trainName = childSnapshot.val().train;
var trainDest = childSnapshot.val().dest;
var trainFirstTime = childSnapshot.val().firstTime;
var trainFreq = childSnapshot.val().freq;

//train info

console.log(trainName);
console.log(trainDest);
console.log(trainFirstTime);
console.log(trainFreq);


//Prettify train time 
// (subract 1 year to make sure current time is not less than train time)
var trainTimePretty = moment(trainFirstTime,'HH:mm');
console.log(trainTimePretty);
var currentTime = moment();
var diffTime = currentTime.diff(moment(trainTimePretty), "minutes");
var timeModulo = diffTime % trainFreq;
var trainMinAway = trainFreq - timeModulo;
console.log("minutes till train: " + trainMinAway);
var trainNext = currentTime.add(trainMinAway, "minutes");
var trainNextPretty = moment(trainNext).format("HH:mm");

//Add each train's data into the table
$('#train-table').append('<tr><td>' + trainName + '</td><td>' + trainDest + '</td><td>' + trainFreq + '</td><td>' + trainNextPretty + '</td><td>' + trainMinAway + '</td></tr>');






});