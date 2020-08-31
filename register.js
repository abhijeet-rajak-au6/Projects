


const body = document.querySelector('body');
function removeElementFromDOM(pageRender,...elementToBeRemoved){
    // head.insertAdjacentHTML('beforeend',' <link rel="stylesheet" href="./style.css" />');
    
    elementToBeRemoved.forEach(element=>{
        console.log(element.className);
        console.log(element.className!=='trello');
        if(element.className!=='trello')
            element.remove();
    })
    
    const ul= document.querySelector('.navbar-nav');
    console.log('unordered list',ul);
    if(localStorage.getItem('user') && ul){
        Array.from(ul.children).forEach(child=>child.remove());
        ul.innerHTML=` <li class="nav-item">
        <a class="nav-link" href="#" onclick="createBoard(event)">Create Board</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="#" onclick="logout(event)">Logout</a>
        </li>
        `
        const head = document.querySelector('head');
        
        // body.insertAdjacentHTML('beforeend',`<script async=false src="./script.js"></script>`)
       
        
    }
    else if(ul && !localStorage.getItem('user')){
        ul.innerHTML=`<li class="nav-item">
        <a class="nav-link" href="#" onclick="removeElementFromDOM(renderRegisterPage,document.querySelector('form'))">Register</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="#"  onclick="removeElementFromDOM(renderLoginPage,document.querySelector('form'))">Login</a>
        </li>`
        
    }
    if(pageRender!=null)
        injectElementToDOM(pageRender);
}

function injectElementToDOM(pageRender){
    
    if(!document.querySelector('nav')){

        body.insertAdjacentHTML('afterbegin',pageRender());
    }
    else{
        body.insertAdjacentHTML('beforeend',pageRender());
       
    }
}


async function register(event){
        event.preventDefault();
        console.log(event.target);
        const {userName,userEmail,userPassword} = event.target;
        console.log(userName.value);
        try{
            let body={
                userName:userName.value,
                userEmail:userEmail.value,
                password:userPassword.value
            }
            const response = await fetch(`http://localhost:3000/register`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            console.log(response.ok);
            if(!response.ok){ 
                if((await response.json()).msg.includes('duplicate'));
                throw new Error('email already exist !!');               
            }
            else{
                const data = await response.json();
                alert(data.msg);
                removeElementFromDOM(renderLoginPage,document.querySelector('form'));
                
            }
        }
        catch(err){
            alert(err);
            userEmail.value='';
            userName.value='';
            userPassword.value='';
        }
}


async function login(event){
    event.preventDefault();
    setTimeout(()=>{
        document.querySelectorAll('.add-btn').forEach(addBtn=>addBtn.style.visibility='visible');
        document.querySelector('.trello').style.visibility='visible';
    },500)
    
    const {userEmail,userPassword}= event.target;
    const body = {
        userEmail:userEmail.value,
        password:userPassword.value
    }
    try{

        const response = await fetch(`http://localhost:3000/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        if(!response.ok){
            throw new Error((await response.json()).msg);
        }
        else{
            const data = await response.json();
            localStorage.setItem('user',JSON.stringify(data));
            // alert(data.msg);
            const responseData = await fetch(`http://localhost:3000/getUserData`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':JSON.parse(localStorage.getItem('user')).acessToken
            },
            });
            console.log(responseData);
            const userData = await responseData.json();
            console.log("user Data",userData.user.completeItems);
            completeListArray=userData.user.completeItems;
            backlogListArray=userData.user.backlogItems;
            progressListArray=userData.user.progressItems;
            onHoldListArray=userData.user.onHoldItems;
            console.log(completeListArray,backlogListArray,progressListArray,onHoldListArray);
            listArray=[backlogListArray,progressListArray,completeListArray,onHoldListArray];
            console.log('list Array',listArray);
            updateDOM();
            
           
            removeElementFromDOM(null,document.querySelector('form'));
        }
    }
    catch(err){
        console.log(err);
        alert(err);
    }

}

async function uploadTrelloDataToDB(){

    try{
        const backlogItems = JSON.parse(localStorage.getItem('backlogItems'));
        const progressItems = JSON.parse(localStorage.getItem('progressItems'));
        const completeItems = JSON.parse(localStorage.getItem('completeItems'));
        const onHoldItems = JSON.parse(localStorage.getItem('onHoldItems'));
        const response = await fetch(`http://localhost:3000/uploadData`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':JSON.parse(localStorage.getItem('user')).acessToken
            },
            body:JSON.stringify({
                backlogItems,
                progressItems,
                completeItems,
                onHoldItems
            })
        });

    }
    catch(err){
        console.log(err);
        alert(err);
    }
}

async function logout(event){

    try{

        const response = await fetch(`http://localhost:3000/logout`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':JSON.parse(localStorage.getItem('user')).acessToken
                },
            });
            if(!response.ok){
                throw new Error((await response.json()).msg);
            }
            else{
                const data = await response.json();
                alert(data.msg);
                console.log(localStorage.getItem('user'));
                uploadTrelloDataToDB();
                localStorage.removeItem('user');
                removeElementFromDOM(renderLoginPage,document.querySelector('.trello'));
                document.querySelectorAll('.add-btn').forEach(addBtn=>addBtn.style.visibility='hidden');
                document.querySelector('.trello').style.visibility='hidden';
            }
    }
    catch(err){
        console.log(err);
        alert(err);
    }
}

// function onLoad(){
//     body.insertAdjacentHTML('afterbegin',renderNavBar());
//     body.insertAdjacentHTML('beforeend',renderRegisterPage());
// }
// onLoad();