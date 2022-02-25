document.addEventListener("DOMContentLoaded", () => {
  let dogCollection = [];
  getRequest();
  let dogId;
  let dogForm = document.querySelector("#dog-form");
  // console.log(nameInput)

  function getRequest() {
    fetch("http://localhost:3000/dogs")
      .then((resp) => resp.json())
      .then((data) => {
        dogCollection = data;
        renderDogs(dogCollection);
      });
  }

  function renderDogs(dogCollection) {
    const table = document.querySelector("#table-body");
    console.log(table);
    return (table.innerHTML = dogCollection.map(renderDog).join(""));
  }

  function renderDog(dog) {
    return `
    <tr id="${dog.id}" >
        <td id="dog-name">${dog.name}</td>
        <td id="dog-breed">${dog.breed}</td>
        <td id="dog-sex">${dog.sex}</td>
        <td><button id="${dog.id}" name="edit-button">Edit</button> </td>
    </tr>`;
  }

  document.addEventListener("click", (e) => {
    let dogForm = document.querySelector("#dog-form");
    if (e.target.name === "edit-button") {
      dogId = e.target.id;
      console.log(e.target.parentNode.parentNode.children[0].textContent);
      dogForm.name.value =
        e.target.parentNode.parentNode.children[0].textContent;
      dogForm.breed.value =
        e.target.parentNode.parentNode.children[1].textContent;
      dogForm.sex.value =
        e.target.parentNode.parentNode.children[2].textContent;
    }
  });

  dogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(dogId);
    const dogName = e.target.name.value;
    const dogBreed = e.target.breed.value;
    const dogSex = e.target.sex.value;
    postDogs(dogName, dogBreed, dogSex);
  });

  function postDogs(dogName, dogBreed, dogSex) {
    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: dogName,
        breed: dogBreed,
        sex: dogSex,
      }),
    })
      .then((response) => response.json())
      //   .then((data) => getRequest());
      .then((data) => {
        data.id;
        let currentDog = dogCollection.find((dog) => dog.id === data.id);
        currentDog = { ...dog };
      });
  }
});

// document.addEventListener("DOMContentLoaded", () => {
//   let dogCollection = [];
//   getRequest();
//   let dogId;
//   let dogForm = document.querySelector("#dog-form");
//   // console.log(nameInput)

//   function getRequest() {
//     fetch("http://localhost:3000/dogs")
//       .then((resp) => resp.json())
//       .then((data) => {
//         dogCollection = data;
//         renderDogs(dogCollection);
//       });
//   }

//   function renderDogs(dogCollection) {
//     const table = document.querySelector("#table-body");
//     console.log(table);
//     return (table.innerHTML = dogCollection.map(renderDog).join(""));
//   }

//   function renderDog(dog) {
//     return `
//     <tr id="${dog.id}" >
//         <td id="dog-name">${dog.name}</td>
//         <td id="dog-breed">${dog.breed}</td>
//         <td id="dog-sex">${dog.sex}</td>
//         <td><button id="${dog.id}" name="edit-button">Edit</button> </td>
//     </tr>`;
//   }

//   document.addEventListener("click", (e) => {
//     let dogForm = document.querySelector("#dog-form");
//     if (e.target.name === "edit-button") {
//       dogId = e.target.id;
//       console.log(e.target.parentNode.parentNode.children[0].textContent);
//       dogForm.name.value =
//         e.target.parentNode.parentNode.children[0].textContent;
//       dogForm.breed.value =
//         e.target.parentNode.parentNode.children[1].textContent;
//       dogForm.sex.value =
//         e.target.parentNode.parentNode.children[2].textContent;
//     }
//   });

//   // function dogFormListener () {
//   //     let dogForm = document.querySelector('#dog-form')
//   dogForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log(dogId);
//     const dogName = e.target.name.value;
//     const dogBreed = e.target.breed.value;
//     const dogSex = e.target.sex.value;
//     postDogs(dogName, dogBreed, dogSex);
//   });

//   function postDogs(dogName, dogBreed, dogSex) {
//     fetch(`http://localhost:3000/dogs/${dogId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         name: dogName,
//         breed: dogBreed,
//         sex: dogSex,
//       }),
//     })
//       .then((response) => response.json())
//     //   .then((data) => getRequest());
//     .then(data => {
//         data.id
//         let currentDog = dogCollection.find(dog => dog.id === data.id)
//         currentDog = {...dog}
//     })
//   }
// });
// //end of DOMContentLoaded
