document.getElementById("playerForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    
    const playerName = document.getElementById("playerName").value;
    const playerPointsContainer = document.getElementById("playerPoints");
    const loadingSpinner = document.getElementById("loadingSpinner");

    // Show the loading spinner
    loadingSpinner.style.display = 'block';

    try {
        const response = await fetch(`http://localhost:3000/playerPoints?playerName=${playerName}`);

        if (!response.ok) {
            throw new Error('Error fetching player points');
        }

        const playerPoints = await response.json();

        // Format and display player points
        const formattedPoints = Array.isArray(playerPoints) ? playerPoints.map(point => `<p>${point}</p>`).join('') : 'No player points found';
        playerPointsContainer.innerHTML = formattedPoints;
    } catch (error) {
        console.error('Error:', error);
        playerPointsContainer.textContent = 'Error fetching player points';
    } finally {
        // Hide the loading spinner after a short delay to show completion
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
        }, 500);
    }
});

// Handling the case when server does not respond after 1 minute
setTimeout(() => {
    const loadingSpinner = document.getElementById("loadingSpinner");
    const playerPointsContainer = document.getElementById("playerPoints");

    if (loadingSpinner.style.display === 'block') {
        loadingSpinner.style.display = 'none';
        playerPointsContainer.textContent = 'No results found for the entered player name.';
    }
}, 30000); // 1 minute
