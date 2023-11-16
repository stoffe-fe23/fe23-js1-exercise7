
function addHeading(type, headingText, level=2) {
    const heading = document.createElement(type);
    heading.innerText = headingText;
    heading.classList.add(level == 1 ? "heading-1" : "heading-2");
    document.body.appendChild(heading);
}

function addStatus(text) {
    const statusElem = document.querySelector("#part-1 h2");
    statusElem.innerHTML += `<div>${text}</div>`;
}

//////////////////////////////////////////////////////////////////////////////////
// CLICK

let h1Elem = document.querySelector("#part-1 h1");
h1Elem.addEventListener("click", (evt) => {
    console.log("H1 clicked!");
    addStatus("H1 clicked!");
});

let pElem = document.querySelector("#part-1 p");
pElem.addEventListener("click", (evt) => {
    console.log("P clicked!");
    addStatus("P clicked!");
});

let buttonElem = document.querySelector("#part-1 button");
buttonElem.addEventListener("click", (evt) => {
    console.log("Button clicked!");
    addStatus("Button clicked!");
});

const h2Elem = document.querySelector("#part-1 h2");
h2Elem.addEventListener("click", (evt) => {
    h2Elem.innerHTML = "";
})

//////////////////////////////////////////////////////////////////////////////////
// MOUSEENTER / MOUSELEAVE


h1Elem = document.querySelector("#part-2 h1");

h1Elem.addEventListener("mouseenter", (evt) => {
    console.log("H1 entered!");
    const popup = document.querySelector("h1 + .info-popup");
    popup.innerText = "Muspekaren är över H1!";
    console.log(popup.style.top, evt.target.offsetTop);
    popup.classList.add("info-popup-show");
});

h1Elem.addEventListener("mouseleave", (evt) => {
    console.log("H1 left!");
    const popup = document.querySelector("h1 + .info-popup");
    popup.classList.remove("info-popup-show");
});

pElem = document.querySelector("#part-2 p");
pElem.addEventListener("mouseenter", (evt) => {
    console.log("P entered!");
    console.dir(evt.target);
    evt.target.classList.add("highlight");
});

pElem.addEventListener("mouseleave", (evt) => {
    console.log("P left!");
    console.dir(evt.target);
    evt.target.classList.remove("highlight");
});

buttonElem = document.querySelector("#part-2 button");
buttonElem.addEventListener("mouseenter", (evt) => {
    console.log("Button entered!");
    evt.target.innerText = "OK";
});

buttonElem.addEventListener("mouseleave", (evt) => {
    console.log("Button left!");
    evt.target.innerText = "Skicka";
});

//////////////////////////////////////////////////////////////////////////////////
// MOUSEMOVE


document.body.addEventListener("mousemove", (evt) => {
    const outX = document.querySelector("#pos-x");
    const outY = document.querySelector("#pos-y");
    const pElem = document.querySelector("#part-1 p");
    

    const bgBrightness = 100 - ((evt.clientY / document.body.clientHeight) * 100);
    const pHue = (evt.clientX / document.body.clientWidth) * 360;
    
    document.body.style.backgroundColor = `hsl(60, 25%, ${bgBrightness}%)`;
    pElem.style.backgroundColor = `hsl(${pHue}, 50%, 50%)`;    

    outX.innerText = `X: ${evt.clientX}`;
    outY.innerText = `Y: ${evt.clientY}`;
});

//////////////////////////////////////////////////////////////////////////////////
// FORM
addHeading("div", "Form - skapa element");

const formEle = document.createElement("form");
formEle.id = "form-1";

const formInput = document.createElement("input");
formInput.type = "text";

const formButton = document.createElement("button");
formButton.innerText = "Skapa Heading";

formEle.appendChild(formInput);
formEle.appendChild(formButton);
document.body.appendChild(formEle);

formButton.addEventListener("click", (evt) => {
    const formInput = document.querySelector("#form-1 input");
    const newHeading = document.createElement("h3");
    newHeading.innerText = formInput.value;

    document.body.appendChild(newHeading);

    evt.preventDefault();
});

//////////////////////////////////////////////////////////////////////////////////
addHeading("div", "Form - Lägg till lista");

const formListEle = document.createElement("form");
formListEle.id = "form-2";

const formListTextLabel = document.createElement("label");
formListTextLabel.for = "list-text";
formListTextLabel.innerText = "Visa text";

const formListText = document.createElement("input");
formListText.id = "list-text";
formListText.type = "text";


const formListNumLabel = document.createElement("label");
formListNumLabel.for = "list-amount";
formListNumLabel.innerText = "Antal:";

const formListNum = document.createElement("input");
formListNum.type = "number";
formListNum.id = "list-amount";


const formListButton = document.createElement("button");
formListButton.innerText = "Skapa Lista";

const listContainer = document.createElement("ol");
listContainer.id = "list-output";


formListEle.appendChild(formListTextLabel);
formListEle.appendChild(formListText);
formListEle.appendChild(formListNumLabel);
formListEle.appendChild(formListNum);
formListEle.appendChild(formListButton);
document.body.appendChild(formListEle);
document.body.appendChild(listContainer);

formListButton.addEventListener("click", (evt) => {
    const itemsCount = document.querySelector("#list-amount").value;
    const itemsText = document.querySelector("#list-text").value;

    const listOutput = document.querySelector("#list-output");

    console.log(itemsCount, itemsText, listOutput);

    for (let i = 0; i < itemsCount; i++) {
        const newItem = document.createElement("li");
        newItem.innerText = itemsText;
        listOutput.appendChild(newItem);
    }

    evt.preventDefault();
});

//////////////////////////////////////////////////////////////////////////////////
addHeading("div", "Form - Handlingslista");


const shoppingForm = document.createElement("form");
shoppingForm.id = "form-shopping";

const shoppingItemLabel = document.createElement("label");
shoppingItemLabel.for = "shopping-item";
shoppingItemLabel.innerText = "Produkt";

const shoppingItem = document.createElement("input");
shoppingItem.id = "shopping-item";
shoppingItem.type = "text";
shoppingItem.style.width = "60ch";

const shoppingAmountLabel = document.createElement("label");
shoppingAmountLabel.for = "shopping-amount";
shoppingAmountLabel.innerText = "Antal:";

const shoppingAmount = document.createElement("input");
shoppingAmount.type = "number";
shoppingAmount.id = "shopping-amount";
shoppingAmount.style.width = "6ch";
shoppingAmount.min = "0";
shoppingAmount.max = "10";
shoppingAmount.value = "1";

const shoppingButton = document.createElement("button");
shoppingButton.innerText = "Lägg till";

shoppingForm.appendChild(shoppingItemLabel);
shoppingForm.appendChild(shoppingItem);
shoppingForm.appendChild(shoppingAmountLabel);
shoppingForm.appendChild(shoppingAmount);
shoppingForm.appendChild(shoppingButton);
document.body.appendChild(shoppingForm);

const shoppingList = document.createElement("div");
const shoppingListTitle = document.createElement("h3");
shoppingList.appendChild(shoppingListTitle);
document.body.appendChild(shoppingList);

shoppingList.id = "shopping-list";
shoppingListTitle.innerText = "Handlingslista";

shoppingButton.addEventListener("click", (evt) => {
    const itemInput = document.querySelector("#shopping-item");
    const countInput = document.querySelector("#shopping-amount")
    const itemsCount = countInput.value;
    const itemsText = itemInput.value;
    const listOutput = document.querySelector("#shopping-list");

    const newItem = document.createElement("div");
    newItem.innerHTML = `${itemsCount}st <strong>${itemsText}</strong>`;
    newItem.style.backgroundColor = `hsl(${itemsCount * 36}, 50%, 80%)`;
    listOutput.appendChild(newItem);

    newItem.addEventListener("click", removeShoppingItem);

    itemInput.focus();
    itemInput.value = "";
    countInput.value = "1";
    evt.preventDefault();
});


function removeShoppingItem(evt) {
    evt.currentTarget.remove();
}


//////////////////////////////////////////////////////////////////////////////////
addHeading("div", "Logga random (konsoll)");

console.log("0-99", Math.floor(Math.random() * 100));
console.log("0-29", Math.floor(Math.random() * 30));
console.log("30-99", Math.floor(30 + Math.random() * 70));
console.log("4-10", 4 + Math.floor(Math.random() * 7));

const colors = ["hotpink", "skyblue", "violet", "lightgreen",  "orange"];
const idx = Math.floor(Math.random() * colors.length );
console.log("Color", colors[idx]);


//////////////////////////////////////////////////////////////////////////////////
addHeading("div", "Random events");

const colorElement = document.createElement("div");
const colorButton = document.createElement("button");

colorButton.innerText = "Ändra färg";
colorElement.innerText = colors[0];
colorElement.id = "random-colorbox";
colorElement.style.backgroundColor = colors[0];

document.body.appendChild(colorButton);
document.body.appendChild(colorElement);

colorButton.addEventListener("click", (evt) => {
    const idx = Math.floor(Math.random() * colors.length );
    colorElement.innerText = colors[idx];
    colorElement.style.backgroundColor = colors[idx];
});

colorElement.addEventListener("click", (evt) => {
    document.body.style.backgroundColor = evt.currentTarget.innerText;
});