function renderLoginPage(){

    return `<form onsubmit="login(event)" style="border: 1px solid black"  class="w-50 custom-form mx-auto">
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
      return `<form onsubmit="register(event)" style="border: 1px solid black" class="w-50 custom-form mx-auto">
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

function renderNavBar(){
  return ` <nav style="z-index:9999" class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Trello Clone</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" href="#" onclick="removeElementFromDOM(renderRegisterPage,document.querySelector('form'))">Register</a>
      </li>
      <li class="nav-item">
      <a class="nav-link" href="#"  onclick="removeElementFromDOM(renderLoginPage,document.querySelector('form'))">Login</a>
    </li>
    </ul>
  </div>
</nav>`
}

function boardPage(){

  return `
  
    <h1> Welcome ${JSON.parse((localStorage.getItem('user')).userName)} </h1>
     
  `
}

function createBoard(){
  return `
    <div>
      <form onsubmit="register(event)" style="border: 1px solid black" class="w-50 custom-form mx-auto">
      <h1 style="text-align: center">Register</h1>
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
          <button  type="submit" class="btn btn-primary mb-3">Create Board</button>
        </div>
    </form>
    </div>
    </div>
  `
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