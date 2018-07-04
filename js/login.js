function ValidateLogin(){
	var form = document.forms.login_form;
	var email = form.email.value;
	var password = form.password.value;
	var flag = true;

	if(email == ""){
		document.getElementById("lg_email_err").innerHTML = "Email is required";
		flag = false;
	}else{
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(email) == false) {
            document.getElementById("lg_email_err").innerHTML = 'Invalid Email Address';
            flag = false;
        }
	}
	

    if(password == ""){
    	document.getElementById("lg_password_err").innerHTML = "Password required.";
    	flag = false;
    }

    return flag;

}


document.getElementById('lg_btn').addEventListener("click", function(){
			
	var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var response = xmlhttp.responseText;
	        console.log(response);
	       
	    }
	}

	var form = document.forms.login_form;
	var email = form.email.value;
	var password = form.password.value;

	var fd = new FormData();
	fd.append('email', email);
	fd.append('password', password);

	if(ValidateLogin()){
    	xmlhttp.open("POST", './api/login.php', true);
    	xmlhttp.send(fd);
    }        

    
});

