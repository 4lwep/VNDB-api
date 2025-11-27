const placeVnListInSearch = (data) => {
  /*title, image, image.sexual, length, developers?*/
  let vnSearchList = document.getElementById("vnSearchList");

  vnSearchList.innerHTML = "";

  data.results.forEach((vn) => {
    if (vn.image.sexual < 1) {
      let vnSearchEntry = document.createElement("div");
      vnSearchEntry.className = "vn-search-entry";
      let vnPic = document.createElement("img");
      vnPic.src = vn.image.thumbnail;
      /*if (vn.image.sexual >= 1 && !explicit) {
        vnPic.className = "explicit-img";
      }*/
      let vnTitle = document.createElement("h4");
      vnTitle.textContent = vn.title;
      let vnLenght = document.createElement("p");
      vnLenght.textContent = vn.length;

      vnSearchEntry.appendChild(vnPic);
      vnSearchEntry.appendChild(vnTitle);
      vnSearchEntry.appendChild(vnLenght);

      vnSearchList.appendChild(vnSearchEntry);
    }
  });
};

const placeVnList = (data) => {
  /*title, image, image.sexual, length, developers?*/
  let vnList = document.getElementById("vnList");

  vnList.innerHTML = "";

  data.results.forEach((vn) => {
    if (vn.image.sexual < 1) {
      let vnCard = document.createElement("div");
      vnCard.className = "vn-card";
      let vnPic = document.createElement("img");
      vnPic.src = vn.image.thumbnail;
      /*if (vn.image.sexual >= 1 && !explicit) {
        vnPic.className = "explicit-img";
      }*/
      let vnTitle = document.createElement("h4");
      vnTitle.textContent = vn.title;
      let vnLenght = document.createElement("p");
      vnLenght.textContent = vn.length;

      vnCard.appendChild(vnPic);
      vnCard.appendChild(vnTitle);
      vnCard.appendChild(vnLenght);

      vnList.appendChild(vnCard);
    }
  });
};
