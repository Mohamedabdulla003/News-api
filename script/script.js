// let apiKey = "0aa34b875ebe423394fd4d62e5e119f4";
let apiKey = "974b2db4f80047e88d3b249afa5f14cb";
let formSearch = document.getElementById("search-form");
let searchTitleInput = document.getElementById("search-title-input");
let formSelect = document.querySelector(".form-select");
let categoryTitleElement = document.getElementById("category-news-title");
let categoryTitle = formSelect.value;
categoryTitleElement.innerHTML = categoryTitle;
let alertElement = document.querySelector(".alert");

const fetchTopHeadlineApi = async () => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );
    let result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
  }
};

const fetchSearchNewsApi = async () => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${searchTitle}&apiKey=${apiKey}`
    );
    let result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
  }
};

const fetchCategoryNewsApi = async () => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${categoryTitle}&apiKey=${apiKey}`
    );
    let result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
  }
};

const generateHeadlineList = async () => {
  try {
    let headlines = await fetchTopHeadlineApi();
    let articles = headlines.articles;
    let topHeadLinesElement = document.querySelector(".headline-container");
    let headLineItem = `<ul class="top-headline-list p-0 mb-0">`;
    if (articles.length > 10) {
      articles.length = 10;
    }
    articles.map((item) => {
      headLineItem =
        headLineItem +
        `<li class="top-headline-list  border-bottom border-2 border-secondary p-2 w-100 m-0">
                      <img class="top-headline-poster  img-thumbnail w-100 mb-2 "
                          src="${
                            item.urlToImage != null
                              ? item.urlToImage
                              : "./images/null-news-image.jpg"
                          }"
                          alt="use VPN to load image">
                      <div class="list-item-content ">
                          <h3 class="headline-title">${item.title}</h3>
                          <div class="headline-description">${
                            item.description !== "Comments" &&
                            item.description != null
                              ? item.description
                              : item.content
                          }</div>
                          <div class="d-flex justify-content-between  mt-2"><a class="read-more "
                              href="${item.url}"
                              target="_blank">read more</a>
                              <p class="text-secondary ">${
                                item.source.name
                              }</p></div>
                      </div>
                  </li>`;
    });
    headLineItem = headLineItem + `</ul>`;
    topHeadLinesElement.innerHTML = headLineItem;
  } catch (error) {
    console.log("error", error);
  }
};

const getCategoryTitle = (event) => {
  categoryTitle = event.target.value;
  categoryTitleElement.innerHTML = categoryTitle;
  generateCategoryNews();
};

const generateCategoryNews = async () => {
  try {
    let everythingNews = await fetchCategoryNewsApi();
    let articles = everythingNews.articles;
    let mainNewsElement = document.querySelector(".main-news");
    if (articles.length > 20) {
      articles.length = 20;
    }
    let mainNews = `<ul class="list-group list-group-flush">`;
    articles.map((item) => {
      mainNews =
        mainNews +
        `<li class="list-group-item d-flex justify-content-between">
                        <div class="news-content w-75 ps-2 pe-5">
                            <h3>${item.title}</h3>
                            <p>${
                              !item.content.startsWith("We use cookies")
                                ? item.content
                                : item.description
                            }</p>
                            <div class="link-source d-flex justify-content-between">
                                <a class="read-more" target="_blank" href="${
                                  item.url
                                }">read more</a>
                                <p class="text-secondary opacity-75">${
                                  item.source.name
                                }</p>
                            </div>
                        </div>
                        <img src="${
                          item.urlToImage != null &&
                          item.urlToImage.startsWith("https://") &&
                          !item.urlToImage.startsWith("https://axleos.com")
                            ? item.urlToImage
                            : "./images/null-news-image.jpg"
                        }" alt="use VPN to load image"
                            class="w-25 img-fluid rounded">
                    </li>`;
    });
    mainNews = mainNews + `</ul>`;
    mainNewsElement.innerHTML = mainNews;
  } catch (error) {
    console.log("error", error);
  }
};

const searchNews = async (event) => {
  try {
    event.preventDefault();
    searchTitle = searchTitleInput.value;
    formSelect.value = "";
    console.log(searchTitle);
    let everythingNews = await fetchSearchNewsApi();
    let articles = everythingNews.articles;
    let mainNewsElement = document.querySelector(".main-news");
    if (articles.length != 0) {
      if (articles.length > 20) {
        articles.length = 20;
      }
      categoryTitleElement.innerHTML = searchTitle;
      let mainNews = `<ul class="list-group list-group-flush">`;
      articles.map((item) => {
        mainNews =
          mainNews +
          `<li class="list-group-item d-flex justify-content-between">
                        <div class="news-content w-75 ps-2 pe-5">
                            <h3>${item.title}</h3>
                            <p>${
                              !item.content.startsWith("We use cookies")
                                ? item.content
                                : item.description
                            }</p>
                            <div class="link-source d-flex justify-content-between">
                                <a class="read-more" target="_blank" href="${
                                  item.url
                                }">read more</a>
                                <p class="text-secondary opacity-75">${
                                  item.source.name
                                }</p>
                            </div>
                        </div>
                        <img src="${
                          item.urlToImage != null
                            ? item.urlToImage.startsWith("https://")
                              ? item.urlToImage
                              : "./images/null-news-image.jpg"
                            : "./images/null-news-image.jpg"
                        }" alt="use VPN to load image"
                            class="w-25 img-fluid rounded ">
                    </li>`;
      });
      mainNews = mainNews + `</ul>`;
      mainNewsElement.innerHTML = mainNews;
    } else {
      document.getElementById("alert-title").innerHTML = `"${searchTitle}"`;
      alertElement.style.display = "flex";
    }
  } catch (error) {
    console.log("error", error);
  }
};
formSelect.addEventListener("change", getCategoryTitle);
formSearch.addEventListener("submit", searchNews);
let closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  alertElement.style.display = "none";
});
generateHeadlineList();
generateCategoryNews();























