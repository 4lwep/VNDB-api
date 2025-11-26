const getMostRatedVn = async () => {
  let response = await fetch("https://api.vndb.org/kana/vn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filters: ["rating", ">", "80"],
      fields: "title, image.thumbnail, image.sexual, length, rating",
      sort: "rating",
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
      fields: "title, image.thumbnail, image.sexual, length",
      results: 100,
    }),
  });

  const data = await response.json();
  return data;
};
