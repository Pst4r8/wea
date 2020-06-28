var captcha= new Array ();
function validateRecaptcha(){
    var recaptcha= document.getElementById("recaptcha").value;;
    var validRecaptcha=0;
    for(var z=0; z<6; z++){
        if(recaptcha.charAt(z)!= captcha[z]){
            validRecaptcha++;
        }
    }
    if (recaptcha == ""){
        document.getElementById('errCaptcha').innerHTML = 'Re-Captcha must be filled';
    } else if (validRecaptcha>0 || recaptcha.length>6){
        document.getElementById('errCaptcha').innerHTML = 'Sorry, Wrong Re-Captcha';
    } else{
        document.getElementById('errCaptcha').innerHTML = 'OK';
    }
}
function createCaptcha(){
    for(q=0; q<6 ; q++){
        if(q %2 ==0){
            captcha[q] = String.fromCharCode(Math.floor((Math.random()*26)+65));
        }else{      
            captcha[q] = Math.floor((Math.random()*10)+0);
        }
    }
    thecaptcha=captcha.join("");
    document.getElementById('captcha').innerHTML=
     "<span class='refresh-captcha'><span class='captcha'> " + thecaptcha+ "</span>" + "&nbsp; <button type='button' name='button' class='btn btn-default btn-refresh' onclick='createCaptcha()'><i class='fa fa-refresh'></i></button></span>"; 
}
