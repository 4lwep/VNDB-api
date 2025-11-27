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
    currentSearchList = await searchVnByName(searchBar.value);
    placeVnListInSearch(currentSearchList);
  });

  searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
    currentList = placeSearchResults(currentSearchList, searchBar.value);
  });

  closeSearch.addEventListener("click", () => {
    let search = document.getElementById("searchMenu");
    search.style = "display: none";
  });

  toggleSearch.addEventListener("click", () => {
    let search = document.getElementById("searchMenu");
    search.style = "display: block";
    //TODO: mostrar directamente las visual novels si hay algo en la barra de búsqueda (no esperar a que el usuario la actualice)
  });

  topVns.addEventListener("click", async () => {
    currentList = await placeTopVns();
  });
})();
