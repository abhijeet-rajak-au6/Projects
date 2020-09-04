
let currentBoard;
let refBoard;

function renderLoginPage(){

    return `<form  onsubmit="login(event)" style="border: 1px solid black"  class="w-50 custom-form mx-auto login">
                <h1 style="text-align: center;">Login</h1>
                <div class="form-group">
                <input type="email" class="form-control w-75 mx-auto mt-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="userEmail">
                </div>
                <div class="form-group">
                
                <input type="password" class="form-control w-75 mx-auto  mt-3" id="exampleInputPassword1" placeholder="Password" name="userPassword">
                </div>
                <div class="btn-group">
                    
                    <button type="submit" class="btn btn-primary mb-3">Submit</button>
                </div>
            </form>
            <script
            src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossorigin="anonymous"
            ></script>
            <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossorigin="anonymous"
            ></script>
            <script
            src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossorigin="anonymous"
            ></script>`
}

function renderRegisterPage(){
      return `<form  onsubmit="register(event)" style="border: 1px solid black" class="w-50 custom-form mx-auto register">
                  <h1 style="text-align: center">Register</h1>
                  <div class="form-group">
                  <input
                      type="text"
                      class="form-control w-75 mx-auto mt-3"
                      id="exampleInputName1"
                      aria-describedby="emailHelp"
                      placeholder="Enter name"
                      name="userName"
                  />
                  </div>
                  <div class="form-group">
                  <input
                      type="email"
                      class="form-control w-75 mx-auto mt-3"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      name="userEmail"
                  />
                  </div>
                  <div class="form-group">
                  <input
                      type="password"
                      class="form-control w-75 mx-auto mt-3"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="userPassword"
                  />
                  </div>
                  <div class="btn-group">
                  <button  type="submit" class="btn btn-primary mb-3">Submit</button>
                  </div>
              </form>
              <script
                  src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
                  integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                  crossorigin="anonymous"
              ></script>
              <script
                  src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
                  integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                  crossorigin="anonymous"
              ></script>
              <script
                  src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
                  integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                  crossorigin="anonymous"
              ></script>
  `
}

function renderTrelloPage(){

      return `<h1 class="main-title">Kanban Board</h1>
      <!-- Script -->
              <div class="drag-container">
              <ul class="drag-list">
                  <!-- BackLog Coloum -->
                  <li class="drag-column backlog-column">
                  <span class="header">
                      <h1>Backlog</h1>
                  </span>
                  <!-- Backlog Content -->
                  <div class="backlog-content" class="custom-scroll">
                      <ul class="drag-item-list" id="backlog-list"  ondragover=allowDrop(event)
                      ondragenter=dragEnter(0)
                      ondrop=dropItem(event)
                  >
                      
                      </ul>
                  </div>
          <!-- Add Button Group -->
            <div class="add-btn-group">
              <div class="add-btn" onclick=showInputBox(0)>
                <span class="plus-sign">+</span>
                <span>Add Item</span>
              </div>
              <div class="add-btn solid" onclick=hideInputBox(0)>
                <span>Save Item</span>
              </div>
            </div>
            <div class="add-container" contenteditable="true">
              <textarea class="add-item"></textarea>
            </div>
          </li>
  
          <!-- Complete Coloum -->
          <li class="drag-column progress-column">
            <span class="header">
              <h1>Progress</h1>
            </span>
            <!-- Progress Content -->
            <div class="progress-content" class="custom-scroll">
              <ul class="drag-item-list" id="progress-list" ondragover=allowDrop(event)
              ondragenter=dragEnter(1)
              ondrop=dropItem(event)
              >
                
              </ul>
            </div>
            <!-- Add Button Group -->
            <div class="add-btn-group">
              <div class="add-btn" onclick=showInputBox(1)>
                <span class="plus-sign">+</span>
                <span>Add Item</span>
              </div>
              <div class="add-btn solid" onclick=hideInputBox(1)>
                <span>Save Item</span>
              </div>
            </div>
            <div class="add-container" contenteditable="true">
              <textarea class="add-item"></textarea>
            </div>
          </li>
          <!-- Complete Coloum -->
          <li class="drag-column complete-column">
            <span class="header">
              <h1>Complete</h1>
            </span>
            <!-- Complete Content -->
            <div class="complete-content" class="custom-scroll">
              <ul class="drag-item-list" id="complete-list" ondragover=allowDrop(event)
              ondragenter=dragEnter(2)
              ondrop=dropItem(event)>
              
              
              </ul>
            </div>
            <!-- Add Button Group -->
            <div class="add-btn-group">
              <div class="add-btn" onclick=showInputBox(2)>
                <span class="plus-sign">+</span>
                <span>Add Item</span>
              </div>
              <div class="add-btn solid" onclick=hideInputBox(2)>
                <span>Save Item</span>
              </div>
            </div>
            <div class="add-container" contenteditable="true">
              <textarea class="add-item"></textarea>
            </div>
          
          </li>
          <!-- Hold Coloum -->
          <li class="drag-column on-hold-column">
            <span class="header">
              <h1>Hold</h1>
            </span>
            <!-- on-Hold Content -->
            <div class="on-hold-content custom-scroll" >
              <ul class="drag-item-list" id="on-hold-list" ondragover="allowDrop(event)"
              ondragenter="dragEnter(3)"
              ondrop="dropItem(event)"
              >
                
              </ul>
            </div>
            <!-- Add Button Group -->
            <div class="add-btn-group">
              <div class="add-btn" onclick=showInputBox(3)>
                <span class="plus-sign">+</span>
                <span>Add Item</span>
              </div>
              <div class="add-btn solid" onclick=hideInputBox(3)>
                <span>Save Item</span>
              </div>
            </div>
            <div class="add-container" contenteditable="true">
              <textarea class="add-item"></textarea>
            </div>
      
          </li>
        </ul>
      </div>
    `
}

async function inviteUser(event){
  event.preventDefault();
  console.log('board id',currentBoard)
  try{
    
    const emailSendResponse =  await fetch(`http://localhost:3000/sendEmail/${event.target.email.value}/${currentBoard}`,{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':JSON.parse(localStorage.getItem('user')).acessToken
          },
      })
      console.log(emailSendResponse);
      if (!emailSendResponse.ok) {
        throw new Error((await emailSendResponse.json()).msg);
      }
  }
  catch(err){
    console.log(err);
    alert(err);
  }
}

function renderNavBar(){
  console.log(currentBoard);
  return ` <nav style="z-index:9999" class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Trello Clone</a> 
  <form onsubmit="inviteUser(event)" style="visibility:hidden" class="form-inline my-2 my-lg-0 invite-form">
      <input class="form-control mr-sm-2" type="search" name="email" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" href="#" onclick="removeElementFromDOM(renderRegisterPage,document.querySelector('.login'))">Register</a>
      </li>
      <li class="nav-item">
      <a class="nav-link" href="#"  onclick="removeElementFromDOM(renderLoginPage,document.querySelector('.register'))">Login</a>
    </li>
    </ul>
  </div>
</nav>`
}

function createBoard(){

  console.log(JSON.parse(localStorage.getItem('user')).userName);
  return `
  <div class="board-container">
    <h1 style="text-align:center">Current Board</h1>
    <div style="display:flex; flex-wrap:wrap;" class="user-board">

    </div>
    <button onclick="createBoardPage(event)" class="btn btn-success">Create Board</button>
    </div>
  `
}
function acceptInvitation(){
  console.log("helloooooo");
}


function createBoardPage(event){
  console.log("triggered");
  // document.querySelector('.invite').style.visibility='hidden';
  injectElementToDOM(boardPage);
}

function boardPage(){
  return `
    <div class="create-board" style="height:100vh">
      <form onsubmit="removeBoard(event)" style="border: 1px solid black" class="w-50 custom-form mx-auto">
      <h1 style="text-align: center">Create Board</h1>
      <div class="form-group">
        <input
            type="text"
            class="form-control w-75 mx-auto mt-3"
            id="exampleInputName1"
            aria-describedby="boardHelp"
            placeholder="Enter board name"
            name="boardName"
        />
        <div class="btn-group">
          <button type="submit" class="btn btn-primary mb-3 mt-3">Create</button>
        </div>
    </form>
    </div>
    </div>
  `

}

async function removeBoard(event){
  event.preventDefault();
  console.log("removeBoard",event.target.boardName);
  document.querySelector('.create-board').remove();
  const userBoard=document.querySelector('.user-board');
  const createBoard =  await fetch(`http://localhost:3000/createBoard`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':JSON.parse(localStorage.getItem('user')).acessToken
        },
        body: JSON.stringify({
          boardName:event.target.boardName.value
        })
    })
    const createBoardData = await createBoard.json();
    console.log(createBoardData);

  let board =`
    <div onclick=goToTrelloPage(event,'${createBoardData.boardDetail._id}','${createBoardData.boardDetail.refBoardId}') class="user-board-item" style="width:200px;height:200px;display:flex;justify-content:center;align-items:center;
    background-color:rgba(0, 0, 0, 0.4); border-radius:5px; margin-top:10px">
      <h3>${event.target.boardName.value}</h3>
      <label style="visbility:hidden" class="board-id"></label>
    </div>
  `
  if(event.target.boardName.value){
    console.log('userBoard',userBoard);
    userBoard.insertAdjacentHTML('afterbegin',board);
      
  }
}

async function getTrelloData(_id){
  currentBoard=_id;
  const trelloDataResponse = await fetch(`http://localhost:3000/getTrelloData/${_id}`,{
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          'Authorization':JSON.parse(localStorage.getItem('user')).acessToken
      },
     
  });
  
  const trelloData = await trelloDataResponse.json();
  console.log('trello datat',trelloData);
  // console.log(userData.user[0]);
  if(trelloData.board){
    console.log(trelloData.board);
    console.log("user Data",trelloData.board.completeItems);
    completeListArray=trelloData.board.completeItems;
    backlogListArray=trelloData.board.backlogItems;
    progressListArray=trelloData.board.progressItems;
    onHoldListArray=trelloData.board.onHoldItems;
    console.log(completeListArray,backlogListArray,progressListArray,onHoldListArray);
    listArray=[backlogListArray,progressListArray,completeListArray,onHoldListArray];
    console.log('list Array',listArray);
    updateDOM();
  }

}

function goToTrelloPage(event,board_id,refBoardId){
  console.log('refBoard id',refBoardId);
  console.log('refBoard id',typeof refBoardId);

  if(refBoardId!="null"){
    console.log('ref');
    refBoard=refBoardId;
    currentBoard=board_id;
    socket.emit('joinRoom',refBoardId);//updated
  }
  else{
    refBoard=null;
    currentBoard=board_id;
    console.log('id');
    socket.emit('joinRoom',board_id);
  }
  console.log(board_id);
  removeElementFromDOM(null,document.querySelector('.trello'),document.querySelector('.board-container'));
  setTimeout(()=>{
        document.querySelectorAll('.add-btn').forEach(addBtn=>addBtn.style.visibility='visible');
        document.querySelector('.trello').style.visibility='visible';
        document.querySelector('.invite-form').style.visibility='visible';
    },500);
    getTrelloData(board_id);
    
}

injectElementToDOM(renderNavBar);
if(localStorage.getItem('user')){
  document.querySelector('.trello').style.visibility='visible';
  removeElementFromDOM(null,);
}
else{
  injectElementToDOM(renderRegisterPage);
}


console.log("hi");