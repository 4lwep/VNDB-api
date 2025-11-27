(async function () {
  let currentList;
  let currentSearchList;

  let searchBar = document.getElementById("searchBar");
  let searchButton = document.getElementById("searchButton");
  let closeSearch = document.getElementById("closeSearch");
  let toggleSearch = document.getElementById("toggleSearch");
  let topVns = document.getElementById("topVns");

  currentList = await placeTopVns();

  searchBar.addEventListener("input", async () => {
    currentSearchList = await placeSearchElementsInSearch(searchBar.value);
  });

  searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
    currentList = await placeSearchResults(currentSearchList, searchBar.value);
  });

  closeSearch.addEventListener("click", () => {
    let search = document.getElementById("searchMenu");
    search.style = "display: none";
  });

  toggleSearch.addEventListener("click", async () => {
    currentSearchList = await prepareSearch(searchBar.value);
  });

  topVns.addEventListener("click", async () => {
    currentList = await placeTopVns();
  });
})();
