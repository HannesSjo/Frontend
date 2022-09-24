//ADD TOKEN FOR API HERE BEFORE USAGE
var token = "INPUT TOKEN HERE";
//READ ABOVE TEXT PLZ
var newestMsgId;

function OnClick(){
  let message = document.getElementById("Message").value;
  let user = document.getElementById("Username").value;

  SendMessage(user, message);
  Update(false, 0);
}

function Update(loop, timer){
  console.log("UPDATE TIME");
  GetMessages(1).then((msg) => {
    if (newestMsgId == null || newestMsgId != msg.messages[0].id){
      GetMessages().then((data) => {
        newestMsgId = data.messages[0].id;
        document.getElementById("content").innerHTML = "";
        for (var i = 0; i < data.messages.length; i++){
          AddArticle(data.messages[i].user, data.messages[i].message);
        }
      })
    }
    if (loop)
      setTimeout(() => {  Update(loop, timer) }, timer);
  });
}

function AddArticle(user, message){
  const articleEL = document.createElement('article');
  articleEL.className = "flexbox"

  const userEL = document.createElement('p');
  userEL.className = "username";
  userEL.innerHTML = user;
  articleEL.appendChild(userEL);

  const messageEL = document.createElement('p');
  messageEL.className = "message";
  messageEL.innerHTML = message;
  articleEL.appendChild(messageEL);

  document.getElementById("content").appendChild(articleEL);
}

async function GetMessages(count) {
    count = count || 30;
    let data = await fetch(`http://localhost:3000/api/messages?limit=${count}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
    }})
    .then((response) => response.json())
    .then((data) => {
      return data
    })

    return data;
}

function SendMessage(sender, message){
  var params = {
    user: sender,
    message: message,
  }

  fetch("http://localhost:3000/api/messages/append", {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Authorization': `Bearer ${token}`,
  }})
  .then((response) => response.json())
  .then((data) => {
      console.log(data);
  })
}