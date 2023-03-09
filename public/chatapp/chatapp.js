// import {io} from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const socket = io('http://localhost:8000');


const messageInput=document.getElementById('message');
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

    const groupId=localStorage.getItem('groupId');

    axios.post(`http://localhost:3000/message/add-message/${groupId}`,myobj,{ headers: {"Authorization":token} })
    .then((res)=>{
       console.log(res.data.data);
       socket.emit('send-message', groupId);
    }).catch((err)=>{
     console.log(err);
    })
    
    messageInput.value='';
}

const myButton = document.getElementById("filebtn");
const myInput = document.getElementById("file");

// Add an event listener to the button element
myButton.addEventListener("click", function() {
  // Retrieve the value of the input field
  const myImage = document.createElement("img");
  const inputValue = myInput.value;
  const chats = document.querySelector('#chats');

const selectedFile = myInput.files[0];

const fileobj={
  selectedFile
}

const groupId=localStorage.getItem('groupId');
axios.post(`http://localhost:3000/message/add-file/${groupId}`,fileobj,{ headers: {"Authorization":token} }).then((res)=>{

}).catch(err=>{
  console.log(err);
})


// // Create a FileReader object to read the file
// const reader = new FileReader();

// // // Set the image source when the file is loaded
// // reader.onload = function(event) {
// //   myImage.src = event.target.result;
// // };

// // chats.appendChild(myImage);

// // // Read the file as a data URL
// // reader.readAsDataURL(selectedFile);


});

window.addEventListener('DOMContentLoaded',async()=>{
    try{  
        const token=localStorage.getItem('token');
        const chats = document.querySelector('#chats');
        
        
        // const res=await axios.get("http://localhost:3000/user/get-users",{ headers: {"Authorization":token} });
        const res=await axios.get("http://localhost:3000/group/get-groups",{ headers: {"Authorization":token} });
// console.log(res.data.userGroups[0].group.name)
        // console.log(res.data.users[0].name);
        for(let i=0;i<res.data.userGroups.length;i++){
            showGroups(res.data.userGroups[i]);
        }    
}catch(err){
        console.log(err);
    }
})

socket.on('receive-message', async (group) => {
  const groupId=localStorage.getItem('groupId');
  if(group == groupId){
      
    fetchNewMessage();
  }
})

    
     async function fetchNewMessage(){
        try{

            const chats = document.querySelector('#chats');
            const token=localStorage.getItem('token');
            const groupId=localStorage.getItem('groupId');
            
            let localMsg = JSON.parse(localStorage.getItem("localMsg"))||[];
            let lastId;
            
            if (localMsg.length == 0) {
              
              lastId = 0;
            }
            if (localMsg.length > 0) {
                for(let i=localMsg.length - 1;i>=0;i--){
                    if(localMsg[i].groupId==groupId){
                      lastId=localMsg[i].id;
                      break;
                    }
                  }
                
              }
              if(!lastId){
                lastId=0;
              }
       
        const response=await axios.get(`http://localhost:3000/message/get-messages/${groupId}?lastId=${lastId}`,{ headers: {"Authorization":token} });
        let  retrivedMsg =localMsg.concat(response.data.messages);
    //  console.log(retrivedMsg)
    if(response.data.messages.length!=0) 
    {
        // console.log(response.data.messages);
        const groupName=localStorage.getItem('groupName');
    chats.innerHTML='';
    chats.innerHTML=groupName;
    var showparticipant=document.createElement('button');
        showparticipant.className='showparticipant';
        showparticipant.appendChild(document.createTextNode('Show participant'));
        chats.appendChild(showparticipant);
        if (retrivedMsg.length > 100) {
        
        for (let i = 0; i < retrivedMsg.length - 100; i++)
          retrivedMsg.shift();
      }
      localStorage.setItem("localMsg", JSON.stringify(retrivedMsg));
    //   console.log(retrivedMsg);
           for(let i=0;i<retrivedMsg.length;i++){
            if(retrivedMsg[i].groupId==groupId){showMessage(retrivedMsg[i]);}
        }}
    } 
    catch(err){
        console.log(err);
    }
       } 
    





async function showGroups(obj){
    const userList = document.querySelector('#groups');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${obj.group.name} `));
    userList.appendChild(li);
    li.onclick=async()=>{
        localStorage.setItem('groupId',obj.group.id)
        localStorage.setItem('groupName',obj.group.name)
        const chats = document.querySelector('#chats');
        chats.innerHTML=obj.group.name;
        var showparticipant=document.createElement('button');
        showparticipant.className='showparticipant';
        showparticipant.appendChild(document.createTextNode('Show participant'));
        chats.appendChild(showparticipant);

        showparticipant.onclick=async()=>{
         
    const token=localStorage.getItem('token');
    const res=await axios.get(`http://localhost:3000/user/get-users?groupId=${obj.group.id}`,{ headers: {"Authorization":token} });
    // console.log(res.data.users);
    const participants = document.querySelector('#participants');
    participants.style.display='initial';
    participants.innerHTML="Participants";
    var removeparticipant=document.createElement('button');
    removeparticipant.className='removeparticipant';
    removeparticipant.appendChild(document.createTextNode(''));
    removeparticipant.innerHTML='&#x2717';
    participants.appendChild(removeparticipant);
    removeparticipant.onclick=async()=>{
      participants.style.display='none';
    }
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`You`));
    participants.appendChild(li);
    
    const output=await axios.get(`http://localhost:3000/admin/check-admin/?groupId=${groupId}`,{ headers: {"Authorization":token} });
    // console.log(output);
    if(output.data){
      var div=document.createElement('div');
      div.className='admin';
      div.appendChild(document.createTextNode('Group Admin'));
      li.appendChild(div);
    }
    for(let i=0;i<res.data.users.length;i++){
        showUsers(res.data.users[i].user);
    }  
        }
        let localMsg = JSON.parse(localStorage.getItem("localMsg"))||[];
        let lastId;
        
        if (localMsg.length == 0) {
          
          lastId = 0;
        }
        if (localMsg.length > 0) {
            for(let i=localMsg.length - 1;i>=0;i--){
              if(localMsg[i].groupId==obj.group.id){
                lastId=localMsg[i].id;
                break;
              }
            }
          
        }
        if(!lastId){
          lastId=0;
        }
        const token=localStorage.getItem('token');
        const groupId=localStorage.getItem('groupId');
        console.log(lastId);    
        const response=await axios.get(`http://localhost:3000/message/get-messages/${groupId}?lastId=${lastId}`,{ headers: {"Authorization":token} });
         let  retrivedMsg =localMsg.concat(response.data.messages);
         console.log(retrivedMsg)
         if (retrivedMsg.length > 100) {
            for (let i = 0; i < retrivedMsg.length - 100; i++)
              retrivedMsg.shift();
          }
          localStorage.setItem("localMsg", JSON.stringify(retrivedMsg));
        //   console.log(retrivedMsg);
    
               for(let i=0;i<retrivedMsg.length;i++){
                 if(retrivedMsg[i].groupId==groupId){showMessage(retrivedMsg[i]);}
            }
    }
}

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

async function showUsers (obj){

  const token=localStorage.getItem('token');
  const groupId=localStorage.getItem('groupId');

  const participants = document.querySelector('#participants');
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(`${obj.name}`));
  participants.appendChild(li);
  // console.log(obj);
  try{
    const output=await axios.get(`http://localhost:3000/admin/check-admin/?groupId=${groupId}`,{ headers: {"Authorization":token} });
    // console.log(output);
    if(output.data){
        
      const res=await axios.get(`http://localhost:3000/admin/check-admin/?userId=${obj.id}&groupId=${groupId}`,{ headers: {"Authorization":token} });
      if(res.data){
        var div=document.createElement('div');
        div.className='admin';
        div.appendChild(document.createTextNode('Group Admin'));
        li.appendChild(div);
        var removeUser=document.createElement('button');
        removeUser.className='removeUser';
        removeUser.appendChild(document.createTextNode('Remove'));
        li.appendChild(removeUser);

        removeUser.onclick=async()=>{
          await axios.post(`http://localhost:3000/group/removeUserFromGroup?userId=${obj.id}`,{groupId:groupId},{ headers: {"Authorization":token} });
          await axios.post(`http://localhost:3000/admin/removeAdmin?userId=${obj.id}`,{groupId:groupId},{ headers: {"Authorization":token} })
        }

      }else{

        var removeUser=document.createElement('button');
        removeUser.className='removeUser';
        removeUser.appendChild(document.createTextNode('Remove'));
        li.appendChild(removeUser);
        
        removeUser.onclick=async()=>{
          await axios.post(`http://localhost:3000/group/removeUserFromGroup?userId=${obj.id}`,{groupId:groupId},{ headers: {"Authorization":token} });          
        }

        var makeAdmin=document.createElement('button');
        makeAdmin.className='makeAdmin';
        makeAdmin.appendChild(document.createTextNode('Make Group Admin'));
        li.appendChild(makeAdmin);
        
        makeAdmin.onclick=async()=>{
         await axios.post(`http://localhost:3000/admin/make-admin?userId=${obj.id}`,{groupId:groupId},{ headers: {"Authorization":token} })
        }

          
         
      }  
      
    }
  }
  catch(err){
    console.log(err);
  }
}