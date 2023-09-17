const draggable_list = document.getElementById("draggable-list"); //ul
const check = document.getElementById("check"); //Check button

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
  const header = document.getElementById("title");
  const bodyBackground = document.getElementById("body");

  header.innerHTML = topics[chosenQuiz].header;
  document.body.style.backgroundImage = topics[chosenQuiz].img;
  fixedBackground();

  draggable_list.innerHTML = "";
  listItems = [];
  console.log(topics[chosenQuiz], topics, chosenQuiz);

  [...topics[chosenQuiz].list]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((item, index) => {
      const listItem = document.createElement("li");

      // listItem.classList.add("over"); //check

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
      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart'); //check
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  //console.log("Event: ", "dragenter"); //check
  this.classList.add("over");
}

function dragLeave() {
  //console.log("Event: ", "dragleave"); //check
  this.classList.remove("over");
}

function dragOver(e) {
  //console.log("Event: ", "dragover"); //check
  e.preventDefault();
}

function dragDrop() {
  //console.log("Event: ", "drop"); //check
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  console.log("swap");
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");
  console.log(itemOne, itemTwo);

  listItems[fromIndex].querySelector(".container-li").appendChild(itemTwo);
  listItems[toIndex].querySelector(".container-li").appendChild(itemOne);
}

function nextQuiz() {
  // Remove the current quiz from the array
  topics.splice(chosenQuiz, 1);
  if (topics.length > 0) {
    console.log("next quiz");
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
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== topics[chosenQuiz].list[index]) {
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

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
