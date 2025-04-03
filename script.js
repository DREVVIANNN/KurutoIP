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
        
    }, 1500); // 3100ms = 3.1 seconds
};

function toggleMenu() {
    const menu = document.getElementById("menu");
    const overlay = document.getElementById("menuOverlay");

    menu.classList.toggle("open");
    overlay.classList.toggle("active");

    // Close menu when clicking on overlay
    overlay.onclick = () => {
        menu.classList.remove("open");
        overlay.classList.remove("active");
    };
}
