//Simple function portion
var num1 = 2;
var num2 = 1;
var num3 = 1;

function sum (num1, num2, num3) {
	return num1 + num2 + num3;
	debugger;
}
//below lies the attempts of making two functions, one which attempts to add a student account, and another to create a repository for the individual classes for the created 'student'
function new_Student (username, password) {
	this.username = username;
	this.password = password;
	this.init();
}

new_Student.prototype = {
	init: function () {
		init: function () {
			new_student.push(this)
		}
	}
}

function add_class (courseNumber, Teacher, Credits, Day, Capacity, Room) {

	this.courseNumber = crn;
	this.Teacher = teacher;
	this.Credits = credits;
	this.Day = day;
	this.Capacity = capacity;
	this.Room = room;
	this.Full = this.courseNumber + '' + this.Teacher + '' + this.Credits + '' + this.Day + '' + this.Capacity + '' + this.Room;
	this.init();

}

AddClass.prototype = {
	init: function() {
		add_class.push(this);
	},
}

//Closure and callback
function (cNS) {

var newstudent = [];

cNS.student = {
	make: newStudent,
	create: function (nS, callback) {
		newStudent = nS;
		alert('Your student number is: ' + nS);
		if (callback)
			callback();
	},
};
}(window);