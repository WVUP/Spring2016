// Object Literals
var person = {
	age: 20,
	"name": "bob",
	job: "Jack in the Box"
	
}

var schedules = []

function Schedule (crn, teacher, credithrs, clsname){
	this.CRN = crn;
	this.teacher = teacher;
	this.creditHours = credithrs;
	this.clsName = clsname;
	this.init();
}

Schedule.prototype = {
	init: function () {
		schedules.push(this);
	}
}

function Student (username, pwd, callback) {
	this.username = username;
	this.password = pwd;
	this.userSched = []
	this.init()

}

Student.prototype = {
	init: function () {
		students.push(this);
	}
}

function addMe (arg1, arg2) {
	alert(arg1 + arg2);
}

function addAnything () {
	var args = Array.prototype.slice.call(arguments);
	var sum = 0;
	for (var i = 0; i < args.length; i++) {
		sum += args[i]
	}
	alert(sum)
}

var closure = (function () {

	students = [
	{
		username: "josh",
		password: "hotdogs1",
		userSched: []
	},
	{
		username: "Dbaker",
		password: "dbzrulez1994",
		userSched: []
	}]

	option = {

		createStudent: function (callback) {
			var id = document.logIn.userName.value;
			var password = document.logIn.passWord.value;
			for (var i = 0; i < students.length; i++) {
				if (id == students[i].username) {
					alert("Sorry, that username is taken!")
					break;
				}
				else if (i == students.length - 1) {
					var newStudent = new Student(id, password);
					if (callback) {
						callback()
					}
					break;
				}
			}
		},
		displayStudents: function () {
			var sumUser = '';
			var sumPass = '';
			for (var i = 0; i < students.length; i++) {
				sumUser += students[i].username + "\n";
				sumPass += students[i].password + "\n";
				$("#render").html(sumUser);
				$("#renderPass").html(sumPass);
				$("#name").html('Name');
				$("#pass").html("Password");
				$("#bar").html("________________________________");
				
			}
			
		},
		removeStudent: function (callback) {
			var un = document.remove.usn.value;
			var p = document.remove.pw.value;
			for (var i = 0; i < students.length; i++) {
				if (un == students[i].username && p == students[i].password) {
					students.splice(i, 1);
					alert("You removed a user!")
					break;
				}
				else if (i == students.length - 1) {
					callback()
				}
			}
		}

	};

})();

$(document).on('ready', function () {

	$("#create").on('click', function () {
		option.createStudent(function () {
			alert("A student was created!");
		});

	})

	$("#remove").on('click', function () {
		option.removeStudent( function () {
			alert("Sorry, couldnt find that user");
		})

	})

	$("#display").on('click', function () {
		option.displayStudents()

	})

})