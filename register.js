const body = document.querySelector("body");
function removeElementFromDOM(pageRender, ...elementToBeRemoved) {
  // head.insertAdjacentHTML('beforeend',' <link rel="stylesheet" href="./style.css" />');
  console.log("element to be removed", elementToBeRemoved);

  elementToBeRemoved.forEach((element) => {
    console.log(element.className);
    console.log(element.className !== "trello");
    if (element.className !== "trello") element.remove();
  });

  const ul = document.querySelector(".navbar-nav");

  console.log("unordered list", ul);
  if (localStorage.getItem("user") && ul) {
    Array.from(ul.children).forEach((child) => child.remove());
    ul.innerHTML = `
        <li class="nav-item text-dark p-2">
        ${JSON.parse(localStorage.getItem("user")).userName}
        </li>
        <li class="nav-item">
        <a class="nav-link" href="#" onclick="goToCreateBoard(event)">Create Board</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="#" onclick="logout(event)">Logout</a>
        </li>
        `;
    const head = document.querySelector("head");

    // body.insertAdjacentHTML('beforeend',`<script async=false src="./script.js"></script>`)
  } else if (ul && !localStorage.getItem("user")) {
    ul.innerHTML = `<li class="nav-item">
        <a class="nav-link" href="#" onclick="removeElementFromDOM(renderRegisterPage,document.querySelector('.login'))">Register</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="#"  onclick="removeElementFromDOM(renderLoginPage,document.querySelector('.register'))">Login</a>
        </li>`;
  }
  if (pageRender != null) injectElementToDOM(pageRender);
}

function goToCreateBoard() {
  // const trelloBoard = document.querySelector('.trello');
  // trelloBoard.style.visibility='hidden';
  if(!document.querySelector('.board-container')){

      renderBoardPage();
  }
}

function injectElementToDOM(pageRender) {
  console.log("page render", pageRender);
  if (!document.querySelector("nav")) {
    body.insertAdjacentHTML("afterbegin", pageRender());
  } else if (document.querySelector("nav")) {
    document.querySelector("nav").insertAdjacentHTML("afterend", pageRender());
  } else {
    body.insertAdjacentHTML("beforeend", pageRender());
  }
}

async function register(event) {
  event.preventDefault();
  console.log(event.target);
  const { userName, userEmail, userPassword } = event.target;
  console.log(userName.value);
  try {
    let body = {
      userName: userName.value,
      userEmail: userEmail.value,
      password: userPassword.value,
    };
    const response = await fetch(`https://tranquil-plains-09028.herokuapp.com/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log(response.ok);
    if (!response.ok) {
      if ((await response.json()).msg.includes("duplicate"));
      throw new Error("email already exist !!");
    } else {
      const data = await response.json();
      alert(data.msg);
      removeElementFromDOM(
        renderLoginPage,
        document.querySelector(".register")
      );
    }
  } catch (err) {
    alert(err);
    userEmail.value = "";
    userName.value = "";
    userPassword.value = "";
  }
}

async function renderBoardPage() {
   console.log(document.querySelector(".invite-form"));
  document.querySelector(".invite-form").style.visibility = "hidden";

  const responseData = await fetch(`https://tranquil-plains-09028.herokuapp.com/getUserData`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': JSON.parse(localStorage.getItem("user")).acessToken,
    },
  });
  // console.log(responseData);
  const userData = await responseData.json();
  console.log('userData',userData);
  // console.log(userData.user[0]);
  // console.log("user Data",userData.user.completeItems);
  // completeListArray=userData.user.completeItems;
  // backlogListArray=userData.user.backlogItems;
  // progressListArray=userData.user.progressItems;
  // onHoldListArray=userData.user.onHoldItems;
  // console.log(completeListArray,backlogListArray,progressListArray,onHoldListArray);
  // listArray=[backlogListArray,progressListArray,completeListArray,onHoldListArray];
  // console.log('list Array',listArray);
  // updateDOM();
  const form = document.querySelector(".login");
  const trelloPage = document.querySelector(".trello");
  console.log(trelloPage.style.visibility);
  console.log(trelloPage.style.visibility.includes("visible"));
  if (form) {
    removeElementFromDOM(createBoard, form);
  } else if (trelloPage.style.visibility.includes("visible")) {
    trelloPage.style.visibility = "hidden";
    removeElementFromDOM(createBoard, trelloPage);
    document
      .querySelectorAll(".add-btn")
      .forEach((addBtn) => (addBtn.style.visibility = "hidden"));
  }
  const userBoard = document.querySelector(".user-board");
  userData.user.forEach((boardDetail) => {
    console.log("board Name", boardDetail.boardName);
    let board = `
                    <div onclick=goToTrelloPage(event,'${boardDetail._id}','${boardDetail.refBoardId}') class="user-board-item" style="width:200px;height:200px;display:flex;justify-content:center;align-items:center;
                    background-color:rgba(0, 0, 0, 0.4); border-radius:5px; margin-top:10px">
                    <h3>${boardDetail.boardName}</h3>
                    </div>
                `;
    userBoard.insertAdjacentHTML("afterbegin", board);
  });
}

async function login(event) {
  event.preventDefault();
  // setTimeout(()=>{
  //     document.querySelectorAll('.add-btn').forEach(addBtn=>addBtn.style.visibility='visible');
  //     document.querySelector('.trello').style.visibility='visible';
  // },500)

  const { userEmail, userPassword } = event.target;
  const body = {
    userEmail: userEmail.value,
    password: userPassword.value,
  };
  try {
    const response = await fetch(`https://tranquil-plains-09028.herokuapp.com/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error((await response.json()).msg);
    } else {
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      alert(data.msg);

      // move it to a function when create board is cliked in nav bar it will run
      //this part in such a way that if user board is there then dotnot render otherwise
      // render

      renderBoardPage();
    }
  } catch (err) {
    console.log(err);
    alert(err);
  }
}

async function uploadTrelloDataToDB() {
  const _id = currentBoard;
  try {
    const backlogItems = JSON.parse(localStorage.getItem("backlogItems"));
    const progressItems = JSON.parse(localStorage.getItem("progressItems"));
    const completeItems = JSON.parse(localStorage.getItem("completeItems"));
    const onHoldItems = JSON.parse(localStorage.getItem("onHoldItems"));
    const response = await fetch(`https://tranquil-plains-09028.herokuapp.com/uploadData/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("user")).acessToken,
      },
      body: JSON.stringify({
        backlogItems,
        progressItems,
        completeItems,
        onHoldItems,
      }),
    });
  } catch (err) {
    console.log(err);
    alert(err);
  }
}

async function logout(event) {
  try {
    document.querySelector(".invite-form").style.visibility = "hidden";
    const response = await fetch(`https://tranquil-plains-09028.herokuapp.com/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("user")).acessToken,
      },
    });
    if (!response.ok) {
      throw new Error((await response.json()).msg);
    } else {
      const data = await response.json();
      alert(data.msg);
      console.log(localStorage.getItem("user"));
      // uploadTrelloDataToDB();
      localStorage.removeItem("user");
      if (document.querySelector(".board-container")) {
        removeElementFromDOM(
          renderLoginPage,
          document.querySelector(".trello"),
          document.querySelector(".board-container")
        );
      } else {
        removeElementFromDOM(
          renderLoginPage,
          document.querySelector(".trello")
        );
      }
      document
        .querySelectorAll(".add-btn")
        .forEach((addBtn) => (addBtn.style.visibility = "hidden"));
      document.querySelector(".trello").style.visibility = "hidden";
    }
  } catch (err) {
    console.log(err);
    alert(err);
  }
}

// function onLoad(){
//     body.insertAdjacentHTML('afterbegin',renderNavBar());
//     body.insertAdjacentHTML('beforeend',renderRegisterPage());
// }
// onLoad();
