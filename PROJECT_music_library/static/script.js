function addSong() {
    fetch("/add_song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title.value,
            artist: artist.value,
            url: url.value
        })
    })
    .then(res => res.json())
    .then(d => alert(d.message));
}

function searchSong() {
    fetch(`/search?q=${search.value}`)
    .then(res => res.json())
    .then(data => {
        result.innerHTML = "";
        data.forEach(song => {
            let div = document.createElement("div");
            div.className = "song";
            div.innerHTML = `
                ${song.title} - ${song.artist}
                <button onclick="playYouTube('${song.url}')">▶ Play</button>
                <button onclick="fav(${song.id})">❤️</button>
            `;
            result.appendChild(div);
        });
    });
}

function playYouTube(link) {
    if (!link) {
        alert("No YouTube link found");
        return;
    }

    let videoId = "";

    // Clean link (remove spaces)
    link = link.trim();

    // youtube.com/watch?v=
    if (link.includes("watch?v=")) {
        videoId = link.split("watch?v=")[1].split("&")[0];
    }
    // youtu.be/
    else if (link.includes("youtu.be/")) {
        videoId = link.split("youtu.be/")[1].split("?")[0];
    }
    // youtube shorts
    else if (link.includes("youtube.com/shorts/")) {
        videoId = link.split("youtube.com/shorts/")[1].split("?")[0];
    }

    if (videoId) {
        document.getElementById("ytplayer").src =
            `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else {
        alert("Invalid YouTube link. Please use a full YouTube video URL.");
    }
}

function fav(id) {
    fetch(`/favorite/${id}`)
    .then(() => alert("Added to Library"));
}

function loadLibrary() {
    fetch("/library")
    .then(res => res.json())
    .then(data => {
        library.innerHTML = "";
        data.forEach(song => {
            let div = document.createElement("div");
            div.innerHTML = `
                ${song.title}
                <button onclick="playYouTube('${song.url}')">▶ Play</button>
            `;
            library.appendChild(div);
        });
    });
}
