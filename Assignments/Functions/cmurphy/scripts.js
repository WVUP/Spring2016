//box1
var students = [];
function Student (fName, lName)
{
	this.firstName = document.getElementById('fName').value;
	this.lastName = document.getElementById('lName').value;
	this.fullName = this.firstName + ' ' + this.lastName;

	this.createStudent();
}

Student.prototype =
{
	createStudent: function ()
	{
		for (var i = 0; i < students.length; i++) 
		{
			if (fName == students[i].fName && lName == students[i].lName)
				document.getElementById('content1').innerHTML = 'Student already exists';
		}
		students.push(this);
		document.getElementById('content1').innerHTML = 'Student created';
	},
	removeStudent: function (callback)
	{
		if (callback)
			callback();
	},
	displayStudents: function ()
	{
		var listStudents = document.getElementById('content1');
		var sContent ='<ul>';
		for (var i = 0; i < students.length; i++) {
			sContent += '<li>' + students[i] + '</li>';
		};
		listStudents.innerHTML = sContent;
	}
}


//box2

//box3
function sunSign()
{
	// displays astrological info for target date
	var day = document.getElementById('day').value;
	var month = document.getElementById('month').value;
	var sMonth = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var sign = ['&#9809;', '&#9810;', '&#9811;', '&#9800;', '&#9801;', '&#9802;', '&#9803;', '&#9804;', '&#9805;', '&#9806;', '&#9807;', '&#9808;', '&#9809;'];
	var sSign = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
	var sFirstDay = ['', 20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22, 20];
	var mySign = (day < sFirstDay[month]) ? sign[month - 1] : sign[month];
	var mySSign = (day < sFirstDay[month]) ? sSign[month - 1] : sSign[month];
	document.getElementById('content3').innerHTML = day + ' ' + sMonth[month] + '  :  ' + mySSign + ' : ' + mySign;
}

//box4
var list = new Array();

function insert ()
{
	var listValue = document.getElementById('listItem').value;
	list[list.length] = listValue;
	show();
}

function show ()
{
	var content="<ul>";
	for (var i = 0; i < list.length; i++) {
		content += '<li>' + list[i] + '</li>';
	}
	content += "</ul>Total Items: " + i;
	document.getElementById('content4').innerHTML = content;
}

//box5
function pi (num1, num2)
{
	var pi = num1 / num2;
	var piString = '<br/>Pi &#8776; 22 / 7 = ';
	document.getElementById('content5').innerHTML = piString + pi;
}

function fIntro ()
{
	document.getElementById('content5').innerHTML = '<br/>In console, call the factor function with:  <br/><em>factor(x, y)</em>';
}

function factor (y, x) 
{
	var mod = x % y;
	if (!mod)
	{
		result = y +' is a factor of '+ x;
		console.log(result);
	}	
	if (mod)
	{
		result = y +' is a not factor of '+ x;
		console.log(result);
	}
}

//box6
var me = 
{
	firstName: 'Casey',
	"first name": 'Casey',
	lastName: 'Murphy',
	"last name": 'Murphy',
	age: 34
}

var counter = 0;

function hackmaniNext ()
{
	if (document.getElementById('content6').innerHTML)
		document.getElementById('content6').innerHTML = '';

	if (lines[counter])
		document.getElementById('content6').innerHTML += lines[counter] + '<br/>';
	counter++;
}

function hackmaniAll ()
{
	if (document.getElementById('content6').innerHTML)
		document.getElementById('content6').innerHTML = '';

	for (var i = 0; i < lines.length; i++) {
		document.getElementById('content6').innerHTML += lines[i] + '<br/>';
	};
}