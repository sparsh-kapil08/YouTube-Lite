const input=document.getElementById("search");
const submit=document.getElementById("submit");
const video=document.getElementById("video");
const sort=document.getElementById("sort");

async function get(value, count) {
    try {
        const response = await fetch(`http://localhost:3000/search?count=${count}&value=${encodeURIComponent(value)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data1 = await response.json();
        return data1;
    } catch (error) {
        console.error("Failed to fetch videos:", error);
        video.innerHTML = `<p class="error-message">Sorry, we couldn't fetch videos. Please try again later.</p>`;
        return null;
    }
}

submit.addEventListener("click", async ()=>{
    const value = input.value;
    // Default to 10 results if no value is selected
    const count = sort.value === 'Results' ? '10' : sort.value;
    
    video.innerHTML="";

    const searchResults = await get(value, count); 
    console.log(searchResults);
    // Only proceed if the fetch was successful and we have items
    if (!searchResults || !searchResults.items) {
        return;
    }

    searchResults.items.forEach(element => {
        // Create the main container for one video item
        const videoContainer = document.createElement("div");
        videoContainer.className = "video-container";

        // Create the wrapper that maintains the 16:9 aspect ratio
        const videoWrapper = document.createElement("div");
        videoWrapper.className = "video-wrapper";

        // Create the iframe for video playback and add it to the wrapper
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${element.id.videoId}`;
        iframe.allowFullscreen = true;
        iframe.className = "video-iframe";
        videoWrapper.appendChild(iframe);

        const title = document.createElement("h3");
        title.className = "video-title";
        title.textContent = element.snippet.title;

        // Append the video wrapper and title to the main container
        videoContainer.append(videoWrapper, title);
        video.appendChild(videoContainer);
    });  
});
