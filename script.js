//selecting element of html
const select = document.querySelector("#selector");
const serach = document.querySelector(".search");
const allShowsBtn = document.querySelector("#allshows");
const container = document.querySelector(".container");
const title = document.querySelector("#title");
const header = document.querySelector("#header");
//shows urls
const urls = [
  "https://api.tvmaze.com/shows/82",
  "https://api.tvmaze.com/shows/527",
  "https://api.tvmaze.com/shows/22036",
  "https://api.tvmaze.com/shows/5",
  "https://api.tvmaze.com/shows/582",
  "https://api.tvmaze.com/shows/179",
  "https://api.tvmaze.com/shows/379",
  "https://api.tvmaze.com/shows/4729",
];
let showsData;
const shows = async (url) => {
  const response = await axios.get(url);
  showsData = await response.data;
  console.log(showsData);
  return showsData;
};
const getShow = () => {
  container.innerHTML = "";
  for (const url of urls) {
    shows(url).then((data) => {
      title.textContent = "Tv Shows";
      header.textContent = "Tv Shows";
      createCard(data, true);
    });
  }
};
getShow();

//define global variable for response data
let episodesData;
//making get request by axios for episodes

const getEpisodes = async (url) => {
  const response = await axios.get(url);
  episodesData = await response.data.map((x) => x);
  return episodesData;
};
//error handeling
// getShow()
//   .then((data) => {
//     optionElement(data);
//     showsCard(data);
//   })
//   .catch((err) => {
//     console.log("rejected", err);
//   });

//all shows btn click event
allShowsBtn.addEventListener("click", () => {
  getShow();
});
//adding options to select element
const optionElement = (episodesList) => {
  select.innerHTML = "";
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
//define showcard function for create cards
const showsCard = (data) => {
  data.forEach((cardData) => {
    createCard(cardData, false);
  });
};
// define createCard for makeing each card
const createCard = async (cardData, isShowCard) => {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const span = document.createElement("span");
  const img = document.createElement("img");
  const p = document.createElement("p");
  const a = document.createElement("a");
  h3.append(cardData.name);
  p.innerHTML = cardData.summary;
  a.innerText = "See Episodes";
  a.href = "#";
  a.addEventListener("click", () => {
    url = cardData._links.self.href + `/episodes`;
    title.textContent = cardData.name;
    header.textContent = cardData.name;
    console.log(url);
    getEpisodes(url)
      .then((data) => {
        container.innerHTML = "";
        optionElement(data);
        showsCard(data, false);
      })
      .catch((err) => {
        console.log("rejected", err);
      });
  });
  cardData.image !== null
    ? (img.src = cardData.image.medium)
    : (img.src = "default.jpg");
  img.style.borderRadius = "5px";
  if (isShowCard == false) {
    select.style.display = "inline-block";
    serach.style.display = "inline-block";
    allShowsBtn.style.display = "inline-block";

    span.append(
      `${ordinal(cardData.number)} episode of the ${ordinal(
        cardData.season
      )} season`
    );

    a.innerText = "See More";
    a.href = cardData.url;
    img.alt = span.innerText;
    div.append(img, h3, span, p, a);
    container.append(div);
  } else {
    select.style.display = "none";
    serach.style.display = "none";
    allShowsBtn.style.display = "none";
    div.append(img, h3, p, a);
    div.style.height = "500px";
    container.append(div);
  }

  // div.style.backgroundColor = `rgb(${randomColorNumber()}, ${randomColorNumber()}, ${randomColorNumber()})`;
};
//ordinal function
function ordinal(n) {
  var s = ["th", "st", "nd", "rd"];
  var v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
// event for selector menue
select.addEventListener("change", function (e) {
  if (e.target.value === "All Episods") {
    container.innerHTML = "";
    showsCard(episodesData, false);
  } else {
    container.innerHTML = "";

    createCard(episodesData[e.target.selectedIndex - 1], false);
  }
});

//event for input search
serach.addEventListener("input", async (e) => {
  container.innerHTML = "";
  episodesData.forEach((ele) => {
    if (ele.name.toLowerCase().includes(e.target.value.toLowerCase())) {
      createCard(ele, false);
    }
  });
});
