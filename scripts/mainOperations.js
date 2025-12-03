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

  userInfo.innerHTML = "";

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

  let finishedNovels = (await getUserVnByLabel(data.id, finishedId)).results
    .length;

  let playingNovels = (await getUserVnByLabel(data.id, playingId)).results
    .length;

  let droppedNovels = (await getUserVnByLabel(data.id, droppedId)).results
    .length;

  let wishlistNovels = (await getUserVnByLabel(data.id, wishlistId)).results
    .length;

  let allNovels =
    (await getUserVnByLabel(data.id, wishlistId)).results.length +
    (await getUserVnByLabel(data.id, finishedId)).results.length +
    (await getUserVnByLabel(data.id, playingId)).results.length +
    (await getUserVnByLabel(data.id, droppedId)).results.length;

  let finishedTag = document.createElement("p");
  finishedTag.textContent = `Terminadas (${finishedNovels})`;
  let playingTag = document.createElement("p");
  playingTag.textContent = `Jugando (${playingNovels})`;
  let droppedTag = document.createElement("p");
  droppedTag.textContent = `Abandonadas (${droppedNovels})`;
  let wishlistTag = document.createElement("p");
  wishlistTag.textContent = `Lista de deseos (${wishlistNovels})`;
  let all = document.createElement("p");
  all.textContent = `Todas (${allNovels})`;

  finishedTag.addEventListener("click", async () => {
    let info = document.getElementById("infoSection");

    info.innerHTML = "";

    let finishedVnsText = document.createElement("h1");
    finishedVnsText.className = "list-title";
    finishedVnsText.textContent = "Visual novels terminadas";
    info.appendChild(finishedVnsText);

    let divide = document.createElement("hr");
    info.appendChild(divide);

    let userVnByLabel = await getUserVnByLabel(data.id, finishedId);
    placeUserVnList(userVnByLabel);
  });

  playingTag.addEventListener("click", async () => {
    let info = document.getElementById("infoSection");

    info.innerHTML = "";

    let playingVnsText = document.createElement("h1");
    playingVnsText.className = "list-title";
    playingVnsText.textContent = "Jugando actualmente";
    info.appendChild(playingVnsText);

    let divide = document.createElement("hr");
    info.appendChild(divide);

    let userVnByLabel = await getUserVnByLabel(data.id, playingId);
    placeUserVnList(userVnByLabel);
  });

  droppedTag.addEventListener("click", async () => {
    let info = document.getElementById("infoSection");

    info.innerHTML = "";

    let droppedVnsText = document.createElement("h1");
    droppedVnsText.className = "list-title";
    droppedVnsText.textContent = "Visual novels abandonadas";
    info.appendChild(droppedVnsText);

    let divide = document.createElement("hr");
    info.appendChild(divide);

    let userVnByLabel = await getUserVnByLabel(data.id, droppedId);
    placeUserVnList(userVnByLabel);
  });

  wishlistTag.addEventListener("click", async () => {
    let info = document.getElementById("infoSection");

    info.innerHTML = "";

    let wishlistVnsText = document.createElement("h1");
    wishlistVnsText.className = "list-title";
    wishlistVnsText.textContent = "Lista de deseos";
    info.appendChild(wishlistVnsText);

    let divide = document.createElement("hr");
    info.appendChild(divide);

    let userVnByLabel = await getUserVnByLabel(data.id, wishlistId);
    placeUserVnList(userVnByLabel);
  });

  all.addEventListener("click", async () => {
    let info = document.getElementById("infoSection");

    info.innerHTML = "";

    let allVnsText = document.createElement("h1");
    allVnsText.className = "list-title";
    allVnsText.textContent = "Visual novels de " + data.username;
    info.appendChild(allVnsText);

    let divide = document.createElement("hr");
    info.appendChild(divide);

    let UserAllVn = await getUserAllVn(data.id);
    placeUserVnList(UserAllVn);
  });

  tagsInfo.appendChild(finishedTag);
  tagsInfo.appendChild(playingTag);
  tagsInfo.appendChild(droppedTag);
  tagsInfo.appendChild(wishlistTag);
  tagsInfo.appendChild(all);

  let userVnStatisticsChart = document.createElement("canvas");
  userVnStatisticsChart.id = "userStatistics";
  userInfo.appendChild(userVnStatisticsChart);
  userVnChart(finishedNovels, playingNovels, droppedNovels, wishlistNovels);

  logOutButton.textContent = "Cerrar sesión";
  logOutButton.className = "logout-button";
  logOutButton.addEventListener("click", () => {
    showNoProfileMessage();
  });

  userInfo.appendChild(logOutButton);

  welcomeText.textContent = "Bienvenid@ " + data.username;

  document.getElementById("subahibi").style = "display: none";
};

const showNoProfileMessage = () => {
  document.getElementById("subahibi").style = "display: auto";
  let userInfo = document.getElementById("userInfo");
  userInfo.innerHTML = "";

  let welcomeText = document.getElementById("welcomeText");
  welcomeText.textContent =
    "Bienvenid@, registrate para empezar a gestionar tu propia lista de visual novels";
};
