const addBookmarkBtn = document.getElementById("add-bookmark");
const modalContainer = document.getElementById("modal-container");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");
const modalForm = document.getElementById("modal-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksEl = document.getElementById("bookmarks");

let bookmarks = [];

function validate(urlValue) {
    const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!urlValue.match(regex)) {
      alert('Please provide a valid web address.');
      return false;
    }
    // Valid
    return true;
}

function storeBookmarks(){
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    showBookmarks();
}

function deleteBookmark(url){
    bookmarks.forEach((bookmark, index) =>{
        if (bookmark.url === url){
            bookmarks.splice(index, 1);
        }
    });
    storeBookmarks();
}

function showBookmarks(){
    bookmarksEl.innerHTML = "";
    bookmarks.forEach((bookmark) =>{
        const bookmarkEl = `
            <div class="bookmark">
                <i class="fa fa-close" id="delete-bookmark" onclick="deleteBookmark('${bookmark.url}')" title="Delete Bookmark"></i>
                <div class="site">
                    <img src="https://s2.googleusercontent.com/s2/favicons?domain=${bookmark.url}" width="20" alt="icon">
                    <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
                </div>
            </div>
        `;
        bookmarksEl.innerHTML += bookmarkEl;
    });
}

function getBookmarks(){
    if(!localStorage.getItem("bookmarks") || localStorage.getItem("bookmarks").length === 2){
        bookmarks = [{
            name: "mdarora Github",
            url:"https://github.com/mdarora"
        }];
        storeBookmarks();
    } else {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    }
    showBookmarks();
}


function saveBookmarks(event){
    const webName = websiteNameEl.value;
    let webUrl = websiteUrlEl.value;

    if (!webName || !webUrl) {
      alert('Please submit values for both fields.');
      return false;
    }
    if (!webUrl.includes("http://", "https://")){
        webUrl = `http://${webUrl}`;
    }
    if(!validate(webUrl)){
        return;
    }
    const bookmark = {
        name: webName,
        url:webUrl
    }
    bookmarks.push(bookmark);
    storeBookmarks();
}






function closeModal(){
    modalContainer.classList.remove("show-modal");
}


modalForm.addEventListener("submit", saveBookmarks);

addBookmarkBtn.addEventListener("click", ()=>{
    modalContainer.classList.add("show-modal");
    modal.classList.replace("close-anime", "show-anime");
    modal.removeEventListener("animationend", closeModal);

});
closeModalBtn.addEventListener("click", ()=>{
    modal.classList.replace("show-anime", "close-anime");
    modal.addEventListener("animationend", closeModal);
});


getBookmarks();