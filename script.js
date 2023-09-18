const draggable_list = document.getElementById("draggable-list"); //ul
const check = document.getElementById("check"); //Check button

//Source: https://www.youtube.com/@DataIsBeautifulOfficial/videos
const topics = [
  {
    list: ["Phython", "JavaScript", "Java", "C#", "TypeScript"],
    header: "Top 5 Most Popular Programming Languages (2022 Q3)",
    img: 'url("img/hacker.jpg")',
  },
  {
    list: ["GTA 5", "League of Legends", "CS:GO", "Valorant", "COD: Warzone"],
    header: "Top 5 Most Watched Streamed Games (2022 Q4)",
    img: 'url("img/games.jpg")',
  },
  {
    list: ["Elon Musk", "Jeff Bezos", "Bill Gates", "Mark Zuckerberg", "Warren Buffett"],
    header: "Top 5 Richest People in he World (2023 Q1)",
    img: 'url("img/money.jpg")',
  },
  {
    list: ["Google", "Youtube", "Facebook", "Twitter", "Instagram"],
    header: "Top 5 Most Popular Websites (2022 Q3)",
    img: 'url("img/web.jpg")',
  },
];

// Store list items
let listItems = [];
let chosenQuiz = Math.floor(Math.random() * topics.length);
let dragStartIndex;
let tries = 0;

createList();

function fixedBackground() {
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundSize = "cover";
}

//Insert List Items into DOM
function createList() {
  //Capturing the header
  const header = document.getElementById("title");

  //Changing the header and body background depending on the quiz
  header.innerHTML = topics[chosenQuiz].header;
  document.body.style.backgroundImage = topics[chosenQuiz].img;
  fixedBackground(); //Prevent picture duplication

  /*Clears any previous content within the HTML element with the ID "draggable-list." 
  This is done to prepare for the creation of a new list. */
  draggable_list.innerHTML = "";
  listItems = []; //stores the new list items

  // console.log(topics[chosenQuiz], topics, chosenQuiz); //Check

  [...topics[chosenQuiz].list]
    //Create a new array object with a value and a random number. The random number is used to shuffle the array.
    .map((a) => ({ value: a, sort: Math.random() }))
    //Randomize the order of the array
    .sort((a, b) => a.sort - b.sort)
    //used to extract the value from the array
    .map((a) => a.value)
    .forEach((item, index) => {
      //iterates through the shuffled items and creates a list item (<li>) for each item.
      const listItem = document.createElement("li"); //Creating li

      //store original index. track the order of the list items. Use for drag and drop functionality
      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
      <div class="container-li">
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="item-name">${item}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      </div>
      `;
      listItems.push(listItem); //Pushing the li item to the listItems array
      draggable_list.appendChild(listItem); //Appending the li item to the ul
    });

  addEventListeners();
}

//Capture the starting index
function dragStart() {
  console.log("Event: ", "dragstart"); //check
  dragStartIndex = +this.closest("li").getAttribute("data-index"); //Getting the number index of the li
  // console.log(dragStartIndex); //Check
}

//to manage visual feedback during the drag operation
// function dragEnter() {
//   console.log("Event: ", "dragenter"); //check
//   this.classList.add("over"); //this refers to the current list item element
// }

function dragLeave() {
  console.log("Event: ", "dragleave"); //check
  this.classList.remove("over"); //Removes CSS background color
}
function dragOver(e) {
  console.log("Event: ", "dragover"); //check
  this.classList.add("over");
  e.preventDefault();
}

//When an item is dropped, the dragDrop function is called to swap the positions of the dragged item and the target item
function dragDrop() {
  //console.log("Event: ", "drop"); //check
  const dragEndIndex = +this.getAttribute("data-index"); //this refers to the current list item element
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable"); //Draggable class we created inside createList()
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart); //Capture the starting index
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    // item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

//swap the positions of two items in the listItems array
function swapItems(fromIndex, toIndex) {
  // console.log("swap"); //Check
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");
  //console.log(itemOne, itemTwo); //Check

  listItems[fromIndex].querySelector(".container-li").appendChild(itemTwo);
  listItems[toIndex].querySelector(".container-li").appendChild(itemOne);
}

function nextQuiz() {
  // Remove the current quiz from the array
  topics.splice(chosenQuiz, 1);
  if (topics.length > 0) {
    // console.log("next quiz"); //Check
    // If there are more quizzes, select a random index for the next quiz
    chosenQuiz = Math.floor(Math.random() * topics.length);
    tries = 0;
    createList();
  } else {
    // If there are no more quizzes, display a message
    alert("You have solved all the quizzes! Congrats! Now closing the tab...");
    setTimeout(() => {
      window.close(); // Close the current tab (window)
    }, 100);
  }
}

// Check the order of list items
function checkOrder() {
  let correct = 0;
  listItems.forEach((listItem, index) => {
    const itemName = listItem.querySelector(".draggable").innerText.trim();

    if (itemName !== topics[chosenQuiz].list[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
      correct++;
    }
  });

  tries++;

  if (correct === 5) {
    setTimeout(() => {
      alert(`You got it right in ${tries} tries!`);
      nextQuiz();
    }, 100);
  }
}

check.addEventListener("click", checkOrder);
