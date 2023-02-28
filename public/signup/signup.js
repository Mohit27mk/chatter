const signupForm=document.querySelector('#signup-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phonenoInput = document.querySelector('#phoneno');
const passwordInput = document.querySelector('#password');

signupForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  const name=e.target.name.value;
  const email=e.target.email.value;
  const phoneno=e.target.phoneno.value;
  const password=e.target.password.value;

    const myobj={
      name,email,phoneno,password
    }
    
    axios.post("http://localhost:3000/user/signup",myobj)
    .then((res)=>{
      
      if(res.data.Email==='exist'){
        alert("Email already exist");
      }
      if(res.data.Phoneno==='exist'){
        alert("Phoneno already exist");
      }
      if(res.data.success==true){
        alert("Signup successfully");
      }
        window.location.href='./login.html';
      
    }).catch((err)=>{
     console.log(err);
    })
   nameInput.value='';
   emailInput.value='';
   phonenoInput.value='';
   passwordInput.value=''; 
   
}
