const placeSearchResults = (searchList, search) => {
  if (search) {
    let search = document.getElementById("searchMenu");
    let info = document.getElementById("infoSection");

    info.innerHTML = "";

    let results = document.createElement("p");
    results.className = "search-info";
    results.textContent = `Resultados para la búsqueda: \"${search}\"`;
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

  let currentList = await getMostRatedVn();
  placeVnList(currentList);

  return currentList;
};
