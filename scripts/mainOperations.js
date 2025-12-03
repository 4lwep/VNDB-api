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

    placeVnList(searchList);

    search.style = "display: none";
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

  placeVnList(await getMostRatedVn());
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

  placeVnList(await getLatestVn());
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

const placeGithubStartsForm = () => {
  let info = document.getElementById("infoSection");

  info.innerHTML = "";

  let pageTitle = document.createElement("h1");
  pageTitle.className = "list-title";
  pageTitle.textContent = "Estrellas en GitHub";
  info.appendChild(pageTitle);

  let divide = document.createElement("hr");
  divide.style = "width: 100vh";
  info.appendChild(divide);

  let form = document.createElement("form");
  let userStarred = document.createElement("p");
  let userStarredInput = document.createElement("input");
  let repoStarred = document.createElement("p");
  let repoStarredInput = document.createElement("input");
  let token = document.createElement("p");
  let tokenInput = document.createElement("input");
  let submitButton = document.createElement("button");

  let successInfo = document.createElement("p");
  successInfo.className = "success-info";
  successInfo.id = "successInfo";

  form.className = "github-form";
  userStarred.textContent =
    "Usuario del repositorio al que vas a dar una estrella";
  repoStarred.textContent = "Repositorio al que le vas a dar una estrella";
  token.textContent = "Introduce aquí tu token";
  submitButton.textContent = "Poner estrella";

  userStarredInput.required;
  repoStarredInput.required;
  tokenInput.required;

  info.appendChild(form);

  form.appendChild(userStarred);
  form.appendChild(userStarredInput);
  form.appendChild(repoStarred);
  form.appendChild(repoStarredInput);
  form.appendChild(token);
  form.appendChild(tokenInput);
  form.appendChild(submitButton);

  info.appendChild(successInfo);

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    githubStarApi(
      userStarredInput.value,
      repoStarredInput.value,
      tokenInput.value
    );
  });
};

const placeYearlyVnCountChart = async () => {
  let info = document.getElementById("infoSection");

  info.innerHTML = "";

  let pageTitle = document.createElement("h1");
  pageTitle.className = "list-title";
  pageTitle.textContent = "Cantidad de Visual novels por año";
  info.appendChild(pageTitle);

  let divide = document.createElement("hr");
  divide.style = "width: 100vh";
  info.appendChild(divide);

  let canvas = document.createElement("canvas");
  canvas.id = "yearlyVnCount";
  info.appendChild(canvas);

  let years = [];
  let currentYear = new Date().getFullYear();
  for (i = 0; i <= currentYear - 2000; i++) {
    years[i] = currentYear - (currentYear - 2000) + i;
  }

  let count = [];
  for (const year of years) {
    const result = await getVnCountFromYear(year);
    count.push(result);
  }

  //let count = await Promise.all(years.map((year) => getVnCountFromYear(year))); ESTO SATURA A LA API

  console.log(years);
  yearlyVnChart(years, count);
};

const placeSearchedUserVnList = async (userId, userName) => {
  let info = document.getElementById("infoSection");

  info.innerHTML = "";

  let pageTitle = document.createElement("h1");
  pageTitle.className = "list-title";
  pageTitle.textContent = "Lista de " + userName;
  info.appendChild(pageTitle);

  let divide = document.createElement("hr");
  divide.style = "width: 100vh";
  info.appendChild(divide);

  let userLabels = await getUserLabels(userId);
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

  let finishedVnList = document.createElement("h2");
  finishedVnList.className = "list-title";
  finishedVnList.textContent = "Juegos terminados";
  info.appendChild(finishedVnList);
  placeUserVnList(await getUserVnByLabel(userId, finishedId));

  let playingVnList = document.createElement("h2");
  playingVnList.className = "list-title";
  playingVnList.textContent = "Jugando actualmente";
  info.appendChild(playingVnList);
  placeUserVnList(await getUserVnByLabel(userId, playingId));

  let droppedVnList = document.createElement("h2");
  droppedVnList.className = "list-title";
  droppedVnList.textContent = "Abandonadas";
  info.appendChild(droppedVnList);
  placeUserVnList(await getUserVnByLabel(userId, droppedId));

  let wishlistVnList = document.createElement("h2");
  wishlistVnList.className = "list-title";
  wishlistVnList.textContent = "Lista de deseos";
  info.appendChild(wishlistVnList);
  placeUserVnList(await getUserVnByLabel(userId, wishlistId));
};
