

async function updateForm() {
    //if the default 'select' option is reselected, make all fields blank
    if(document.getElementById("updateGameSelect").value == "") {
        document.querySelector("#upStudioSelect").value = "";
        document.querySelector("#upTitle").value = "";
        document.querySelector("#upPublishDate").value = "";
        document.querySelector("#upPrice").value = "";
        return;
    }
    let gameID = document.getElementById("updateGameSelect").value;

    //fetch query
    console.log("updating form for game "+gameID);
    const response = await fetch("/Games/"+gameID);
    
    const game = await response.json();
    console.log(game);

    // get studio information from game's studioID
    const getStudio = await fetch("/Studios/"+game.studioID);
    const studio = await getStudio.json();

    // Fill fields with query values
    document.querySelector("#upStudioSelect").value = game.studioID;
    document.querySelector("#upTitle").value = game.title;
    document.querySelector("#upPublishDate").value = game.publishDate.split('T')[0];
    document.querySelector("#upPrice").value = game.price;
}