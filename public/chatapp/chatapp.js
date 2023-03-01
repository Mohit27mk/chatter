

const users=document.querySelector("#users");
const messageInput=document.getElementById('message');
const messageArray=[];
const myForm=document.querySelector('#myform');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();

    const message=e.target.message.value;
    const token=localStorage.getItem('token');
    
    // console.log(message);
  
    const chats = document.querySelector('#chats');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`You:${message}`));
    chats.appendChild(li);
    
    const myobj={
        message
    };

    axios.post("http://localhost:3000/message/add-message",myobj,{ headers: {"Authorization":token} })
    .then((res)=>{
    //    console.log(res.data.data);
    
     
    

       

    }).catch((err)=>{
     console.log(err);
    })
    
    messageInput.value='';
}

window.addEventListener('DOMContentLoaded',async()=>{
    try{  
        const token=localStorage.getItem('token');
        const chats = document.querySelector('#chats');
        
        const res=await axios.get("http://localhost:3000/user/get-users",{ headers: {"Authorization":token} });
    // console.log(res.data.users[0].name);
    for(let i=0;i<res.data.users.length;i++){
        showUsers(res.data.users[i]);
    }    
    let localMsg = JSON.parse(localStorage.getItem("localMsg"))||[];
    let lastId;
    
    if (localMsg.length == 0) {
      
      lastId = 0;
    }
    if (localMsg.length > 0) {
      lastId = localMsg[localMsg.length - 1].id;
    }
   
       
    const response=await axios.get(`http://localhost:3000/message/get-messages?lastId=${lastId}`,{ headers: {"Authorization":token} });
     let  retrivedMsg =localMsg.concat(response.data.messages);
    //  console.log(retrivedMsg)
     if (retrivedMsg.length > 100) {
        for (let i = 0; i < retrivedMsg.length - 100; i++)
          retrivedMsg.shift();
      }
      localStorage.setItem("localMsg", JSON.stringify(retrivedMsg));
    //   console.log(retrivedMsg);
           for(let i=0;i<retrivedMsg.length;i++){
             showMessage(retrivedMsg[i]);
        }
}catch(err){
        console.log(err);
    }
})


    
       setInterval(async()=>{
        try{
            const chats = document.querySelector('#chats');
            const token=localStorage.getItem('token');
  
            

            let localMsg = JSON.parse(localStorage.getItem("localMsg"))||[];
            let lastId;
            
            if (localMsg.length == 0) {
              
              lastId = 0;
            }
            if (localMsg.length > 0) {
              lastId = localMsg[localMsg.length - 1].id;
            }
           
       
        const response=await axios.get(`http://localhost:3000/message/get-messages?lastId=${lastId}`,{ headers: {"Authorization":token} });
        let  retrivedMsg =localMsg.concat(response.data.messages);
    //  console.log(retrivedMsg)
    if(response.data.messages.length!=0) 
    {
        // console.log(response.data.messages);
    chats.innerHTML='';
        if (retrivedMsg.length > 100) {
        
        for (let i = 0; i < retrivedMsg.length - 100; i++)
          retrivedMsg.shift();
      }
      localStorage.setItem("localMsg", JSON.stringify(retrivedMsg));
    //   console.log(retrivedMsg);
           for(let i=0;i<retrivedMsg.length;i++){
             showMessage(retrivedMsg[i]);
        }}
    } 
    catch(err){
        console.log(err);
    }
       },1000) 
    



function showMessage(obj){
    const chats = document.querySelector('#chats');
    const li = document.createElement('li');
    const name=localStorage.getItem('name');
    if(name==obj.name){
        li.appendChild(document.createTextNode(`You: ${obj.message}`));
        chats.appendChild(li);
    }else{
        li.appendChild(document.createTextNode(`${obj.name}: ${obj.message}`));
        chats.appendChild(li);
    }
   
}

function showUsers(obj){
    const userList = document.querySelector('#users');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${obj.name} joined`));
    userList.appendChild(li);
}

