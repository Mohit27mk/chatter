const groupform=document.getElementById('groupform');
const users=[];

groupform.addEventListener('submit',onSubmit);

 function  onSubmit (e){
    e.preventDefault();
    const groupname=e.target.groupname.value;
    let myobj={
groupname,users
    }
    const token=localStorage.getItem('token');
    axios.post("http://localhost:3000/group/create-group",myobj,{ headers: {"Authorization":token} }).then((res)=>{
        // console.log(res);
    axios.post("http://localhost:3000/admin/make-admin",{groupId:res.data.group.id},{ headers: {"Authorization":token} }).then((response)=>{

    }).catch((err)=>{
 console.log(err);
    })
    window.location.href="../chatapp/chatapp.html";
    }).catch((err)=>{
        console.log(err);
    })
}

window.addEventListener('DOMContentLoaded',async()=>{
    const token=localStorage.getItem('token');
    const res=await axios.get("http://localhost:3000/user/get-users",{ headers: {"Authorization":token} });
    for(let i=0;i<res.data.users.length;i++){
        showUsers(res.data.users[i]);
    }  
})

function showUsers(obj){
    const userList = document.querySelector('#users');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${obj.name}`));
    userList.appendChild(li);
    var addbtn=document.createElement('button');
    addbtn.className='btn btn-danger btn-sm  delete';
    addbtn.appendChild(document.createTextNode('add-user'));
    li.appendChild(addbtn);
    addbtn.onclick=()=>{
    users.push(obj);
    console.log(users);
    }
}




