const placeSearchResults = (searchList, searchName) => {
  if (searchName) {
    let search = document.getElementById("searchMenu");
    let info = document.getElementById("infoSection");

    info.innerHTML = "";

    let results = document.createElement("p");
    results.className = "search-info";
    results.textContent = `Resultados para la búsqueda: \"${searchName}\"`;
    info.appendChild(results);

    let divide = document.createElement("hr");
    info.appendChild(divide);

    let currentList = searchList;
    placeVnList(currentList);

    search.style = "display: none";

    return currentList;
  }
};

const placeSearchElementsInSearch = async (search) => {
  let currentSearchList;

  if (search) {
    currentSearchList = await searchVnByName(search);
    placeVnListInSearch(currentSearchList);
  }

  return currentSearchList;
};

const prepareSearch = async (currentSearch) => {
  let elements;
  let search = document.getElementById("searchMenu");
  search.style = "display: block";

  if (currentSearch) {
    elements = await placeSearchElementsInSearch(currentSearch);
  }

  return elements;
};

const placeTopVns = async () => {
  let info = document.getElementById("infoSection");

  info.innerHTML = "";

  let topVnsText = document.createElement("h1");
  topVnsText.className = "list-title";
  topVnsText.textContent = "Visual novels con mejor puntuación";
  info.appendChild(topVnsText);

  let divide = document.createElement("hr");
  info.appendChild(divide);

  let currentList = await getMostRatedVn();
  placeVnList(currentList);

  return currentList;
};

const placeLatestVns = async () => {
  let info = document.getElementById("infoSection");

  info.innerHTML = "";

  let topVnsText = document.createElement("h1");
  topVnsText.className = "list-title";
  topVnsText.textContent = "Últimos lanzamientos";
  info.appendChild(topVnsText);

  let divide = document.createElement("hr");
  info.appendChild(divide);

  let currentList = await getLatestVn();
  placeVnList(currentList);

  return currentList;
};

const showProfileInfo = async (data) => {
  let tagsInfo = document.createElement("div");
  let userInfoTitle = document.createElement("div");
  let userInfo = document.getElementById("userInfo");
  let username = document.createElement("h2");
  let welcomeText = document.getElementById("welcomeText");
  let logOutButton = document.createElement("button");

  userInfoTitle.className = "user-info-title";
  username.className = "username";

  username.textContent = data.username;
  userInfoTitle.appendChild(username);
  userInfoTitle.appendChild(document.createElement("hr"));

  userInfo.appendChild(userInfoTitle);

  tagsInfo.className = "tags-info";
  userInfo.appendChild(tagsInfo);

  let userLabels = await getUserLabels(data.id);
  let finishedId;
  let playingId;
  let droppedId;
  let wishlistId;

  userLabels.labels.forEach((label) => {
    switch (label.label) {
      case "Finished": {
        finishedId = label.id;
        break;
      }
      case "Playing": {
        playingId = label.id;
        break;
      }
      case "Dropped": {
        droppedId = label.id;
        break;
      }
      case "Wishlist": {
        wishlistId = label.id;
        break;
      }
    }
  });

  let finishedTag = document.createElement("p");
  finishedTag.textContent = `Terminadas (${(await getUserVnByLabel(data.id, finishedId)).results.length})`;
  let playingTag = document.createElement("p");
  playingTag.textContent = `Jugando (${(await getUserVnByLabel(data.id, playingId)).results.length})`;
  let droppedTag = document.createElement("p");
  droppedTag.textContent = `Abandonadas (${(await getUserVnByLabel(data.id, droppedId)).results.length})`;
  let wishlistTag = document.createElement("p");
  wishlistTag.textContent = `Lista de deseos (${(await getUserVnByLabel(data.id, wishlistId)).results.length})`;
  let all = document.createElement("p");
  all.textContent = `Todas (${(await getUserVnByLabel(data.id, wishlistId)).results.length + (await getUserVnByLabel(data.id, finishedId)).results.length + (await getUserVnByLabel(data.id, playingId)).results.length + (await getUserVnByLabel(data.id, droppedId)).results.length})`;

  tagsInfo.appendChild(finishedTag);
  tagsInfo.appendChild(playingTag);
  tagsInfo.appendChild(droppedTag);
  tagsInfo.appendChild(wishlistTag);
  tagsInfo.appendChild(all);

  logOutButton.textContent = "Cerrar sesión";
  logOutButton.className = "logout-button";
  logOutButton.addEventListener("click", () => {
    showNoProfileMessage();
  });

  userInfo.appendChild(logOutButton);

  welcomeText.textContent = "Bienvenid@ " + data.username;
};

const showNoProfileMessage = () => {
  let userInfo = document.getElementById("userInfo");
  userInfo.innerHTML = "";

  let welcomeText = document.getElementById("welcomeText");
  welcomeText.textContent =
    "Bienvenid@, registrate para empezar a gestionar tu propia lista de visual novels";
};
