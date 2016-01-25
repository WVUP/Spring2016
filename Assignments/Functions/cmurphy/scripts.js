//box1

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

function show()
{
	var content="<b style='font-size:18px;'>Your List:</b><br/><ul>";
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

//box6
var counter = 0;

function hackmani ()
{
	counter++;
	if (lines[counter])
		document.getElementById('content6').innerHTML += lines[counter] + '<br/>';
}