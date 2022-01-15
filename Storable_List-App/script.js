const draggableList = document.querySelector('#draggable-list');
const btnCheck = document.querySelector("#check");

const richestPople = [
    "Jeff Bezos",
    "Elon Musk",
    "Bernard Arnault",
    "Bill Gates",
    "Mark Zuckerberg",
    "Warren Buffett",
    "Larry Ellison",
    "Larry Page",
    "Sergey Brin",
    "Mukesh Ambani",
];

const listItems = [];

function createList(){
    [...richestPople]
        .map(a=> ({value:a, sort:Math.random()}))
        .sort((a,b) => a.sort-b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            // console.log(person,index);
            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                    <span class="number">${index +1}</span>
                    <div class="draggable" draggable="true">
                        <p class="person-name">${person}</p>
                        <i class="fas fa-grip-lines"></i>
                    </div>
            `;

            listItems.push(listItem);
            draggableList.appendChild(listItem);
        });
    addEventListener();
}

createList();
// console.log(listItems);
let dragStartIndex;

function dragStart(){
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
}
function dragOver(e){
    // console.log('Event: ', 'dragover');
    e.preventDefault();
}
function dragDrop(){
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}
function dragEnter(){
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
}
function dragLeave(){
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
}

function swapItems(startIndex, endIndex){
    // console.log(indexStart, indexEnd);
    const itemOne = listItems[startIndex].querySelector('.draggable');
    const itemTwo = listItems[endIndex].querySelector('.draggable');

    listItems[startIndex].appendChild(itemTwo);
    listItems[endIndex].appendChild(itemOne);
}

function checkOrder(){
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if(personName!== richestPople[index]){
            listItem.classList.add('wrong');
        }else{
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

function addEventListener(){
    const draggable = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggable.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
};

btnCheck.addEventListener('click', checkOrder);