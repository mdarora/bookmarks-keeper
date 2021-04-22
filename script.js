const addBookmarkBtn = document.getElementById("add-bookmark");
const modalContainer = document.getElementById("modal-container");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");

function closeModal(){
    modalContainer.classList.remove("show-modal");
}
addBookmarkBtn.addEventListener("click", ()=>{
    modalContainer.classList.add("show-modal");
    modal.classList.replace("close-anime", "show-anime");
    modal.removeEventListener("animationend", closeModal);

});
closeModalBtn.addEventListener("click", ()=>{
    modal.classList.replace("show-anime", "close-anime");
    modal.addEventListener("animationend", closeModal);
});
