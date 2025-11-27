const placeSearchResults = (searchList, busqueda) => {
  let search = document.getElementById("searchMenu");
  let info = document.getElementById("infoSection");

  info.innerHTML = "";

  let results = document.createElement("p");
  results.className = "search-info";
  results.textContent = `Resultados para la búsqueda: \"${busqueda}\"`;
  info.appendChild(results);

  let divide = document.createElement("hr");
  info.appendChild(divide);

  let currentList = searchList;
  placeVnList(currentList);

  search.style = "display: none";

  return currentList;
};

const placeTopVns = async () => {
  let info = document.getElementById("infoSection");

  info.innerHTML = "";

  let currentList = await getMostRatedVn();
  placeVnList(currentList);

  return currentList;
};

const placeSearchElements = async (search) => {
  let currentSearchList = await searchVnByName(search);
  placeVnListInSearch(currentSearchList);

  return currentSearchList;
};

const prepareSearch = async (currentSearch) => {
  let elements;
  let search = document.getElementById("searchMenu");
  search.style = "display: block";

  if (currentSearch) {
    elements = await placeSearchElements(currentSearch);
  }

  return elements;
  //TODO: mostrar directamente las visual novels si hay algo en la barra de búsqueda (no esperar a que el usuario la actualice)
};
