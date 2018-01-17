
$(document).ready(function(){
    $("#createUser").on('click',function(){
        var email = $("#email").val();
        var password = $("#password").val();
        var createUser = new XMLHttpRequest();
        createUser.onload = function(){
            if(createUser.readyState = XMLHttpRequest.DONE){
                if(createUser.status === 200){
                    $('body').html('<h1>'+createUser.responseText+'</h1>');
                }else{
                    $('body').prepend(createUser.responseText+'<br>');
                }
            }
        }
        createUser.open('POST', 'http://localhost:6969/create-user', true);
        createUser.setRequestHeader('Content-Type', 'application/json');
        createUser.send(JSON.stringify({email:email,password:password}));
    });
});