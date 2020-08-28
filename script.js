const socket = io('https://morning-sands-76041.herokuapp.com/')
const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const itemLists = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
// let onLoad = false


// Draggeble items

let draggableItem;
let currentColumn;
let draggable=false;
// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let arrayNames=[]
let listArray=[]
// Drag Functionality
localStorage.setItem('onLoad',false);


// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}


// Set localStorage Arrays
function updateSavedColumns() {
    arrayNames=['backlogItems','progressItems','completeItems','onHoldItems']
    if(listArray.length){
      backlogListArray=listArray[0];
      completeListArray=listArray[2];
      progressListArray=listArray[1];
      onHoldListArray=listArray[3];
    }
    listArray=[backlogListArray,progressListArray,completeListArray,onHoldListArray]
    arrayNames.forEach((arrayName,idx)=>{
    localStorage.setItem(arrayName,JSON.stringify(listArray[idx]))
    })
    
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent=item;
  listEl.draggable=true;
  listEl.setAttribute('ondragstart','drag(event)')
  listEl.contentEditable=true
  listEl.setAttribute('onfocusout',`updateItem(${column},${index})`)
  
  columnEl.append(listEl);

}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  // console.log("onload",onLoad)
  console.log("comp",completeListArray.length);
  if(!JSON.parse(localStorage.getItem("onLoad")))getSavedColumns()
  // onLoad=true
  backlogList.textContent=''
  // Backlog Column
  backlogListArray.forEach((backlogItem,idx)=>{
    createItemEl(backlogList,0,backlogItem,idx)
  });
  
  // Progress Column
  progressList.textContent=''
  progressListArray.forEach((progressItem,idx)=>{
    createItemEl(progressList,1,progressItem,idx)
  });
  
  // Complete Column
  completeList.textContent=''
  completeListArray.forEach((completeItem,idx)=>{
    createItemEl(completeList,2,completeItem,idx)
  });
  
  // On Hold Column
  onHoldList.textContent=''
  onHoldListArray.forEach((onHoldItem,idx)=>{
   
    createItemEl(onHoldList,3,onHoldItem,idx)
  });
  
  // Run getSavedColumns only once, Update Local Storage
  localStorage.setItem("onLoad",true);
  updateSavedColumns()
}
updateDOM()

// update the item  if ncesessary delete the item also

function updateItem(col,idx){

  const updateParticularColumn=itemLists[col]
  const updateParticularItem = updateParticularColumn.children[idx]

  if (!draggable){

    // console.log(updateParticularColumn)
    // console.log(updateParticularItem)
    listArray[col][idx]=updateParticularItem.textContent
    if(!updateParticularItem.textContent){
       updateParticularItem.remove()
       listArray[col].splice(idx,1)
    }
    updateDOM()
    socket.emit("update-trello",listArray);
  }
}


// adding item to col
function addItemtoColumn(col){
  
  const itemText = addItems[col].value;
  listArray[col].push(itemText);
  addItems[col].value = '';
  console.log("list Array",listArray[col])
  updateDOM();
  socket.emit('update-trello',listArray)
  
}

// Show Input Box

function showInputBox(col){

    addBtns[col].style.visibility='hidden';
    saveItemBtns[col].style.display='flex';
    addItemContainers[col].style.display='flex'
}

// hide input box

function hideInputBox(col){

  addBtns[col].style.visibility='visible';
  saveItemBtns[col].style.display='none';
  addItemContainers[col].style.display='none'
  addItemtoColumn(col)
}


function updateArray(){
  
  
  backlogListArray.splice(0,);
  completeListArray.splice(0,);
  onHoldListArray.splice(0,);
  progressListArray.splice(0,);

  
  Array.from(backlogList.children).forEach(listElement=>{
    backlogListArray.push(listElement.textContent)
  });

  Array.from(completeList.children).forEach(listElement=>{
    completeListArray.push(listElement.textContent)
  });

  Array.from(onHoldList.children).forEach(listElement=>{
    
    onHoldListArray.push(listElement.textContent)
  });

  Array.from(progressList.children).forEach(listElement=>{
    progressListArray.push(listElement.textContent)
  });

  // console.log(backlogListArray)
  updateDOM()
  
}

// when item get dragged

function drag(event){
  draggableItem=event.target;
  localStorage.setItem("onLoad",true);
  draggable=true;
}
// when Item is dragged over 

function allowDrop(event){
  event.preventDefault()
}
// when item enter a particular coloumn
function dragEnter(col){
 
  itemLists[col].classList.add('over');
  
  currentColumn=col
}

function dropItem(event){
  event.preventDefault()
  itemLists.forEach((col)=>col.classList.remove('over'))
  let parent = itemLists[currentColumn]
  parent.append(draggableItem)
  draggable=false
  updateArray()
  socket.emit("update-trello",listArray);
}

socket.on("trello",message=>{
  console.log("message",message);
  listArray=message;
  updateSavedColumns()
  updateDOM()
})







