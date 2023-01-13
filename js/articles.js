// =========================== SET-UP =============================
// Connect to html
let articlesContainer = document.getElementById('articles-container');

// Initialize arrays to store articles
let articles = [];

// Populate all articles array
articles.push(new Article(0, 'Harvesting autumn crops', 'gardening', 'vegetables1.jpg'));
articles.push(new Article(1, 'Harvesting summer crops', 'gardening', 'vegetables2.jpg'));
articles.push(new Article(2, 'Supporting beneficial pollinators', 'gardening', 'pollinators.jpg'));
articles.push(new Article(3, 'Controlling pests in the garden', 'gardening', 'pestControl.jpg'));
articles.push(new Article(4, 'Homemade apple cider', 'preservation', 'appleCidar.jpg'));
articles.push(new Article(5, 'Storing root vegetables for winter', 'preservation', 'rootVegetables.jpg'));
articles.push(new Article(6, 'Home canned jam recipe', 'preservation', 'jam.jpg'));

// ================== LOAD ARTICLES TO HTML PAGES ================
// Load article card elements by topic from session storage
function loadArticleCards(topic) {
  // Load articles from session storage using helper function
  loadArticles();

  // Filter articles by supplied topic and render html
  let topicArticles = articles.filter(article => article.topic === topic);
  topicArticles.forEach(article => renderArticleCard(article));
};

// Load saved articles from session storage to reading list
function loadSavedArticles() {
  // Load articles from session storage using helper function
  loadArticles();

  // Filter only articles with isSaved attribute set to true
  let savedArticles = articles.filter(article => article.isSaved === true);

  // If there are any saved articles render them as article cards
  if (savedArticles) {
    savedArticles.forEach(article => renderArticleCard(article));
  }
};

// Load article object from session storage and render save/like buttons
function loadArticle(id) {
  // Load articles from session storage using helper function
  loadArticles();
  console.log("article loaded");

  // Target article by supplied id
  let article = articles[id];

  renderArticleBtns(article);
}

// ===================== HANDLE CLICK EVENTS ======================
// Function to update session storage on save btn click
function onSave(btn, id) {
  // Invert isSaved attribute
  articles[id].isSaved = !articles[id].isSaved;
  // Toggle styling of btn
  toggleBtn(btn, articles[id].isSaved);

  // Alert the user with how many articles they have saved
  let savedArticles = articles.filter(article => article.isSaved);
  alert(`You have ${savedArticles.length} articles in your reading list`);

  // Update session storage
  sessionStorage.setItem("articles", JSON.stringify(articles));

  // Reload page so that reading list updates automatically
  document.location.reload();
};

// Function to update session storage on like btn click
function onLike(btn, id) {
  articles[id].isLiked = !articles[id].isLiked;
  toggleBtn(btn, articles[id].isLiked);
  // Update session storage
  sessionStorage.setItem("articles", JSON.stringify(articles));
};

// =================== HELPER FUNCTIONS =====================
// Helper function to load articles from session storage
function loadArticles() {
  // If code hasn't run yet set up session storage
  if (sessionStorage.getItem("hasCodeRunBefore") === null) {
    sessionStorage.setItem("articles", JSON.stringify(articles));
    sessionStorage.setItem("hasCodeRunBefore", true);
    // Otherwise load articles array to sesson storage
  } else {
    articles = JSON.parse(sessionStorage.getItem("articles"));
  }
};

// Function to toggle styling of save and like btns
function toggleBtn(btn, isClicked) {
  // Select the first paragraph element of a btn element
  let btnText = btn.querySelectorAll('p')[0];
  // Target text 
  let text = btnText.innerHTML;

  // If button is clicked down add "d" to the end of btn text and add "clicked" class name
  if (isClicked) {
    text += "d";
    btn.className = 'clicked';
    // If button is being unclicked remove trailing "d" and remove class name 
  } else {
    text = text.slice(0, 4);
    btn.className = '';
  }

  // Update btn text
  btnText.innerHTML = text;
};

// ====================== RENDER HTML ========================
// Function to render btns on single article pages
function renderArticleBtns(article) {
  let articleBtnsContainer = document.getElementById('article-btns_container');

  let articleBtns = renderBtns(article.id, article.isSaved, article.isLiked);
  console.log(articleBtns);

  articleBtnsContainer.appendChild(articleBtns);
};

// Function to render article card element on topic webpages
function renderArticleCard(article) {
  // Create card container + give class name
  let card = document.createElement('div');
  card.classList.add('article-card');

  // Create link element using helper function
  let headingLink = renderArticleLinkElement(article.id);

  // Create heading container element + give class name
  let heading = document.createElement('div');
  heading.classList.add('article-heading');

  // Create heading text element + define text with supplied article title
  let headingText = document.createElement('h3');
  headingText.innerHTML = `${article.title}`;

  // Render save and like btns using helper function
  let articleBtns = renderBtns(article.id, article.isSaved, article.isLiked);

  // Create link element using helper function
  let imgLink = renderArticleLinkElement(article.id);

  // Create image element + give class name + give background image
  let coverImg = document.createElement('div');
  coverImg.classList.add('article-img');
  coverImg.style = `background-image: url(../images/${article.imgFilename})`;

  // Append children of new elements to their parents 
  heading.appendChild(headingText);
  headingLink.appendChild(heading);
  imgLink.appendChild(coverImg);

  // Append all those sibling elements to card element
  card.appendChild(headingLink);
  card.appendChild(articleBtns);
  card.appendChild(imgLink);

  // Append new article card element to articles container element from html
  articlesContainer.appendChild(card);
};

// ================= RENDER HTML HELPER FUNCTIONS ==================
// Function to render link element for article cards
function renderArticleLinkElement(id) {
  // Create link element + give class name + define href attribute
  let link = document.createElement('a');
  link.classList.add('article-link');
  link.href = `./articles/article${id}.html`;

  return link;
};

// Function to render save and like btns
function renderBtns(id, isSaved, isLiked) {
  // Create btns container element + give class name 
  let btnsContainer = document.createElement('div');
  btnsContainer.classList.add('article-btns');

  // Create and define save btn
  let saveBtn = document.createElement('div');
  saveBtn.id = `article${id}_save`;
  let saveTxt = document.createElement('p');
  isSaved ? saveTxt.innerHTML = "Saved" : saveTxt.innerHTML = "Save";
  isSaved ? saveBtn.className = "clicked" : saveBtn.className = "";
  saveBtn.appendChild(saveTxt);

  // Create and define like btn
  let likeBtn = document.createElement('div');
  likeBtn.id = `article${id}_like`;
  let likeTxt = document.createElement('p');
  isLiked ? likeTxt.innerHTML = "Liked" : likeTxt.innerHTML = "Like";
  isLiked ? likeBtn.className = "clicked" : likeBtn.className = "";
  likeBtn.appendChild(likeTxt);

  // Append save and like button to btn container element
  btnsContainer.appendChild(saveBtn);
  btnsContainer.appendChild(likeBtn);

  // Define click event listener to save btn
  saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    onSave(saveBtn, id);
  });

  // Define click event listener to like btn
  likeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    onLike(likeBtn, id);
  });

  return btnsContainer;
};

// ================== CUSTOM OBJECT ===================
// Constructor function used to create all article objects
function Article(id, title, topic, imgFilename) {
  this.id = id;
  this.title = title;
  this.topic = topic;
  this.imgFilename = imgFilename;
  this.isSaved = false;
  this.isLiked = false;
};