
//  Combining two known strings to give a complete error message for login 
function loginError(error1, error2){
	errorString = error1 + " " + error2;
	return errorString;
}

//Click the Login Button
document.getElementById('login').addEventListener('click', function(e){
	e = e || window.event;
	//alert('Login was Clicked');

	// Setting input elements to varilables
	var fname = document.getElementById('fname').value,
		lname = document.getElementById('lname').value;

	// Testing to see if inputs were left blank 
	if(fname == "" || lname == ""){
		//alert('')
		var fnameError = "";
		var lnameError = "";
		if(fname == ""){
			if(document.getElementById('fname').className != "error"){
				document.getElementById('fname').className += "error";
			}
			fnameError = "First Name is Required";
		}
		if(lname == ""){
			if(document.getElementById('lname').className != "error"){
				document.getElementById('lname').className += "error";
			}
			lnameError = "Last Name is Required";
		}
		console.error(loginError(fnameError, lnameError));
		debugger;
		return;		

	}

	// Setting object literal to input method
	var objectLiteral = {
		firstName : fname,
		lastName  : lname
	}

	// Retrieving and setting where Object literals will appear in gui
	var _fnameDestination = document.getElementById('fnamePrint'), 
		_lnameDestination = document.getElementById('lnamePrint');

	// Displaying Object Literal in dot notation
	_fnameDestination.innerHTML = objectLiteral.firstName;
	// Displaying Object Literal in Bracket Notation
	_lnameDestination.innerHTML = objectLiteral['lastName'];

	document.getElementById('loginContainer').className += " hidden";
	document.getElementById('main').className += " visible";

});

// Logout Button Selection
document.getElementById('logout').addEventListener('click', function(e){
	e = e || window.event;
	//alert('logout was clicked');

	//Clearing out Input fields after logout
	document.getElementById('fname').value = "";
	document.getElementById('lname').value = "";

	//Removing classes added after logging in (controls which container is displayed)
	document.getElementById('loginContainer').className = 
		document.getElementById('loginContainer').className.replace(/\bhidden\b/,'');
	document.getElementById('main').className = 
		document.getElementById('main').className.replace(/\bvisible\b/,'');

	//Removing Red border if error had occurred 
	if(document.getElementById('fname').className == "error"){
		document.getElementById('fname').className = 
		document.getElementById('fname').className.replace(/\berror\b/,'');
	}
	if(document.getElementById('lname').className == "error"){
		document.getElementById('lname').className = 
		document.getElementById('lname').className.replace(/\berror\b/,'');
	}
});

//Clicking through the options on the "menu" page.
document.getElementById('addClass').addEventListener('click', function(e){
	e = e || window.event;
	if(document.getElementById('menu').className == "open"){
		document.getElementById('menu').className = 
		document.getElementById('menu').className.replace(/\bopen\b/,'');
	}
	document.getElementById('class').className += 'open';
});	
document.getElementById('addStudent').addEventListener('click', function(e){
	e = e || window.event;
	if(document.getElementById('menu').className == "open"	){
		document.getElementById('menu').className = 
		document.getElementById('menu').className.replace(/\bopen\b/,'');
	}
	document.getElementById('student').className += 'open';
});	
document.getElementById('viewStudents').addEventListener('click', function(e){
	e = e || window.event;
	if(document.getElementById('menu').className == "open"	){
		document.getElementById('menu').className = 
		document.getElementById('menu').className.replace(/\bopen\b/,'');
	}
	document.getElementById('listStudents').className += 'open';
});	
document.getElementById('classRegister').addEventListener('click', function(e){
	e = e || window.event;
	if(document.getElementById('menu').className == "open"	){
		document.getElementById('menu').className = 
		document.getElementById('menu').className.replace(/\bopen\b/,'');
	}
	document.getElementById('register').className += 'open';
});
document.getElementById('classSchedule').addEventListener('click', function(e){
	e = e || window.event;
	if(document.getElementById('menu').className == "open"	){
		document.getElementById('menu').className = 
		document.getElementById('menu').className.replace(/\bopen\b/,'');
	}
	document.getElementById('schedule').className += 'open';
});


//Clicking the back Button
var backButton = document.getElementsByClassName('backBtn');

for (var i = 0; i < backButton.length; i++){
	backButton[i].addEventListener('click', (function(i){
		return function(){
			var divs = [document.getElementById('class'), document.getElementById('student'), document.getElementById('listStudents'), document.getElementById('register'), document.getElementById('schedule')];
			for(var a = 0; a < divs.length; a++){
				//alert('inside loop');
				if(divs[i].className == "open"){
					divs[i].className = divs[i].className.replace(/\bopen\b/,'');
					break;
				}
			}
			document.getElementById('menu').className += 'open';
		};
	})(i), false);
}


// Function that show's additional UI after at least one Class and one student has been created.
function showUi(){
	if(studentArray.length > 0 && classArray.length > 0){
		alert("You can now register for classes and etc..");
		if(document.getElementById('viewStudents').className == "btn hidden"){
			document.getElementById('viewStudents').className = 
			document.getElementById('viewStudents').className.replace(/\bhidden\b/);
		}
		if(document.getElementById('classRegister').className == "btn hidden"){
			document.getElementById('classRegister').className = 
			document.getElementById('classRegister').className.replace(/\bhidden\b/);
		}
		if(document.getElementById('classSchedule').className == "btn hidden"){
			document.getElementById('classSchedule').className = 
			document.getElementById('classSchedule').className.replace(/\bhidden\b/);
		}
	}
}


var classArray = [];
var studentArray = [];


function classError(){
	//alert("running error script");
	console.clear();
	for(i = 0; i < arguments.length; i++){
		if(arguments[i] != ""){
			console.error(arguments[i]);
		}
	}
	debugger;
}

// Creating a new class - creating function
function CreateClass (courseNumber, subject, course, title, credits, days, time, instructor, room, seats){
	errorCount = 0;
	crnAlert = "", subAlert = "", titlAlert = "", crdAlert = "", dayAlert = "", tmeAlert = "", instAlert = "", rmAlert = "", stsAlert = "";
	
	this.crn = courseNumber,
	this.sub = subject,
	this.crs = course, 
	this.titl = title, 
	this.crd = credits,
	this.day = days, 
	this.tme = time,
	this.inst = instructor, 
	this.rm = room,
	this.sts = seats;

	this.validate();
	if(errorCount == 0){
		//alert("going to push");
		this.init();
	}else{
		classError(crnAlert, subAlert, titlAlert, crdAlert, dayAlert, tmeAlert, instAlert, rmAlert, stsAlert);
		return;
	}
}
CreateClass.prototype = {
	init: function(){
		classArray.push(this);
	},
	validate: function(){
		if(!this.crn){
			crnAlert = 'Course Number Needed \n';
			errorCount++;
		}
		if(!this.sub){
			subAlert = 'Subject is Required \n';
			errorCount++;
		}
		if(!this.crs){
			crsAlert = "Course is required \n";
			errorCount++;
		}
		if(!this.titl){
			titlAlert = "Course Title is required \n";
			errorCount++;
		}
		if(!this.crd){
			crdAlert = "# of Credits is required \n";
			errorCount++;
		}
		if(!this.day){
			dayAlert = "Day's of the week required \n";
			errorCount++;
		}
		if(!this.tme){
			tmeAlert = "Time is required \n";
			errorCount++;
		}
		if(!this.inst){
			instAlert = "Instructor is required \n";
			errorCount++;
		}
		if(!this.rm){
			rmAlert = "Room # is required \n";
			errorCount++;
		}
		if(!this.sts){
			stsAlert = "Capacity is required \n";
			errorCount++;
		}
	}
}

//document.getElementById('submitClass').addEventListener('click', function(e){
//	e = e || window.event;

	//Pulling information from input fields
	var courseNum = document.getElementById('crn').value,
		subject = document.getElementById('subject').value,
		course = document.getElementById('course').value,
		title = document.getElementById('title').value,
		crdt = document.getElementById('credits').value,
		days = document.getElementById('days').value,
		time = document.getElementById('time').value,
		inst = document.getElementById('instructor').value,
		room = document.getElementById('room').value,
		capacity = document.getElementById('capacity').value;

	// Temp Variables for Development
	var crdt = "4", 
		courseNum = "1234", 
		course = "101", 
		days = "M W", 
		inst = "Edison", 
		room = "CS 124", 
		capacity = "27", 
		subject = "cs", 
		title = "Some Title", 
		time = "9:00am - 10:45am";

	// Error Validation

	//running class function

	new CreateClass(courseNum, subject, course, title, crdt, days, time, inst, room, capacity);


	showUi();

	//console.log(classArray);
	//console.log(classArray[0].titl)

//});


// Clicking on the 
	


	//document.getElementById('submitStudent').addEventListener('click', function(e){
	//	e = e || window.event;

		(function(s) {
			var s_fname = document.getElementById('s_fname').value,
				s_lname = document.getElementById('s_lname').value,
				s_address = document.getElementById('s_address').value,
				s_city = document.getElementById('s_city').value,
				s_state = document.getElementById('s_state').value,
				s_zip	= document.getElementById('s_zip').value;

			// DEVELOPMENT VARIABLES
			var s_fname = "Zak",
				s_lname = "Roberts",
				s_address = "133 Oakwood Ave",
				s_city = "Marietta",
				s_state = "OH",
				s_zip = "45750";

			s.student = {
				studentValidate: function(){
					var errorMsg = "";

					if(s_fname == ""){
						errorMsg += "Please add First Name \n";
					}
					if(s_lname == ""){
						errorMsg += "Please add Last Name \n";
					}
					if(s_address == ""){
						errorMsg += "Please add Address \n";
					}
					if(s_city== ""){
						errorMsg += "Please add City \n";
					}
					if(s_state == ""){
						errorMsg += "Please add State \n";
					}
					if(s_zip == ""){
						errorMsg += "Please add Zip \n";
					}

					if(studentArray.length > 0 && errorMsg == ""){
						for(var st = 0; st < studentArray.length; st++){
							// IF everything entered about student matches in the array
							if(studentArray[st].st_fname == s_fname && studentArray[st].st_lname == s_lname && studentArray[st].st_address == s_address && studentArray[st].st_city == s_city && studentArray[st].st_state == s_state && studentArray[st].st_zip == s_zip){

								errorMsg = "Student entered is a duplicate";
								break;

							}
						}
					}
					if(errorMsg != ""){
						console.error(errorMsg);
						debugger;
						return;

					}else{	
						this.st_fname = s_fname,
						this.st_lname = s_lname,
						this.st_address = s_address,
						this.st_city = s_city,
						this.st_state = s_state,
						this.st_zip = s_zip;

						studentArray.push(this);
						//alert('Succesfully Added Student');

						document.getElementById('s_fname').value = "";
						document.getElementById('s_lname').value = "";
						document.getElementById('s_address').value = "";
						document.getElementById('s_city').value = "";
						document.getElementById('s_state').value = "";
						document.getElementById('s_zip').value = "";
					}
				}
			}
			studentArray.push(this);
		})(window);
		student.studentValidate();
		showUi();
	//});