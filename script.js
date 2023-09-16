const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const topFive = [
  ["Phython", "JavaScript", "Java", "C#", "TypeScript"],
  ["GTA 5", "League of Legends", "CS:GO", "Valorant", "COD: Warzone"],
  ["Elon Musk", "Jeff Bezos", "Bill Gates", "Mark Zuckerberg", "Warren Buffett"],
  ["Google", "Youtube", "Facebook", "Twitter", "Instagram"],
];

// Store list items
const chosenQuiz = Math.floor(Math.random() * topFive.length);
// const chosenQuiz = 4;
const listItems = [];
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

  switch (chosenQuiz) {
    case 0:
      header.innerHTML = `Top 5 Most Popular Programming Languages (2022 Q3)`;
      document.body.style.backgroundImage = "url('img/hacker.jpg')";
      fixedBackground();
      //https://www.youtube.com/watch?v=qQXXI5QFUfw
      break;
    case 1:
      header.innerHTML = `Top 5 Most Watched Streamed Games (2022 Q4)`;
      document.body.style.backgroundImage = "url('img/games.jpg')";
      fixedBackground();
      break;
    //https://www.youtube.com/watch?v=KS2z2y7Ah7Y
    case 2:
      header.innerHTML = `Top 5 Richest People in he World (2023 Q1)`;
      document.body.style.backgroundImage = "url('img/money.jpg')";
      fixedBackground();
      // https://www.youtube.com/watch?v=MY-5HKkGIIs
      break;
    case 3:
      header.innerHTML = `Top 5 Most Popular Websites (2022 Q3)`;
      document.body.style.backgroundImage = "url('img/web.jpg')";
      fixedBackground();
      //https://www.youtube.com/watch?v=Ko8Pz4Y-tYo
      break;
    default:
      header.innerHTML = `Top 5 Sorting Game`;
  }

  [...topFive[chosenQuiz]]
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
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  //console.log("Event: ", "dragenter");
  this.classList.add("over");
}

function dragLeave() {
  //console.log("Event: ", "dragleave");
  this.classList.remove("over");
}

function dragOver(e) {
  //console.log("Event: ", "dragover");
  e.preventDefault();
}

function dragDrop() {
  //console.log("Event: ", "drop");
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].querySelector(".container-li").appendChild(itemTwo);
  listItems[toIndex].querySelector(".container-li").appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
  let correct = 0;
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== topFive[chosenQuiz][index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
      correct++;
    }
  });

  tries++;

  // Use setTimeout to delay the alert
  setTimeout(() => {
    if (correct === 5) {
      alert(`You got it right in ${tries} tries!`);

      // Remove the current quiz from the array
      topFive.splice(chosenQuiz, 1);

      if (topFive.length > 0) {
        // If there are more quizzes, select a random index for the next quiz
        chosenQuiz = Math.floor(Math.random() * topFive.length);
        location.reload(); // Reloads the Page with the new quiz
      } else {
        // If there are no more quizzes, display a message
        alert("You have solved all the quizzes! Congrats!");
      }
    }
  }, 100); // Adjust the delay (in milliseconds) as needed
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
