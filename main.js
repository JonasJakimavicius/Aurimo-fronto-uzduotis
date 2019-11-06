let cards_array = [
  {
    id: 1,
    "card-name": "Pilsner",
    "card-img": "img/bokalas.png",
    "card-info": "  Lorem ipsum dolor sit amet consectetur adipisicing elit."
  },
  {
    id: 2,
    "card-name": "Blanc",
    "card-img": "img/kronenburg.png",
    "card-info": "  Lorem ipsum dolor sit amet consectetur adipisicing elit."
  },
  {
    id: 3,
    "card-name": "Eriksberg",
    "card-img": "img/eriksberg.png",
    "card-info": "  Lorem ipsum dolor sit amet consectetur adipisicing elit."
  },
  {
    id: 4,
    "card-name": "Carlsberg",
    "card-img": "img/calsberg.png",
    "card-info": "  Lorem ipsum dolor sit amet consectetur adipisicing elit."
  }
];

let cardsContainer = document.querySelector(".cards-container");
let updateFormContainer = document.querySelector(".update-form-container");
let nextID =cards_array.length + 1;

function renderCards(cards_array) {
  cardsContainer.innerHTML = "";
  cards_array.forEach(card => {
    // zemiau, sukuriami tag'ai
    let cardContainer = document.createElement("div");
    let cardImgContainer = document.createElement("div");
    let cardImg = document.createElement("img");
    let cardName = document.createElement("div");
    let cardInfo = document.createElement("div");
    // tag'ai sukisami vienas i kita
    cardContainer.appendChild(cardImgContainer);
    cardImgContainer.appendChild(cardImg);
    cardContainer.appendChild(cardName);
    cardContainer.appendChild(cardInfo);
    // zemiau, tag'ams prisikiriamos reikalingos klases
    cardContainer.className = "card-container";
    cardImgContainer.className = "card-img-container";
    cardImg.className = "card-img";
    cardName.className = "card-name";
    cardInfo.className = "card-info";
    // zemiau, surasomas tag'u turinys
    cardImg.src = card["card-img"];
    cardName.innerHTML = `${card["card-name"]}`;
    cardInfo.innerHTML = `${card["card-info"]}`;

    cardsContainer.appendChild(cardContainer);

    // zemiau sukuriami mygtukai
    let deleteBtn = document.createElement("button");
    let updateBtn = document.createElement("button");
    let addBtn=document.createElement("button");
    let buttonContainer=document.createElement("button");
    //zemiau mygtukams uzdedamos klases
    deleteBtn.className = "delete-btn";
    updateBtn.className = "update-btn";
    addBtn.className="add-btn"
    buttonContainer.className="button-container"
    //zemiau, mygtukai prisegami prie korteles
    buttonContainer.appendChild(deleteBtn);
    buttonContainer.appendChild(updateBtn);
    buttonContainer.appendChild(addBtn);
    cardContainer.appendChild(buttonContainer);
    //zemiau mygtukams sukuriamas turinys
    deleteBtn.innerHTML = "Delete";
    updateBtn.innerHTML = "Update";
    addBtn.innerHTML="Add"

    let index = cards_array.map(p => p.id).indexOf(card.id);

    //zemiau funkcija paspaudus delete mygtuka istrina ta elementa
    deleteBtn.addEventListener("click", function() {
      cards_array.splice(index, 1);
      renderCards(cards_array);
    });

    /**
     * Update funkcija
     */
    updateBtn.addEventListener("click", function() {
      updateFormContainer.innerHTML = "";
      renderForm();
      let updateForm = document.querySelector("form");
      const formInputs = Array.from(updateForm.elements).slice(0, -1);
      formInputs.forEach(
        input => (input.value = cards_array[index][input.name])
      );
      updateForm.addEventListener("submit", updateDrinks);
      updateForm.setAttribute("card-index", index);
    });


    addBtn.addEventListener("click", function(){
        let updateFormContainer = document.querySelector(".update-form-container");
        
        updateFormContainer.innerHTML = "";
        renderForm();
        let updateForm = document.querySelector("form");
        updateForm.addEventListener("submit",addDrink);
        })

    })
  };


function updateDrinks(event) {
  event.preventDefault();
  let updateForm = document.querySelector("form");
  let index = updateForm.getAttribute("card-index");
  const formInputs = Array.from(updateForm.elements).slice(0, -1);
  formInputs.forEach(input => {
    cards_array[index][input.name] = input.value;
    input.value = "";
  });
  updateForm.setAttribute("card-index", "");
  updateFormContainer.innerHTML = "";
  renderCards(cards_array);
}

function createDataObject(){
    event.preventDefault();
    let newDataObject = { id: nextID++ };
    let updateForm = document.querySelector("form");
    const formInputs = Array.from(updateForm.elements).slice(0, -1);
    formInputs.forEach(input => {
        console.log(input)
      newDataObject[input.name] = isNaN(input.value) ? input.value : Number(input.value);
    });
    return newDataObject;
}




function addDrink(event){
    event.preventDefault();
    let newCardObject = createDataObject();
    cards_array.push(newCardObject);
    updateFormContainer.innerHTML = "";
    renderCards(cards_array);
}





function renderForm() {
  //sukuriu inputus ir forma
  let updateForm = document.createElement("form");
  let nameInput = document.createElement("input");
  let infoInput = document.createElement("input");
  let imageInput = document.createElement("input");

  //inputus appendinu i forma, o forma i konteineri
  updateFormContainer.appendChild(updateForm);
  updateForm.appendChild(nameInput);
  updateForm.appendChild(infoInput);
  updateForm.appendChild(imageInput);

  //inputams sudedu klases ir type'us

  nameInput.className = "name-input";
  infoInput.className = "info-input";
  imageInput.className = "image-input";
  nameInput.name = "card-name";
  infoInput.name = "card-info";
  imageInput.name = "card-img";
  nameInput.type = "text";
  infoInput.type = "text";
  imageInput.type = "text";
  nameInput.placeholder = "Name";
  infoInput.placeholder = "Info";
  imageInput.placeholder = "Image";

  //sukuriu buttona ir idedu ji i forma
  let saveUpdateBtn = document.createElement("button");
  updateForm.appendChild(saveUpdateBtn);
  saveUpdateBtn.className = "save-Btn";
  saveUpdateBtn.type = "submit";
  saveUpdateBtn.innerHTML = "Save";
}


renderCards(cards_array);
