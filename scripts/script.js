(async function () {
  let explicit = false;

  let currentList;
  let currentSearchList;

  let searchBar = document.getElementById("searchBar");
  let searchButton = document.getElementById("searchButton");
  let explicitCheck = document.getElementById("explicitCheck");
  let closeSearch = document.getElementById("closeSearch");
  let toggleSearch = document.getElementById("toggleSearch");

  currentList = await getMostRatedVn();
  placeVnList(currentList, explicit);

  searchBar.addEventListener("input", async () => {
    currentSearchList = await searchVnByName(searchBar.value);
    placeVnListInSearch(currentSearchList, explicit);
  });

  explicitCheck.addEventListener("change", async () => {
    if (explicitCheck.checked) {
      explicit = showExplicit(currentList, currentSearchList, explicit);
    } else {
      explicit = hideExplicit(currentList, currentSearchList, explicit);
    }
  });

  searchButton.addEventListener("click", async (event) => {
    event.preventDefault();

    let search = document.getElementById("searchMenu");

    currentList = currentSearchList;
    placeVnList(currentList, explicit);
    search.style = "display: none";
  });

  closeSearch.addEventListener("click", (event) => {
    let search = document.getElementById("searchMenu");
    search.style = "display: none";
  });

  toggleSearch.addEventListener("click", (event) => {
    let search = document.getElementById("searchMenu");
    search.style = "display: block";
  });
})();
