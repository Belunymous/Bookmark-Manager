
let button = document.querySelector(".save_button");
let sortButton = document.querySelector(".sort_button");


let siteName = document.querySelector("[name='site_name']");
let url = document.querySelector("[name='url']");


let bookmarksSection = document.querySelector(".bookmarks");

if (typeof (localStorage.bookmark) == "undefined") {
    localStorage.bookmark = "";
}
button.addEventListener("click", function (e) {
    
    e.preventDefault();

    let patternURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

    let arrayItems, check = false, adr, itemAdr;

    
    if (siteName.value === "") {
        alert("You must fill the site name input");
    } else if (url.value === "") {
        alert("You must fill the URL input");
    } else if (!patternURL.test(url.value)) {
        alert("You must enter a valid URL");
    } else {
        arrayItems = localStorage.bookmark.split(";");
        adr = url.value;
        adr = adr.replace(/http:\/\/|https:\/\//i, "");
        arrayItems.length--;

        
        for (item of arrayItems) {
            itemAdr = item.split(',')[1].replace(/http:\/\/|https:\/\//i, "");
            if (itemAdr == adr) {
                check = true;
            }
        }

        if (check == true) {
            alert("This website is already bookmarked");
        } else {
            
            localStorage.bookmark += `${siteName.value},${url.value};`;
            addBookmark(siteName.value, url.value);
            siteName.value = "";
            url.value = "";
        }
    }
});

function addBookmark(name, url) {
    let dataLink = url;

    // After obtaining a bookmark, we display it in a div and add
    // a button to visit the link, edit it, or delete it
    if (!url.includes("http")) {
        url = "//" + url;
    }
    let item = `<div class="bookmark">
                 <span class="bookmark-name">${name}</span>
                 <a class="visit" href="${url}" target="_blank" 
                    data-link='${dataLink}'>Visit</a>
                 <a onclick="editBookmark(this)" 
                    class="edit" href="#">Edit</a>
                 <a onclick="removeBookmark(this)" 
                    class="delete" href="#">Delete</a>
                </div>`;
    bookmarksSection.innerHTML += item;
}
(function fetchBookmark() {
    if (typeof (localStorage.bookmark) != "undefined" && localStorage.bookmark !== "") {
        let arrayItems = localStorage.bookmark.split(";");
        arrayItems.length--;
        for (item of arrayItems) {
            let itemSplit = item.split(',');
            addBookmark(itemSplit[0], itemSplit[1]);
        }
    }
})();