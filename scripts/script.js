(async function () {
  let currentSearchList;
  let mostrarLogin = false;

  let searchBar = document.getElementById("searchBar");
  let searchButton = document.getElementById("searchButton");
  let closeSearch = document.getElementById("closeSearch");
  let toggleSearch = document.getElementById("toggleSearch");
  let topVns = document.getElementById("topVns");
  let account = document.getElementById("account");
  let loginButton = document.getElementById("loginButton");
  let userSearchButton = document.getElementById("userSearchButton");
  let latestVns = document.getElementById("latestVns");
  let gitHubStar = document.getElementById("gitHubStar");
  let vnChart = document.getElementById("vnChart");

  await placeTopVns();

  searchBar.addEventListener("input", async () => {
    currentSearchList = await placeSearchElementsInSearch(searchBar.value);
  });

  searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await placeSearchResults(currentSearchList, searchBar.value);
  });

  closeSearch.addEventListener("click", () => {
    let search = document.getElementById("searchMenu");
    search.style = "display: none";
  });

  toggleSearch.addEventListener("click", async () => {
    currentSearchList = await prepareSearch(searchBar.value);
  });

  topVns.addEventListener("click", async () => {
    await placeTopVns();
  });

  account.addEventListener("click", async () => {
    mostrarLogin = !mostrarLogin;
    let style;

    mostrarLogin ? (style = "display: grid") : (style = "display: none");

    document.getElementById("login").style = style;
  });

  loginButton.addEventListener("click", () => {
    authenticate(document.getElementById("tokenField").value);
  });

  userSearchButton.addEventListener("click", (event) => {
    event.preventDefault();
  });

  latestVns.addEventListener("click", async () => {
    await placeLatestVns();
  });

  gitHubStar.addEventListener("click", () => {
    placeGithubStartsForm();
  });

  vnChart.addEventListener("click", async () => {
    placeYearlyVnCountChart();
  });
})();
