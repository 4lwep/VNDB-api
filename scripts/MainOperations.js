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
