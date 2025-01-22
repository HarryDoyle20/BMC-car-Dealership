// Jenkins API URL (replace <jenkins-server> and <job-name>)
const jenkinsUrl = "http://<your-jenkins-server>/job/<job-name>/api/json";

// Function to fetch Jenkins job data
async function fetchJenkinsData() {
    try {
        const response = await fetch(jenkinsUrl, {
            headers: {
                "Authorization": "Basic " + btoa("username:api_token") // Replace with Jenkins username and API token
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Extract job details
        const jobName = data.displayName;
        const jobStatus = data.color; // e.g., "blue", "red", "notbuilt", "anime"

        const jenkinsData = document.getElementById("jenkins-data");
        if (jobStatus === "blue" || jobStatus === "blue_anime") {
            jenkinsData.innerHTML = `<div class="success">✅ Pipeline: ${jobName} - Success</div>`;
        } else if (jobStatus === "red" || jobStatus === "red_anime") {
            jenkinsData.innerHTML = `<div class="failure">❌ Pipeline: ${jobName} - Failure</div>`;
        } else if (jobStatus.includes("anime")) {
            jenkinsData.innerHTML = `<div class="running">🔄 Pipeline: ${jobName} - Running</div>`;
        } else {
            jenkinsData.innerHTML = `<div class="error">ℹ️ Pipeline: ${jobName} - Unknown Status</div>`;
        }
    } catch (error) {
        document.getElementById("jenkins-data").innerHTML = `<div class="error">Error fetching Jenkins data: ${error.message}</div>`;
    }
}

// Fetch Jenkins data when the page loads
fetchJenkinsData();
