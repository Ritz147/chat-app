const socket=io();
let name;
let messageArea=document.querySelector(".message-area");
do{
     name = prompt('Please Enter Your Name:')
}
while(!name)
let submit=document.querySelector("#submit");
submit.addEventListener("click",()=>{
    let textarea=document.querySelector("#textarea").value;
    if(textarea.length===0)
    {
        alert("Please type something");
    }
    else{
        document.querySelector("#textarea").value="";
        sendMessage(textarea);
        
    }
})
function sendMessage(msgx){
    let msg={
        user:name,
        message:msgx.trim()
    }
    //Append
    appendMessage(msg,'outgoing-message')
    scrollToBottom();
    //Send to server
    socket.emit('message',msg)//event send kar diya server ko
}
function appendMessage(msg,type){
let Maindiv=document.createElement("div");
Maindiv.setAttribute("class",type);
let username=document.createElement("h4");
let para=document.createElement("p");
username.innerText=msg.user;
para.innerText=msg.message;
Maindiv.appendChild(username);
Maindiv.appendChild(para);
messageArea.appendChild(Maindiv);
}
//Recieve messages
socket.on('message',(msg)=>{
 appendMessage(msg,'incoming-message');
scrollToBottom()
})
function scrollToBottom(){
  messageArea.scrollTop=messageArea.clientHeight;
}
