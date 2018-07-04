function ValidateFileUpload() {
    var fuData = document.forms.reg_form.pro_pic;
    var FileUploadPath = fuData.value;


		if (FileUploadPath == '') {
        document.getElementById("file_err").innerHTML = "Please upload an image";

    } else {
        var Extension = FileUploadPath.substring(
        FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        var size = fuData.files[0].size


		if (Extension == "gif" || Extension == "png" || Extension == "bmp"
	                    || Extension == "jpeg" || Extension == "jpg" ) {
			if(size >= 20000 && size <= 2000000 )
				return true;
			else
				document.getElementById("file_err").innerHTML = "Image size must be between 20 KB to 2MB";
		} else {
	        document.getElementById("file_err").innerHTML = "Photo only allows file types of GIF, PNG, JPG, JPEG and BMP. ";

	    }
	}
	return false;
}

           
 function ValidateForm(){
	var form = document.forms.reg_form;
	var name = form.name.value;
	var email = form.email.value;
	var password = form.pswrd.value;
	var flag = true;
	
	if(name == ""){
		document.getElementById("name_err").innerHTML = "Name is required.";
		flag = false;
	}
	if(email == ""){
		document.getElementById("email_err").innerHTML = "Email is required";
		flag = false;
	}else{
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(email) == false) {
            document.getElementById("email_err").innerHTML = 'Invalid Email Address';
            flag = false;
        }
	}
	

    if(password == ""){
    	document.getElementById("password_err").innerHTML = "Password required.";
    	flag = false;
    }

    if(!ValidateFileUpload()) flag = false;

    return flag;
} 

    

document.getElementById("reg_btn").addEventListener("click", function(){
    
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("temp").innerHTML =  xmlhttp.responseText;
        }
    }

    var fd = new FormData();


    var form = document.forms.reg_form;

    fd.append("name", form.name.value);
    fd.append("email", form.email.value);
    fd.append("profile_pic", form.pro_pic.files[0]);
    fd.append("password", form.pswrd.value);

    if(ValidateForm()){
    	xmlhttp.open("POST", './api/register.php', true);
    	xmlhttp.send(fd);
    }        

});
