// alert for IE users
//if (document.all) alert("The IxDA Beta only works with Firefox and Safari. The full version will support Internet Explorer.");




function doLogin() {
	
	var thename = document.theform.name.value;
	var theemail = document.theform.email.value;
	
	if (thename.length<3 || theemail.indexOf("@") < 0) {
	
		if (thename.length<3 && theemail.indexOf("@"))
		msg = "Please enter your information and try again."
	
		else if (thename.length<3) msg = "Please enter your name.";
		else if (theemail.indexOf("@")<0) msg = "Please enter your e-mail address.";
		
		
		
		
		document.getElementById("error").innerHTML = msg + "<p>";
	}
	
	else {
		var loc = location.href;
		loc = loc.split("#");
		loc = loc[0];
	
		document.theform.action = loc + "#response";
		
		setTimeout("document.theform.submit()",50);
	}
}


function mark() {
	// this is a cosmetic function
	// it does nothing, but looks better
	// than using javascript:void()
}



var doCheck = true;
function checkForEmail(elm) {

	if (document.theform[elm].value.indexOf("@")>0 && document.theform[elm].value.indexOf(".")>0) {
		var loc = location.href;
		loc = loc.split("#");
		loc = loc[0];
	
		document.theform.action = loc;// + "#response";
		doCheck = false;
	}
	else {
		document.theform.action = "javascript:doLogin()";
		doCheck = true;
	}
	if (doCheck) {
		setTimeout("checkForEmail('"+elm+"')",100);	
	}
	
}

function stopCheck() {
	doCheck = false;
}






function tagThread() {
	var gettag = prompt("Add tags for this thread","");
	
	if (gettag!=null && gettag!="") {
		if (gettag.indexOf(", ") > -1) {
			tags = gettag.split(", ");
			nospace=true;
		}
		else if (gettag.indexOf(",") > -1) {
			tags = gettag.split(",");
			nospace=true;
		}
		else {
			nospace = false;
			tags = gettag.split(" ");
		}
		
		existing = document.getElementById("taglist");
				
		addition = "";
		
		for (i=0; i<tags.length; i++) {
			if (nospace==true) {
				newtag = "";
				tag = tags[i].split(" ");
				for (n=0; n<tag.length; n++) {	
					newtag += tag[n];	
				}
				tags[i] = newtag;
			}
			tagArray.push(tags[i]);
		}
		
		for (i=0; i<tagArray.length; i++) {	
			addition += "<a href='search.php?tags="+tagArray[i].toLowerCase()+"'>" + tagArray[i].toLowerCase() + "<\/a>, ";	
		}	
		existing.innerHTML = addition;
		updateDatabase();
	}
}


function updateDatabase() {
addition = "";
for (i=0; i<tagArray.length; i++) {	
	addition += tagArray[i].toLowerCase();
	if (i<tagArray.length-1) addition += ",";	
}
//alert(addition);
updateServer(postid,addition)
}






doshow = true;
function showRSS() {
if (doshow) {
	j = document.getElementById("jobs");
	j.style.display = "block";
	
	p = document.getElementById("popular");
	p.style.display = "block";
	
	t = document.getElementById("topics");
	t.style.display = "block";
	
	f = document.getElementById("full");
	f.style.display = "block";
	doshow = false;
}
else {
	j = document.getElementById("jobs");
	j.style.display = "none";
	
	p = document.getElementById("popular");
	p.style.display = "none";
	
	t = document.getElementById("topics");
	t.style.display = "none";
	
	f = document.getElementById("full");
	f.style.display = "none";
	doshow = true;
}
	
	

}


var themark = "";

function addFavorite(post,parent,email,title) {
	id = "comment" + post;
	div = document.getElementById(id);
	
	if (div.className!="favorite") {
		div.className="favorite";
		document.getElementById("fvc"+post).innerHTML=" (1)";
	}
	
	
	else {
		curcnt = document.getElementById("fvc"+post).innerHTML;
		if (curcnt==" (1)") {
			// nothing... you just hit the button again
		}
		else {
			curcnt*=1;
			curcnt++;
			if (themark!=post)
			document.getElementById("fvc"+post).innerHTML = curcnt;
		}	
		flashfav(div);
	}
	
	themark = post;
	
	attr = "&parent="+parent+"&email="+email;
	updateServer("favorite",post,attr);

}


function setCategory(select) {
	var post = document.ixda.post.value;
	var cat = document.ixda.elements[select];
	var cgory = cat.options[cat.selectedIndex].value;

	if (cat.selectedIndex != 0) {

		attr = "&category="+cgory;
		updateServer("category",post,attr);

		
		cgory = cgory.toLowerCase();
	
		if (document.images)
		document.images.catimg.src = "img/pic_" + cgory + ".jpg";



	}

}







function flashfav(div) {
	
	div.className = "flash";
	setTimeout("div.className = 'favorite'",100);

}


function beginSearch(val) {
	if (val == "Search Archives") {
		document.searchform.tag.value = "";	
		document.getElementById("search").style.color = "#333";
	}
}

function endSearch(val) {
	if (val == "" || val== " ") {
		document.searchform.tag.value = "Search Archives";
		document.getElementById("search").style.color = "#666";	
	}
}

function beginPeopleSearch(val) {
	if (val == "Search Members") {
		document.searchform.tag.value = "";	
		document.getElementById("search").style.color = "#333";
	}
}

function endPeopleSearch(val) {
	if (val == "" || val== " ") {
		document.searchform.tag.value = "Search Members";
		document.getElementById("search").style.color = "#666";	
	}
}




function emailThread() {
	cancel();
	document.getElementById("emailThread").style.display = "block";
	document.emailThreadForm.recipient.focus();	
	
}


function addTag() {
	cancel();
	document.getElementById("addtag").style.display = "block";
	document.tagForm.tag.focus();	
}


function emailComment(id) {
	cancel();
	div = document.getElementById(id)
	div.style.display = "block";
	box = div.getElementsByTagName("input");
	box[0].focus();
	
}

function cancel() {
	divs = document.getElementsByTagName("div");
	for (i=0; i<divs.length; i++) {
		if (divs[i].className == "drawer") divs[i].style.display="none";
	}
}







doshow = true;
function showRSS() {
if (doshow) {
	j = document.getElementById("jobs");
	j.style.display = "block";
	
	p = document.getElementById("popular");
	p.style.display = "block";
	
	t = document.getElementById("topics");
	t.style.display = "block";
	
	f = document.getElementById("full");
	f.style.display = "block";
	doshow = false;
}
else {
	j = document.getElementById("jobs");
	j.style.display = "none";
	
	p = document.getElementById("popular");
	p.style.display = "none";
	
	t = document.getElementById("topics");
	t.style.display = "none";
	
	f = document.getElementById("full");
	f.style.display = "none";
	doshow = true;
}

}