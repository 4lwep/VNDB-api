const VN_ENTRY_FIELDS =
  "title, image.thumbnail, image.sexual, length, rating, description, released";

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
      console.log("Respuesta:", data);
    })
    .catch((error) => {
      console.error("Hubo un problema:", error);
    });
};

const getUserFinishedVn = async (user, finishedLabelId) => {
  let response = await fetch("https://api.vndb.org/kana/ulist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: user,
      filters: ["label", "=", finishedLabelId],
      fields:
        "vn.title, labels.label, vn.image.thumbnail, vn.image.sexual, vn.rating, vn.length, vn.released",
      results: 100,
    }),
  });

  const data = await response.json();
  console.log(data);
  return data;
};
