let d;
const getShow = async () => {
  //https://api.tvmaze.com/shows/5/episodes
  const response = await axios.get("episodes.json");

  // const data = await response.json();
  d = await response.data.map((x) => x);
  console.log(d);
  return response.data;
};

getShow()
  .then((data) => {
    optionElement(data);
    showsCard(data);
  })
  .catch((err) => {
    console.log("rejected", err);
  });

const select = document.querySelector("#selector");
const serach = document.querySelector(".search");
const container = document.querySelector(".container");

const optionElement = (episodesList) => {
  const option = document.createElement("option");
  option.append(`All Episods`);
  select.append(option);
  episodesList.forEach((episod) => {
    const option = document.createElement("option");
    option.value = episod.name;
    option.append(`S0${episod.season}E0${episod.number} - ${episod.name}`);
    select.append(option);
  });
};
// const randomColorNumber = () => {
//   return Math.floor(Math.random() * 256);
// };
const showsCard = (data) => {
  data.forEach((episod) => {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const span = document.createElement("span");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const a = document.createElement("a");
    h3.append(episod.name);

    span.append(
      `${ordinal(episod.number)} episode of the ${ordinal(
        episod.season
      )} season`
    );
    p.innerHTML = episod.summary;
    a.innerText = "See More";
    a.href = episod.url;
    img.src = episod.image.medium;
    img.alt = span.innerText;
    div.append(h3, span, img, p, a);
    // div.style.backgroundColor = `rgb(${randomColorNumber()}, ${randomColorNumber()}, ${randomColorNumber()})`;
    container.append(div);
  });
};
function ordinal(n) {
  var s = ["th", "st", "nd", "rd"];
  var v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
select.addEventListener("change", function (e) {
  console.log(e.target.value);
  if (e.target.value === "All Episods") {
    container.innerHTML = "";
    showsCard(d);
  } else {
    container.innerHTML = "";
    const config = { params: { q: searchTerm } };
    showsCard();
  }
});