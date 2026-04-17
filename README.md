# wordly-dictionary
# Dictionary SPA

##  Project Description
This is a Single Page Application (SPA) dictionary built using HTML, CSS, and JavaScript.  
It allows users to search for word definitions using an external API and displays results dynamically without reloading the page.



## Features

- Search for any English word
-  Display definition and example
- Recent search history
-  Clear history button
- Dark mode toggle
- Text size adjustment (A+ / A-)
- Clickable synonyms



##  Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API
- Dictionary API


## API Used

Dictionary API:  
https://api.dictionaryapi.dev/api/v2/entries/en/<word>



## How It Works

1. User enters a word
2. JavaScript captures the input using an event listener
3. A request is sent to the dictionary API using `fetch()`
4. The API returns JSON data
5. The app displays:
   - Word
   - Definition
   - Example
   - Synonyms



##  Project Structure
