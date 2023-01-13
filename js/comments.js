// ======================= SET-UP =========================
// Initialize an array to store comments
let comments = [];
// Initialize index to track id for new comment objects
let index = 0;
// Extract articleId from url
let articleID = Number(location.href[location.href.length - 6]);

// Store long form month names to use with formatting date object
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Connect to post button
let addComment = document.getElementById('post-comment');

// ================= COMMENT FORM FUNCTIONALITY ==================
function loadComments() {
  // If code hasn't run yet set up session storage
  if (sessionStorage.getItem("hasCommentJSRunBefore") === null) {
    sessionStorage.setItem("comments", JSON.stringify(comments));
    sessionStorage.setItem("hasCommentJSRunBefore", true);
    // Otherwise load comments array to sesson storage
  } else {
    comments = JSON.parse(sessionStorage.getItem("comments"));
  }

  // Render comments
  if (comments) {
    let articleComments = comments.filter(comment => comment.articleId === articleID);
    articleComments.forEach(comment => renderComment(comment));
  }
};

// Function to handle post comment btn click event
function onPost() {
  // Create new comment object supplying form data from html
  let id = index++;
  let author = document.getElementById('author');
  let message = document.getElementById('message');

  // Check if input fields are filled in
  if (author.value.length > 0 && message.value.length > 0) {
    // Create new comment object
    let comment = new Comment(id, articleID, author.value, message.value);

    // Push new comment to comments array
    comments.push(comment);

    // Update session storage with new comment and render to page
    sessionStorage.setItem("comments", JSON.stringify(comments));
    renderComment(comment);

    // Clear input fields after form submit
    author.value = '';
    message.value = '';

    // If input fields are empty alert user and don't allow form submission
  } else {
    alert("Please enter your name and a message.");
  }
};

// ======================= RENDER HTML =====================
// Function to render comment object to html
function renderComment(comment) {
  // Connect to html page
  let comments = document.getElementById('comments');

  // Grab date items from comment object
  const day = comment.day;
  const month = months[comment.month];
  const year = comment.year;
  let hours = comment.hours;
  let mins = comment.mins;

  // Reformat hours and mins if values are < 10
  hours < 10 ? hours = `0${hours}` : hours = hours;
  mins < 10 ? mins = `0${mins}` : mins = mins;


  // Create comment container element + give class name
  let commentContainer = document.createElement('div');
  commentContainer.classList.add('comment-container');

  // Create author element + give class name + innerHTML
  let author = document.createElement('p');
  author.classList.add('comment-author');
  author.innerHTML = comment.author;

  // Create date element + assign innerHTML
  let dateElem = document.createElement('p');
  dateElem.classList.add('comment-date');
  dateElem.innerHTML = `${month} ${day}, ${year} at ${hours}:${mins}`;

  // Create message element + give class name + innerHTML
  let message = document.createElement('p');
  message.classList.add('comment-text');
  message.innerHTML = comment.message;

  // Append 'p' elements to comment container
  commentContainer.appendChild(author);
  commentContainer.appendChild(dateElem);
  commentContainer.appendChild(message);

  // Append new comment to comments section
  comments.appendChild(commentContainer);
};

// =================== EVENT LISTENER =======================
// Call onPost function on form submit
addComment.addEventListener('click', (e) => {
  e.preventDefault();
  onPost();
});

// ================== CUSTOM OBJECT ===================
// Constructor function used to create all comment objects
function Comment(id, artId, author, message) {
  this.id = id;
  this.articleId = artId;
  this.author = author;
  this.day = new Date().getDay();
  this.month = new Date().getMonth();
  this.year = new Date().getFullYear();
  this.hours = new Date().getHours();
  this.mins = new Date().getMinutes();
  this.message = message;
};

