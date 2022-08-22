
const SUBMIT_BUTTON = document.getElementById('send-form');


SUBMIT_BUTTON.addEventListener('click', (e)=> {
   e.preventDefault();
   let user_input = document.getElementById('user').value.length > 0;
   let password_input = document.getElementById('password').value.length > 0;
   if(!user_input){
   document.getElementById('pUser').classList.remove('visually-hidden');
   }else {
    document.getElementById('pUser').classList.add('visually-hidden')
   }

   if(!password_input){
    document.getElementById('pPass').classList.remove('visually-hidden');
    }else {
     document.getElementById('pPass').classList.add('visually-hidden')
    }

    if(user_input && password_input){
        window.location.href = 'index2.html';
    }
})


