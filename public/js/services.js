export function createNote() {
    let notenum = Math.random();
    let iDiv = document.getElementById("keep-display");
    let note = document.createElement("ul");
    note.className = "note colu mx-3";
    note.id = notenum;
    let noteTitle = document.createElement("div");
    noteTitle.className = "note-title";
    
    let closeBtn = document.createElement("button");
    closeBtn.className = "close";
    closeBtn.innerHTML = "&times;";
    closeBtn.id = notenum;
    
    note.appendChild(closeBtn);
    note.appendChild(noteTitle);
    closeBtn.onclick = function() {
        delFromDB(notenum);
    }
    let num = document.getElementById("note-form").children;
    let title = num[0];
    noteTitle.innerHTML = title.firstElementChild.value;
    let childlist = num[2].childNodes;
    let length = childlist.length;
    let toAdd = {
        id: notenum,
        "title": title.firstElementChild.value,

    }
    for (let child in childlist) {
        if (child <= length) {
            let listitem = document.createElement("li");
            listitem.className = "display-list-item";
            let span = document.createElement('span');
            let button = document.createElement('button');
            button.className = `close`;
            button.innerHTML = `&times;`;
            span.appendChild(button);
                        // `<span><button class='close' id='close+${json}+'>&times;</button></span>`;
            listitem.appendChild(span);
            listitem.style.fontSize = "20px";
            listitem.style.fontWeight = "bold";
            listitem.innerHTML = childlist[child].firstElementChild.value;
            toAdd[child] = {
                content : childlist[child].firstElementChild.value,
                // checked : false
            }
            note.appendChild(listitem);
        }

    }

    iDiv.appendChild(note);
    // document.getElementById(note.id).onclick = function() {
    //     popModal(note.id);
    // }
    document.getElementById("note-form").reset();
    return toAdd;
}

export function addtoDB(jsondata) {
    let action = {
        method: "POST",
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(jsondata)
    }
    let url = "http://localhost:3000/notes/"
    fetch(url, action)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            console.log(data);
            // data.map(function(val) {
            //     console.log(val);
            // });
        });
}

export function delOneFromDB(num , key) {
    let action = {
        method: "GET"
    }
    let url = "http://localhost:3000/notes/"+ num;
    return fetch(url, action)
        .then((resp) => resp.json()) // Transform the data into json
        .then(data => {
            console.log(data[key]); 
            delete data[key];
        })
        .catch(e => console.log(`ERROR:: ${e}`));
}

export function delFromDB(num) {
    let action = {
        method: "DELETE"
    }
    let url = "http://localhost:3000/notes/"+num;
    fetch(url, action)
        .then((resp) => resp.json()) // Transform the data into json
        .then(data => {
            getAllFromDB();
        })
        .catch(e => console.log(`ERROR:: ${e}`));
}

export function getOneFromDB(num) {
    let action = {
        method: "GET"
    }
    let url = "http://localhost:3000/notes/"+ num;
    return fetch(url, action)
        .then((resp) => resp.json()); // Transform the data into json
        
}

export function getAllFromDB() {
    let iDiv = document.getElementById("keep-display");
    iDiv.innerHTML="";
    let action = {
        method: "GET"
    }
    let url = "http://localhost:3000/notes";
    return fetch(url, action)
        .then((resp) => resp.json()) // Transform the data into json
        .then(data => {
            data.map(function (data) {
                console.log(data);
                let note = document.createElement("ul");
                note.className = "note colu mx-3";
                note.id = data.id;
                let noteTitle = document.createElement("div");
                noteTitle.className = "note-title";
                let closeBtn = document.createElement("button");
                closeBtn.className = "close";
                closeBtn.id = data.id;
                closeBtn.innerHTML = "&times;";
                
                note.appendChild(closeBtn);
                note.appendChild(noteTitle);
                closeBtn.onclick = function() {
                    delFromDB(data.id);
                }
                noteTitle.innerHTML = data.title;
                for (let json in data) {
                    if (!isNaN(json)) {
                        console.log(json);
                        let listitem = document.createElement("li");
                        listitem.className = "display-list-item";
                        // listitem.innerHTML = data[json].content;

                        listitem.innerHTML = data[json].content;

                        let span = document.createElement('span');
                        let button = document.createElement('button');
                        button.className = `close`;
                        button.innerHTML = `&times;`;
                        span.appendChild(button);
                        // `<span><button class='close' id='close+${json}+'>&times;</button></span>`;
                        listitem.appendChild(span);
                        listitem.style.fontSize = "20px";
                        listitem.style.fontWeight = "bold";
                        //listitem.innerHTML = data[json];
                        note.appendChild(listitem);
                        button.onclick = function() {
                            console.log("inside");
                            delOneFromDB(data.id , json);
                        }
                    }
                }
                iDiv.appendChild(note);
                // document.getElementById(note.id).onclick = function() {
                //     popModal(note.id);
                // }
            });
        });
        // .catch(e => console.log(`ERROR:: ${e}`));

}
