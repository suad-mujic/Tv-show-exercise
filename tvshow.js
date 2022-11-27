const form = document.querySelector("#searchForm");
const main = document.querySelector("#theResult");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  // to restart the search result every time we want a new search
  while (main.lastElementChild) {
    main.removeChild(main.lastElementChild);
  }

  const searchMovie = form.elements.query.value;
  const res = await axios.get(
    `https://api.tvmaze.com/search/shows?q=${searchMovie}`
  );
  //  this console log is just so i can see all the properties of the object
  console.log(res.data);

  const resultCount = res.data.length;
  if (resultCount > 0) {
    for (let i = 0; i < 10; i++) {
      try {
        // show name premiere and summary
        const showName = res.data[i].show.name;
        const showDate = res.data[i].show.premiered.slice(0, 4);
        const showSummary = res.data[i].show.summary;

        //   image input for every result
        const imageUrl = res.data[i].show.image.medium;
        const newImage = document.createElement("img");
        const newDiv = document.createElement("div");
        const newP = document.createElement("p");
        const newP2 = document.createElement("p");

        // changig the class name of the new div
        newDiv.className = "singleImage";

        // changing the name of the img
        newP.innerText = `${showName}`;
        newP2.innerText = `Premiere: ${showDate}`;

        newP.className = "imgPar";
        newP2.className = "imgPar";
        newImage.src = imageUrl;
        newImage.title = `${showName} ${showDate}`;
        newImage.alt = showSummary;
        newImage.className = "slicice";

        // appending the new img to the new div then to the main section
        newDiv.append(newImage);
        newDiv.append(newP);
        newDiv.append(newP2);
        main.append(newDiv);

        // This function is for the full screen on click for the img elements
        const fullPage = document.querySelector("#fullpage");
        const slika = document.querySelector("#image");
        const para = document.querySelector("#paragraf");
        const slicice = document.querySelectorAll(".slicice");

        slicice.forEach((img) => {
          img.addEventListener("click", function () {
            slika.src = img.src.replace(
              "medium_portrait",
              "original_untouched"
            );

            para.innerHTML = `NAME: ${img.title.slice(
              0,
              -4
            )} </br> </br> PREMIERE: ${img.title.slice(
              -4
            )} </br> </br> SUMMARY: ${img.alt}`;
            fullPage.style.display = "flex";
          });
        });
      } catch {}
    }
  } else {
    const message = document.createElement("h2");
    message.innerText = "Something went wrong... Please try again";
    main.append(message);
  }

  this.reset();
});
