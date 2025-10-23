const input=document.getElementById("search");
const submit=document.getElementById("submit");
const video=document.getElementById("video");
const sort=document.getElementById("sort");


async function get(value,count){
    const response= await fetch(`http://localhost:3000/search?count=${count}&value=${encodeURIComponent(value)}`)
    const data1=await response.json();
    return await data1;
}
submit.addEventListener("click", async ()=>{
    value=input.value;
    count=sort.value;
    console.log(count);
    x=await get(value,count); 
    console.log(x)
    id=x.items[0].id.videoId;
    video.innerHTML="";

    x.items.forEach(element => {
        // Create the main container for one video item
        const videoContainer = document.createElement("div");
        videoContainer.className = "video-container";

        // Create the wrapper that maintains the 16:9 aspect ratio
        const videoWrapper = document.createElement("div");
        videoWrapper.className = "video-wrapper";

        // Create the iframe for video playback
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${element.id.videoId}`;
        iframe.allowFullscreen = true
        iframe.className="video-iframe"
        videoWrapper.appendChild(iframe);

        const title = document.createElement("h3");
        title.className = "video-title";
        title.textContent = element.snippet.title;

        // Append the video wrapper and title to the main container
        videoContainer.append(videoWrapper, title);
        video.appendChild(videoContainer);
    });  
});
//