const input=document.getElementById("search");
const submit=document.getElementById("submit");
const video=document.getElementById("video");

async function get(value){
    const response= await fetch(`http://localhost:3000/search?value=${encodeURIComponent(value)}`)
    const data1=await response.json();
    return await data1;
}
submit.addEventListener("click", async ()=>{
    value=input.value;
    console.log(value);
    x=await get(value); 
    console.log(x)
    id=x.items[0].id.videoId;
    video.innerHTML="";

    x.items.forEach(element => {
        const container=document.createElement("div");
        container.className="video-container";
        video.appendChild(container);
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${element.id.videoId}`;
        iframe.allowFullscreen = true
        iframe.className="video-iframe"
        container.appendChild(iframe);
        document.createElement("br");

    });  
});
//