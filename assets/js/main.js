/*=============== SHOW SIDEBAR ===============*/
const showSidebar = (toggleId, sidebarId, headerId, mainId) =>{
   const toggle = document.getElementById(toggleId),
         sidebar = document.getElementById(sidebarId),
         header = document.getElementById(headerId),
         main = document.getElementById(mainId)

   if(toggle && sidebar && header && main){
       toggle.addEventListener('click', ()=>{
           /* Show sidebar */
           sidebar.classList.toggle('show-sidebar')
           /* Add padding header */
           header.classList.toggle('left-pd')
           /* Add padding main */
           main.classList.toggle('left-pd')
       })
   }
}
showSidebar('header-toggle','sidebar', 'header', 'main')

/*=============== LINK ACTIVE ===============*/
const sidebarLink = document.querySelectorAll('.sidebar__list a')

function linkColor(){
    sidebarLink.forEach(l => l.classList.remove('active-link'))
    this.classList.add('active-link')
}

sidebarLink.forEach(l => l.addEventListener('click', linkColor))

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-fill'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-clear-fill' : 'ri-sun-fill'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-clear-fill' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})


// Wait for 5 seconds before showing the content
window.onload = function() {

    setTimeout(function() {
        // Add fade-out effect to loading screen
        document.getElementById("loading").classList.add("fade-out");

        // Wait for the fade-out to complete, then show the content
        setTimeout(function() {
            document.getElementById("loading").style.display = "none"; // Hide loading screen
            document.getElementById("content").style.display = "block"; // Show main content
            document.getElementById("content").classList.add("fade-in"); // Fade in content
        }, 1000); // Wait for the fade-out transition (1s)
        
    }, 3100); // 3100ms = 3.1 seconds
};

function toggleChat() {
    const chat = document.getElementById('chatBox');
  
    if (chat.classList.contains('show')) {
      chat.classList.remove('show');
      chat.classList.add('hide');
  
      // Wait for animation to finish, then hide completely
      setTimeout(() => {
        chat.style.display = 'none';
        chat.classList.remove('hide');
      }, 300);
    } else {
      chat.style.display = 'flex'; // show first so animation can play
      setTimeout(() => {
        chat.classList.add('show');
      }, 10); // short delay to allow transition to trigger
    }
  }
  
  

  function selectOption(userChoice) {
    const chat = document.getElementById('chatMessages');
    const choices = document.getElementById('choiceButtons');

    // Hide buttons
    choices.style.display = "none";

    // User message
    const userMsg = document.createElement('div');
    userMsg.classList.add('chat-bubble', 'user-msg');
    userMsg.textContent = userChoice;
    chat.appendChild(userMsg);

    // Typing animation
    const typingBubble = document.createElement('div');
    typingBubble.classList.add('chat-bubble', 'ai-msg', 'typing');
    typingBubble.textContent = "InP A-1 is typing...";
    typingBubble.id = "typingBubble";
    chat.appendChild(typingBubble);

    chat.scrollTop = chat.scrollHeight;

    // Simulate typing delay
    setTimeout(() => {
      typingBubble.remove();

      const aiMsg = document.createElement('div');
      aiMsg.classList.add('chat-bubble', 'ai-msg');
      aiMsg.textContent = getAIResponse(userChoice);
      chat.appendChild(aiMsg);

      // Show choices again
      choices.style.display = "flex";

      chat.scrollTop = chat.scrollHeight;
    }, 1200);
  }

  function getAIResponse(choice) {
    switch (choice) {
      case 'Who is CEO Of InPanels?':
        return 'Kuruto is an CEO of InPanels Company, he selling a panel for whatsapp bot. also the price its very cheap.';
      case 'Who is DREVVIANN?':
        return 'DREVVIANN is an logo designer, and web development, also he its partner of the CEO.';
      case 'Are there any active discounts?':
        return 'We have no discount active today.';
      case 'I got a bug on the website':
        return 'You can contact us on the Contact Menu on the navigation bar. Thanks for helping us to finding a bug on the website✨';
      default:
        return 'Hmm... I’m not sure about that one.';
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
  
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
    .then(response => {
      if (response.ok) {
        showToast("✅ Message sent successfully!");
        form.reset();
      } else {
        showToast("❌ Failed to send. Try again later.");
      }
    })
    .catch(() => {
      showToast("⚠️ Network error. Please try again.");
    });
  }
  
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach(button => {
    button.addEventListener("click", () => {
      const text = button.getAttribute("data-text");

      navigator.clipboard.writeText(text).then(() => {
        button.textContent = "✅ Copied!";
        setTimeout(() => {
          button.textContent = "📋 Copy Link";
        }, 1500);
      }).catch(err => {
        console.error("Failed to copy:", err);
        button.textContent = "❌ Error";
      });
    });
  });

  // Firebase config (replace with your own)
  const firebaseConfig = {
    apiKey: "AIzaSyA88e3gkmSPTwjKHyt666SbXuUWrFZyEOM",
    authDomain: "globalchat-5a12d.firebaseapp.com",
    projectId: "globalchat-5a12d",
    storageBucket: "globalchat-5a12d.firebasestorage.app",
    messagingSenderId: "178185092787",
    appId: "1:178185092787:web:fb1c8fd006c26886aa3ac6"
  };

// Init
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const stars = document.querySelectorAll('.star');
const ratingCountEl = document.getElementById('ratingCount');
const averageRatingDisplay = document.getElementById('averageRatingDisplay');

// Real-time average rating
firebase.firestore().collection("ratings").onSnapshot(snapshot => {
  const ratings = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.rating) ratings.push(data.rating);
  });

  const totalRatings = ratings.length;
  const average = ratings.reduce((a, b) => a + b, 0) / totalRatings || 0;
  const roundedAvg = (Math.round(average * 10) / 10).toFixed(1);
  averageRatingDisplay.textContent = `⭐ ${roundedAvg} of ${totalRatings} rating${totalRatings !== 1 ? 's' : ''}`;
});

stars.forEach((star, index) => {
  star.addEventListener('mouseover', () => {
    if (localStorage.getItem('hasRated')) return;
    highlightStars(index + 1, true);
  });

  star.addEventListener('mouseout', () => {
    if (localStorage.getItem('hasRated')) {
      highlightStars(parseInt(localStorage.getItem('userRating')));
    } else {
      resetStars();
    }
  });

  star.addEventListener('click', () => {
    if (localStorage.getItem('hasRated')) {
      showPopup('error', '❌ You have already rated!');
      return;
    }

    const rating = index + 1;

    localStorage.setItem('hasRated', true);
    localStorage.setItem('userRating', rating);

    db.collection('ratings').add({
      rating: rating,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      highlightStars(rating);
      disableStarEvents();
      showPopup('success', `✅ You rated ${rating} star${rating > 1 ? 's' : ''}`);
    }).catch((error) => {
      console.error("Error saving to Firestore:", error);
      showPopup('error', '⚠️ Failed to submit rating.');
    });
  });
});

function disableStarEvents() {
  stars.forEach(star => {
    star.style.pointerEvents = 'none'; // disables all interaction
    star.classList.remove('hovered');  // remove hover effect if any
    star.classList.add('disabled');
  });
}

function highlightStars(count, isHover = false) {
  stars.forEach((star, i) => {
    if (i < count) {
      star.classList.add(isHover ? 'hovered' : 'selected');
      if (!isHover) star.classList.remove('hovered');
    } else {
      star.classList.remove('hovered', 'selected');
    }
  });
}

function resetStars() {
  stars.forEach(star => {
    star.classList.remove('hovered', 'selected');
  });
}


function showPopup(type, message) {
  const popup = document.getElementById(`${type}Popup`);
  popup.textContent = message;
  popup.classList.add('show');

  setTimeout(() => {
    popup.classList.remove('show');
  }, 3000);
}

const hasRated = localStorage.getItem('hasRated');
if (hasRated) {
  highlightStars(parseInt(localStorage.getItem('userRating')));
}
