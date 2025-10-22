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
        const container=document.createElement("div");
        // These styles create a responsive container for each iframe
        container.className="video-container";
        container.style.position = 'relative';
        container.style.paddingBottom = '20.25%'; // 16:9 aspect ratio
        container.style.height = '0';
        container.style.overflow = 'hidden';
        container.style.marginBottom = '20px'; // Space between videos
        video.appendChild(container);
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${element.id.videoId}`;
        iframe.allowFullscreen = true
        iframe.className="video-iframe"
        container.appendChild(iframe);
    });  
});
//