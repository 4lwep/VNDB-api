const VN_ENTRY_FIELDS =
  "title, image.thumbnail, image.sexual, length, rating, description, released";

const USER_VN_ENTRY_FIELDS =
  "vn.title, vn.image.thumbnail, vn.image.sexual, vn.length, vn.rating, vn.description, vn.released";

const getMostRatedVn = async () => {
  let response = await fetch("https://api.vndb.org/kana/vn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: VN_ENTRY_FIELDS,
      sort: "rating",
      reverse: true,
      results: 100,
    }),
  });

  const data = await response.json();
  return data;
};

const getLatestVn = async () => {
  let response = await fetch("https://api.vndb.org/kana/vn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filters: ["released", "<", new Date().toJSON().slice(0, 10)],
      fields: VN_ENTRY_FIELDS,
      sort: "released",
      reverse: true,
      results: 100,
    }),
  });

  const data = await response.json();
  return data;
};

const searchVnByName = async (name) => {
  let response = await fetch("https://api.vndb.org/kana/vn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filters: ["search", "=", name],
      fields:
        "title, image.thumbnail, image.sexual, rating, length, description, released",
      results: 100,
    }),
  });

  const data = await response.json();
  return data;
};

const authenticate = (token) => {
  fetch("https://api.vndb.org/kana/authinfo", {
    method: "GET",
    headers: {
      Authorization: "Token " + token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la petición: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      showProfileInfo(data);
    })
    .catch((error) => {
      console.error("Hubo un problema:", error);
    });
};

const getUserVnByLabel = async (user, label) => {
  let response = await fetch("https://api.vndb.org/kana/ulist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: user,
      filters: ["label", "=", label],
      fields: USER_VN_ENTRY_FIELDS,
      results: 100,
    }),
  });

  const data = await response.json();

  return data;
};

const getUserAllVn = async (user) => {
  let response = await fetch("https://api.vndb.org/kana/ulist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: user,
      fields: USER_VN_ENTRY_FIELDS,
      results: 100,
    }),
  });

  const data = await response.json();

  return data;
};

const getUserLabels = async (userId) => {
  return await fetch("https://api.vndb.org/kana/ulist_labels?user=" + userId, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la petición: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Hubo un problema:", error);
    });
};

const githubStarApi = (owner, repo, token) => {
  let success = document.getElementById("successInfo");
  success.textContent = "";

  fetch(`https://api.github.com/user/starred/${owner}/${repo}`, {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Length": "0",
    },
  })
    .then((response) => {
      if (response.status === 204) {
        success.textContent = "Estrella añadida al repositorio correctamente!";
      } else {
        console.log(`Error: ${response.status}`);
        success.textContent = "Error al añadir la estrella";
      }
    })
    .catch((error) => console.error("Error en la petición:", error));
};

const getVnCountFromYear = async (year) => {
  let response = await fetch("https://api.vndb.org/kana/vn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filters: [
        "and",
        ["released", ">=", `${year}-01-01`],
        ["released", "<=", `${year}-12-31`],
      ],
      count: true,
      sort: "released",
    }),
  });

  const data = await response.json();

  return data.count;
};

const searchUser = (username) => {
  fetch("https://api.vndb.org/kana/user?q=" + username, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la petición: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      placeSearchedUserVnList(data[username].id, data[username].username);
    })
    .catch((error) => {
      console.error("Hubo un problema:", error);
    });
};
