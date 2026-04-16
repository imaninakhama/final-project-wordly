document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("searchForm");
  const input = document.getElementById("wordInput");
  const result = document.getElementById("result");
  const error = document.getElementById("error");
  const recentList = document.getElementById("recentList");
  const clearBtn = document.getElementById("clearHistory");

  let recentWords = [];

  //searching//
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const word = input.value.trim();
    if (!word) return;

    fetchWord(word);
    addToRecent(word);
  });

  
  function fetchWord(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(res => res.json())
      .then(data => {
        if (data.title === "No Definitions Found") {
          error.textContent = "Word not found!";
          result.innerHTML = "";
          return;
        }

        error.textContent = "";

        const wordText = data[0].word;
        const meaning = data[0].meanings[0].definitions[0].definition;
        const example =
          data[0].meanings[0].definitions[0].example ||
          "No example available";

        /* SYNONYMS */
        let synonyms = data[0].meanings[0].synonyms || [];
        if (synonyms.length === 0) {
          synonyms =
            data[0].meanings[0].definitions[0].synonyms || [];
        }

        let synonymHTML =
          synonyms.length > 0
            ? synonyms
                .map(w => `<span class="tag" onclick="searchSynonym('${w}')">${w}</span>`)
                .join("")
            : "<p>No synonyms available</p>";

        result.innerHTML = `
          <h2>${wordText}</h2>
          <p><strong>Definition:</strong> ${meaning}</p>
          <p><strong>Example:</strong> ${example}</p>

          <h3>Synonyms</h3>
          <div class="synonyms">${synonymHTML}</div>
        `;
      })
      .catch(() => {
        error.textContent = "Failed to fetch word!";
      });
  }

  
  function addToRecent(word) {
    if (!recentWords.includes(word)) {
      recentWords.unshift(word);
    }

    if (recentWords.length > 5) {
      recentWords.pop();
    }

    displayRecent();
  }

  function displayRecent() {
    recentList.innerHTML = "";

    recentWords.forEach(word => {
      const li = document.createElement("li");
      li.textContent = word;

      li.addEventListener("click", () => {
        fetchWord(word);
      });

      recentList.appendChild(li);
    });
  }

  
  clearBtn.addEventListener("click", function () {
    recentWords = [];
    recentList.innerHTML = "";
  });

  /* DARK MODE */
  const darkBtn = document.getElementById("darkModeBtn");

  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  
  const increaseBtn = document.getElementById("increaseText");
  const decreaseBtn = document.getElementById("decreaseText");

  let fontSize = 16;

  increaseBtn.addEventListener("click", () => {
    fontSize += 2;
    document.body.style.fontSize = fontSize + "px";
  });

  decreaseBtn.addEventListener("click", () => {
    fontSize -= 2;
    document.body.style.fontSize = fontSize + "px";
  });

});


function searchSynonym(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json())
    .then(data => {
      const result = document.getElementById("result");

      if (data.title) {
        result.innerHTML = "Word not found!";
        return;
      }

      result.innerHTML = `
        <h2>${data[0].word}</h2>
        <p>${data[0].meanings[0].definitions[0].definition}</p>
      `;
    });
}