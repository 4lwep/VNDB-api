const placeVnListInSearch = (data) => {
  /*title, image, image.sexual, length, developers?*/
  let vnSearchList = document.getElementById("vnSearchList");

  vnSearchList.innerHTML = "";

  data.results.forEach((vn) => {
    if (vn.image && vn.image.sexual < 1) {
      let vnSearchEntry = document.createElement("div");
      vnSearchEntry.className = "vn-search-entry";
      let vnPic = document.createElement("img");
      vnPic.src = vn.image.thumbnail;
      let vnTitle = document.createElement("h4");
      vnTitle.textContent = vn.title;

      vnSearchEntry.appendChild(vnPic);
      vnSearchEntry.appendChild(vnTitle);

      vnSearchList.appendChild(vnSearchEntry);
    }
  });
};

const placeVnList = (data) => {
  let info = document.getElementById("infoSection");
  let vnList = document.createElement("div");
  vnList.className = "vn-list";
  vnList.id = "vnList";

  data.results.forEach((vn) => {
    if (vn.image && vn.image.sexual < 1) {
      let vnLenghtDesc;
      switch (vn.length) {
        case 1:
          vnLenghtDesc = "Muy corta";
          break;
        case 2:
          vnLenghtDesc = "Corta";
          break;
        case 3:
          vnLenghtDesc = "Media";
          break;
        case 4:
          vnLenghtDesc = "Larga";
          break;
        case 5:
          vnLenghtDesc = "Muy larga";
          break;
        default:
          vnLenghtDesc = "Indeterminada";
      }

      let vnCard = document.createElement("div");
      vnCard.className = "vn-card";

      let imageAndInfo = document.createElement("div");
      imageAndInfo.className = "image-and-info";
      let vnPic = document.createElement("img");
      vnPic.src = vn.image.thumbnail;
      let imageContainer = document.createElement("div");
      imageContainer.className = "image-container";
      let vnLenght = document.createElement("p");
      vnLenght.textContent = `Duración: ${vnLenghtDesc}`;
      let vnRating = document.createElement("p");
      vnRating.textContent = `Puntuación: ${vn.rating}`;
      let vnReleased = document.createElement("p");
      vnReleased.textContent = `Lanzamiento: ${vn.released}`;

      let titleAndDescription = document.createElement("div");
      titleAndDescription.className = "title-and-description";
      let vnTitle = document.createElement("h4");
      vnTitle.textContent = vn.title;
      let descriptionContainer = document.createElement("div");
      descriptionContainer.className = "description-container";
      let vnDescription = document.createElement("p");
      vnDescription.textContent = vn.description;

      vnCard.appendChild(imageAndInfo);
      vnCard.appendChild(titleAndDescription);

      imageAndInfo.appendChild(imageContainer);
      imageContainer.appendChild(vnPic);
      imageAndInfo.appendChild(document.createElement("hr"));
      imageAndInfo.appendChild(vnLenght);
      imageAndInfo.appendChild(vnRating);
      imageAndInfo.appendChild(vnReleased);

      titleAndDescription.appendChild(vnTitle);
      titleAndDescription.appendChild(document.createElement("hr"));
      titleAndDescription.appendChild(descriptionContainer);
      descriptionContainer.appendChild(vnDescription);

      vnList.appendChild(vnCard);

      info.appendChild(vnList);
    }
  });
};
