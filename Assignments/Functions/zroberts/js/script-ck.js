function loginError(e,t){errorString=e+" "+t;return errorString}function showUi(){if(studentArray.length>0&&classArray.length>0){document.getElementById("viewStudents").className=="btn hidden"&&(document.getElementById("viewStudents").className=document.getElementById("viewStudents").className.replace(/\bhidden\b/));document.getElementById("classRegister").className=="btn hidden"&&(document.getElementById("classRegister").className=document.getElementById("classRegister").className.replace(/\bhidden\b/));document.getElementById("classSchedule").className=="btn hidden"&&(document.getElementById("classSchedule").className=document.getElementById("classSchedule").className.replace(/\bhidden\b/))}}function classError(){console.clear();for(i=0;i<arguments.length;i++)arguments[i]!=""&&console.error(arguments[i]);debugger}function CreateClass(e,t,n,r,i,s,o,u,a,f){errorCount=0;crnAlert="",subAlert="",titlAlert="",crdAlert="",dayAlert="",tmeAlert="",instAlert="",rmAlert="",stsAlert="";this.crn=e,this.sub=t,this.crs=n,this.titl=r,this.crd=i,this.day=s,this.tme=o,this.inst=u,this.rm=a,this.sts=f;this.validate();if(errorCount!=0){classError(crnAlert,subAlert,titlAlert,crdAlert,dayAlert,tmeAlert,instAlert,rmAlert,stsAlert);return}this.init()}function listStudents(){var e="";for(f=0;f<studentArray.length;f++){var t=studentArray[f].st_fname,n=studentArray[f].st_lname,r=studentArray[f].st_address,i=studentArray[f].st_city,s=studentArray[f].st_state,o=studentArray[f].st_zip,u=studentArray[f].st_id;e+="<tr><td>"+t+" "+n+"</td><td>"+r+"</td><td>"+i+"</td><td>"+s+"</td><td>"+o+'</td><td><span class="delete" id="'+u+'">Delete</span></td></tr>'}var a=document.getElementById("studentDisplay");a.innerHTML=e;deleteBtn=document.getElementsByClassName("delete");for(var f=0;f<deleteBtn.length;f++)deleteBtn[f].addEventListener("click",function(e){return function(){alert("Clicked a Delete");var t=deleteBtn[e].id;for(var n=0;n<studentArray.length;n++)if(studentArray[n].st_id==t){studentArray.splice(n,1);break}listStudents()}}(f),!1)}var deleteBtn=[];document.getElementById("login").addEventListener("click",function(e){e=e||window.event;var t=document.getElementById("fname").value,n=document.getElementById("lname").value;if(t==""||n==""){var r="",i="";if(t==""){document.getElementById("fname").className!="error"&&(document.getElementById("fname").className+="error");r="First Name is Required"}if(n==""){document.getElementById("lname").className!="error"&&(document.getElementById("lname").className+="error");i="Last Name is Required"}console.error(loginError(r,i));debugger;return}var s={firstName:t,lastName:n},o=document.getElementById("fnamePrint"),u=document.getElementById("lnamePrint");o.innerHTML=s.firstName;u.innerHTML=s.lastName;document.getElementById("loginContainer").className+=" hidden";document.getElementById("main").className+=" visible"});document.getElementById("logout").addEventListener("click",function(e){e=e||window.event;document.getElementById("fname").value="";document.getElementById("lname").value="";document.getElementById("loginContainer").className=document.getElementById("loginContainer").className.replace(/\bhidden\b/,"");document.getElementById("main").className=document.getElementById("main").className.replace(/\bvisible\b/,"");document.getElementById("fname").className=="error"&&(document.getElementById("fname").className=document.getElementById("fname").className.replace(/\berror\b/,""));document.getElementById("lname").className=="error"&&(document.getElementById("lname").className=document.getElementById("lname").className.replace(/\berror\b/,""))});document.getElementById("addClass").addEventListener("click",function(e){e=e||window.event;document.getElementById("menu").className=="open"&&(document.getElementById("menu").className=document.getElementById("menu").className.replace(/\bopen\b/,""));document.getElementById("class").className+="open"});document.getElementById("addStudent").addEventListener("click",function(e){e=e||window.event;document.getElementById("menu").className=="open"&&(document.getElementById("menu").className=document.getElementById("menu").className.replace(/\bopen\b/,""));document.getElementById("student").className+="open"});document.getElementById("viewStudents").addEventListener("click",function(e){e=e||window.event;document.getElementById("menu").className=="open"&&(document.getElementById("menu").className=document.getElementById("menu").className.replace(/\bopen\b/,""));listStudents();document.getElementById("listStudents").className+="open"});var backButton=document.getElementsByClassName("backBtn");for(var i=0;i<backButton.length;i++)backButton[i].addEventListener("click",function(e){return function(){var t=[document.getElementById("class"),document.getElementById("student"),document.getElementById("listStudents"),document.getElementById("register"),document.getElementById("schedule")];for(var n=0;n<t.length;n++)if(t[e].className=="open"){t[e].className=t[e].className.replace(/\bopen\b/,"");break}document.getElementById("menu").className+="open"}}(i),!1);var classArray=[],studentArray=[];CreateClass.prototype={init:function(){classArray.push(this)},validate:function(){if(!this.crn){crnAlert="Course Number Needed \n";errorCount++}if(!this.sub){subAlert="Subject is Required \n";errorCount++}if(!this.crs){crsAlert="Course is required \n";errorCount++}if(!this.titl){titlAlert="Course Title is required \n";errorCount++}if(!this.crd){crdAlert="# of Credits is required \n";errorCount++}if(!this.day){dayAlert="Day's of the week required \n";errorCount++}if(!this.tme){tmeAlert="Time is required \n";errorCount++}if(!this.inst){instAlert="Instructor is required \n";errorCount++}if(!this.rm){rmAlert="Room # is required \n";errorCount++}if(!this.sts){stsAlert="Capacity is required \n";errorCount++}}};document.getElementById("submitClass").addEventListener("click",function(e){e=e||window.event;var t=document.getElementById("crn").value,n=document.getElementById("subject").value,r=document.getElementById("course").value,i=document.getElementById("title").value,s=document.getElementById("credits").value,o=document.getElementById("days").value,u=document.getElementById("time").value,a=document.getElementById("instructor").value,f=document.getElementById("room").value,l=document.getElementById("capacity").value;new CreateClass(t,n,r,i,s,o,u,a,f,l);showUi()});document.getElementById("submitStudent").addEventListener("click",function(e){e=e||window.event;(function(e){var t=document.getElementById("s_fname").value,n=document.getElementById("s_lname").value,r=document.getElementById("s_address").value,i=document.getElementById("s_city").value,s=document.getElementById("s_state").value,o=document.getElementById("s_zip").value;e.student={studentValidate:function(){var e="",u="";t==""&&(e+="Please add First Name \n");n==""&&(e+="Please add Last Name \n");r==""&&(e+="Please add Address \n");i==""&&(e+="Please add City \n");s==""&&(e+="Please add State \n");o==""&&(e+="Please add Zip \n");if(studentArray.length>0&&e=="")for(var a=0;a<studentArray.length;a++)if(studentArray[a].st_fname==t&&studentArray[a].st_lname==n&&studentArray[a].st_address==r&&studentArray[a].st_city==i&&studentArray[a].st_state==s&&studentArray[a].st_zip==o){e="Student entered is a duplicate";break}studentArray.length==0?u=1:u=studentArray[studentArray.length-1].st_id+1;if(e!=""){console.error(e);debugger;return}this.st_id=u,this.st_fname=t,this.st_lname=n,this.st_address=r,this.st_city=i,this.st_state=s,this.st_zip=o;studentArray.push(this);document.getElementById("s_fname").value="";document.getElementById("s_lname").value="";document.getElementById("s_address").value="";document.getElementById("s_city").value="";document.getElementById("s_state").value="";document.getElementById("s_zip").value=""}}})(window);student.studentValidate();showUi()});