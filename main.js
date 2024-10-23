const main = document.querySelector(".wrapper");
const results = document.querySelector(".results");
const search = document.getElementById("search");

let currImgPath = "";

function createImgelement(imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.classList.add("imgChange");
    img.src = imgPath;

    img.addEventListener("load", function () {
      main.appendChild(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("Image did not load"));
    });
  });
}

const timer = function (sec) {
  return new Promise((resolve) => {
    setTimeout(resolve, sec * 1000);
  });
};

createImgelement(
  "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg"
)
  .then((res) => {
    currImgPath = res;
    return timer(2);
  })
  .then(() => {
    currImgPath.style.display = "none";
    return createImgelement(
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
    );
  })
  .then((res) => {
    currImgPath = res;
    return timer(2);
  })
  .then(() => {
    currImgPath.style.display = "none";
  })
  .catch((err) => {
    console.log(err);
  });

// filter

const searchProduct = [];

search.addEventListener("keyup", function () {
  searchEngine(search.value);
});

function searchEngine(searchItem) {
  results.innerHTML = "";
  searchProduct.forEach((item) => {
    if (
      item.innerText
        .trim()
        .toLowerCase()
        .includes(searchItem.trim().toLowerCase())
    ) {
      results.style.display = "block";
      results.appendChild(item);
    }
  });

  if (searchItem === "") {
    results.innerHTML = "";
    results.style.display = "none";
  }
}

function getInfo() {
  fetch(
    "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=50",
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.products.forEach((products) => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        const p = document.createElement("p");
        li.classList.add("item");
        img.src = products.thumbnail;
        li.classList.add("searchItem");
        p.textContent = `${products.title}`;
        li.appendChild(img);
        li.appendChild(p);
        searchProduct.push(li);
      });
    });
}

getInfo();
