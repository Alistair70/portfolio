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

document.getElementById("submit").addEventListener("click", function(event) {
  event.preventDefault();
  // Gets user inputted credentials from form
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var mess = document.getElementById('message').value;

  // Checks if username feild is blank
  if(name === "")
  {
      document.getElementById("output").innerHTML = "Enter Name";
  }
  //Check if password feild is blank
  else if(email === "")
  {
      document.getElementById("output").innerHTML = "Enter Email";
  }

  else if(mess === "")
    {
        document.getElementById("output").innerHTML = "Enter Message";
    }

  //If checks are cleared request is sent to backend to validate credentials
  else{
      fetch('https://main-py-server.onrender.com/save_massage', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name:name, email:email, mess:mess })
      })
      .then(response => response.json())
      .then(data => 
      {
          document.getElementById('name').value = '';
          document.getElementById('email').value = '';
          document.getElementById('message').value = '';
      })
      }
});

document.getElementById("exp_tr_demo").addEventListener("click", function() {
    window.open('https://landing.expense-tracker-demo.site/', '_blank');
});
document.getElementById("exp_tr_repo").addEventListener("click", function() {
    window.open('https://github.com/Alistair70/expense_tracker', '_blank');
});
document.getElementById("st_repo").addEventListener("click", function() {
    window.open('https://github.com/Alistair70/stock_tracker', '_blank');
});
document.getElementById("rpg_demo").addEventListener("click", function() {
    window.open('https://ac-random-pw-gen.netlify.app', '_blank');
});
document.getElementById("rpg_repo").addEventListener("click", function() {
    window.open('https://github.com/Alistair70/random-pw-gen', '_blank');
});