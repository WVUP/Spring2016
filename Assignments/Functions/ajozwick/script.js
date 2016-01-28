// Assignment One: Functions

// ********* Object Literals **********

var artProject = {
	artist: 'Alisha',
	title: 'Fall Sleeps',
	medium: ['oil', 'ink', 'watercolor'],
	"boldest medium": 'oil'
};

// Print using dot notation.
console.log(artProject.artist);


// Print using bracket notation.
var favMediums = 'medium';
console.log(artProject[favMediums]);


// ********** Object Orientation ***********

// cloning this below
var course = {
	title:null,
	crn:null,
	teacher:null,
	credits:null,
	description:null
};

// new array
var courses = []

/* 
 Object constructor -- this. allows you to create objects under the one object type being Course
 also the prototype
*/
function Course (title, crn, teacher, credits, description) {
	this.ctitle = title;
	this.crn = crn;
	this.teacher = teacher;
	this.totalcredits = credits;
	this.desc = description;
	this.init();
}

// Setting up a function to add the new objects like the above prototype to the new array (also above). The new instances can be displayed in the HTML.
Course.prototype = {
	init: function () {
		courses.push(this);
	},
	display: function (){
		var subtitle = document.getElementById('object-orientation');
		subtitle.innerHTML = this.ctitle;
	}
}

// These are the new objects created because we used the object constructor above.
var bowlingClass = new Course ('Bowling', 33454, 'The Dude', 6, 'Learn the basics of bowling. The student with the highest score will win a colorful rug that ties the room together.');

var healthClass = bowlingClass;
healthClass.totalcredits = 3;

var historyClass = new Course ('US History', 44999, 'Eleanor Roosevelt', 3, 'Learn the history and the mystery on the New Deal.');


// ********** Closure Fixture **********
// this privatizes it
(function (w) {

var my_number = []; // not seen at all
var new_student = []; // will give the user's ID when exposed on window globally.
function studentEnroll () {
	alert(my_number);
}

// Privatizes the information, sets up the function for creating an ID for a new student, uses a callback.
w.student = {
	make: studentEnroll,
	create: function (id, callback) {
		new_student = id;
		alert('New student identification number: ' + id);
		if (callback) callback();
	},
	last: function () {
		alert("New student enrolled with the ID of " + new_student)
	}

};
})(window);


//******* Simple Function: *********
/*
This takes two arguments and performs an operation. 
Function that allows you to use more than the two allowed arguments.
*/


// PRACTICE/WARM UP
function sum (num1, num2) {
 	return num1 + num2;
	
 }
mySum = sum(4,8);
console.log('This is a practice example.' + ' ' + mySum);

// Another Way for adding your own numbers in the console.
function sum (num1,num2) {
	return num1 + num2;
}

/*
In the console
 	>sum(2,3)
 	<5
*/

//PRACTICE

// This functions allows you to log in whatever number of properties.
function list () {
	return Array.prototype.slice.call(arguments);
}

var list1 = list ("This is a practice example.", 2, "crazy cat", "Captain Planet");
console.log(list1);

// Practice
function adv_sum () {
	console.log(arguments);
}


//HOMEWORK
// Taking a "slice" of your arguments and doing something with it.
debugger;
var user = prompt("What is your favorite food?");
if (isNaN(user)===true) {
alert("You can now run this function");

function my_string () {
	var args = Array.prototype.slice.call(arguments);

	// The for loop will start at the 0 position and end at the length of the arguments. The _string will be the sum of arguments. Then, that sum will be printed out.
	var _string = 0;
	for (var i =0; i < args.length; i++) {
		_string += args[i];
	}
	console.log(_string);

}

}

else {
	alert("Enter names of food not numbers. The function will now NOT run. Sorry, please try again!");
}



