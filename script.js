const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const topFive = [
  ["Phython", "C#", "C++", "JavaScript", "PHP"],
  ["PUBG", "CS:GO", "Minecraft", "Fortnite", "DOTA 2"],
  ["Elon Musk", "Jeff Bezos", "Bill Gates", "Mark Zuckerberg", "Warren Buffett"],
];

// Store list items
const chosenQuiz = Math.floor(Math.random() * topFive.length);
const listItems = [];
let dragStartIndex;

createList();

//Insert List Items into DOM
function createList() {
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
