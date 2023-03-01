const users=document.querySelector("#users");
const messageInput=document.getElementById('message');

const myForm=document.querySelector('#myform');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();
    const token=localStorage.getItem('token');

    const message=e.target.message.value;
    // console.log(message);
  
    const chats = document.querySelector('#chats');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(message));
    chats.appendChild(li);
    
    const myobj={
        message
    };

    axios.post("http://localhost:3000/message/add-message",myobj,{ headers: {"Authorization":token} })
    .then((res)=>{
        // console.log(res);
        
    }).catch((err)=>{
     console.log(err);
    })
    
    messageInput.value='';
}

window.addEventListener('DOMContentLoaded',async()=>{
    try{
        const token=localStorage.getItem('token');
        const userList = document.querySelector('#users');
        const res=await axios.get("http://localhost:3000/user/get-users",{ headers: {"Authorization":token} });
    // console.log(res.data.users[0].name);
    for(let i=0;i<res.data.users.length;i++){
        showUsers(res.data.users[i]);
    }    
}catch(err){
        console.log(err);
    }
})

function showUsers(obj){
    const userList = document.querySelector('#users');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${obj.name} joined`));
    userList.appendChild(li);
}

