const placeVnListInSearch = (data) => {
  let vnSearchList = document.getElementById("vnSearchList");

  vnSearchList.innerHTML = "";

  data.results.forEach((vn) => {
    createVnSearchEntry(vn);
  });
};

const placeVnList = (data) => {
  let info = document.getElementById("infoSection");
  let vnList = document.createElement("div");
  vnList.className = "vn-list";
  vnList.id = "vnList";

  data.results.forEach((vn) => {
    createVnEntry(vn, vnList);
  });
  info.appendChild(vnList);
};

const noLoginText = () => {};
