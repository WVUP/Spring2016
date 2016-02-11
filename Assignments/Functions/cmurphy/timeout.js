var elem = document.querySelector ('.jumbotron');

var l = 1;
var t = setInterval (fucntion (){
	l__;
	elem.innerHTML=1}, 500)
}
clearInterval(t)

var t = setInterval(function(){
	l++;
	if(l==80)
		clearInterval(t);
	elem.innerHTML = l
	}, 500)
00