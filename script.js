const FOOTBALL_API_KEY = 'YOUR_FOOTBALL_DATA_API_KEY';
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';
const BARCA_ID = 81; // FC Barcelona's ID in Football-Data.org

// 1. Fetch Barça Match/Standing Info
async function fetchBarcaData() {
    try {
        const response = await fetch(`https://api.football-data.org/v4/teams/${BARCA_ID}/matches?status=SCHEDULED&limit=1`, {
            headers: { 'X-Auth-Token': FOOTBALL_API_KEY }
        });
        const data = await response.json();
        const nextMatch = data.matches[0];
        
        document.getElementById('status-container').innerHTML = `
            <p><strong>Next Game:</strong> vs ${nextMatch.awayTeam.name}</p>
            <p><strong>Kickoff:</strong> ${new Date(nextMatch.utcDate).toLocaleString()}</p>
        `;
    } catch (error) {
        console.error("Error fetching sports data:", error);
    }
}

// 2. Integration with GPT-4
async function askAI() {
    const prompt = document.getElementById('user-input').value;
    const chatWindow = document.getElementById('chat-window');

    // In a real app, you'd fetch Google Calendar events here first 
    // and pass them as text to the GPT-4 prompt.
    const mockCalendarData = "Meeting at 4 PM, Gym at 6 PM."; 

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [
                { role: "system", content: `You are a helpful assistant. Here is the user's calendar: ${mockCalendarData}` },
                { role: "user", content: prompt }
            ]
        })
    });

    const aiData = await response.json();
    chatWindow.innerHTML += `<p><strong>You:</strong> ${prompt}</p>`;
    chatWindow.innerHTML += `<p><strong>AI:</strong> ${aiData.choices[0].message.content}</p>`;
}

window.onload = fetchBarcaData;
