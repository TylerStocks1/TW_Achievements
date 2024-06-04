document.getElementById("playerForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    
    const playerName = document.getElementById("playerName").value;
    const playerPointsContainer = document.getElementById("playerPoints");

    try {
        const response = await fetch(`http://localhost:3000/playerPoints?playerName=${playerName}`);

        if (!response.ok) {
            throw new Error('Error fetching player points');
        }
        const playerPoints = await response.json();
        
        // Format and display player points
        const formattedPoints = playerPoints.map(point => {
            return `<p>${point}</p>`;
        }).join('');
        
        playerPointsContainer.innerHTML = formattedPoints;
    } catch (error) {
        console.error('Error:', error);
        playerPointsContainer.textContent = 'Error fetching player points';
    }
});
