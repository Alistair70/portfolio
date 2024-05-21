var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

var modal = document.getElementById("myModal");
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");
var currentImageIndex;
var currentGroup;

// Open the modal and display the clicked image
function openModal(element, group) {
    var images = document.querySelectorAll(`.image-group[data-group='${group}'] .thumbnail`);
    currentImageIndex = Array.from(images).indexOf(element);
    currentGroup = group;
    updateModal(element);
    modal.style.display = "block";
}

function updateModal(element) {
    modalImg.src = element.src.replace('_thumbnail', ''); // Replace '_thumbnail' to get the larger image URL
    captionText.innerHTML = element.alt;
}

// Close the modal
function closeModal() {
    modal.style.display = "none";
}

// Change the image within the modal
function changeImage(direction) {
    var images = document.querySelectorAll(`.image-group[data-group='${currentGroup}'] .thumbnail`);
    console.log(currentGroup)
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    updateModal(images[currentImageIndex]);
}

// Close the modal when clicking outside of the image
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}