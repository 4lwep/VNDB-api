(async function () {
  let currentList;
  let currentSearchList;

  let searchBar = document.getElementById("searchBar");
  let searchButton = document.getElementById("searchButton");
  let closeSearch = document.getElementById("closeSearch");
  let toggleSearch = document.getElementById("toggleSearch");

  currentList = await getMostRatedVn();
  placeVnList(currentList);

  searchBar.addEventListener("input", async () => {
    currentSearchList = await searchVnByName(searchBar.value);
    placeVnListInSearch(currentSearchList);
  });

  searchButton.addEventListener("click", async (event) => {
    event.preventDefault();

    let search = document.getElementById("searchMenu");

    currentList = currentSearchList;
    placeVnList(currentList);
    search.style = "display: none";
  });

  closeSearch.addEventListener("click", () => {
    let search = document.getElementById("searchMenu");
    search.style = "display: none";
  });

  toggleSearch.addEventListener("click", () => {
    let search = document.getElementById("searchMenu");
    search.style = "display: block";
  });
})();
