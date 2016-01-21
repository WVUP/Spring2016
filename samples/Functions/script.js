
var method_a = function () {
	console.log('variable');
};

function method_b () {
	console.log('test');
}

var test = {
	firstName: 'Aaron',
	"fav color": 'blue',
	colors: ['blue', 'red', 'green'],
	hi: function () {
		alert('hello');
	},
	my_settings: {
		username: 'afreeland',
		img: 'yup.jpg'
	}
};

// Access with . notation
console.log(test.firstName);

// Access with bracket notation
var myKey = 'firstName';
console.log(test[myKey]);


/**
 * Add two numbers
 * @param  {number} num1 first number
 * @param  {number} num2 second number
 * @return {number}      The Sum
 */
function sum (num1, num2) {
	return num1 + num2;
}

/**
 * Takes any amount of arguments and sums them together
 * @example
 * 	adv_sum(1,3,5);
 * @return {number} Returns the total sum of args
 */
function adv_sum () {
	var args = Array.prototype.slice.call(arguments);
	var _sum = 0;
	for (var i = 0; i < args.length; i++) {
		_sum += args[i];
	}
	
	return _sum;
}

// Here is a Closure Example
(function (w) {

	var my_number = 2;
	var last_user = 0;

	function toastMaker () {
		alert(my_number);
	}

	w.toast = {
		make: toastMaker,
		create: function (slices, callback) {
			last_user = slices;
			alert('num slices: ' + slices);

			if(callback)
				callback();
		},
		last: function () {
			alert('last user had ' + last_user);
		}
	};

	//@example
	// w.toast.create('aaron', function(){
	//   alert('yo');
	// })

})(window);


var person = {
	firstName: null,
	lastName: null,
	age: null
};

function create_person (fname, lname, age) {
	var _newPerson = JSON.parse(JSON.stringify(person));
	_newPerson.firstName = fname;
	_newPerson.lastName = lname;
	_newPerson.age = age;
	console.log(_newPerson);
	console.log(person);
	return _newPerson;
}

function fullName (p) {
	console.log(p.firstName + ' ' + p.lastName);
}


var persons = [];
function Person (fname, lname, age) {
	var sample = 5;
	this.firstName = fname;
	this.lastName = lname,
	this.age = age;
	this.full_name = this.firstName + ' ' + this.lastName;
	this.email = null;

	this.init();
}

Person.prototype = {
	init: function () {
		persons.push(this);
	},
	display: function () {
		var _header = document.getElementById('myHeader');
		_header.innerHTML = this.full_name;
	},
	validate: function() {
		if(!this.email)
			return alert('...email dude...email');
	}
}