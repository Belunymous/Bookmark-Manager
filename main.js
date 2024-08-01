
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
function removeBookmark(thisItem) {
    let arrayItems = [],
        index,
        item = thisItem.parentNode,
        itemURL = item.querySelector(".visit").dataset.link,
        itemName = item.querySelector("span").innerHTML;
    arrayItems = localStorage.bookmark.split(";");

    for (i in arrayItems) {
        if (arrayItems[i] == `${itemName},${itemURL}`) {
            index = i;
            break;
        }
    }

    
    index = arrayItems.indexOf(`${itemName},${itemURL}`);
    arrayItems.splice(index, 1);
    localStorage.bookmark = arrayItems.join(";");

   
    bookmarksSection.removeChild(item);
}

function editBookmark(thisItem) {
    let item = thisItem.parentNode;
    let itemName = item.querySelector(".bookmark-name").innerHTML;
    let itemURL = item.querySelector(".visit").dataset.link;

    // Pre-fill the input fields with the existing bookmark details
    siteName.value = itemName;
    url.value = itemURL;

    // Remove the existing bookmark
    removeBookmark(thisItem);
}

function sortBookmarks() {
    let bookmarks = [];
    let arrayItems = localStorage.bookmark.split(";");
    arrayItems.length--;

    // Collect bookmarks from localStorage
    for (let item of arrayItems) {
        let itemSpli = item.split(',');
        bookmarks.push({ name: itemSpli[0], url: itemSpli[1] });
    }

    // Sort bookmarks by name
    bookmarks.sort((a, b) => a.name.localeCompare(b.name));

    // Clear the bookmarks section and localStorage
    bookmarksSection.innerHTML = "";
    localStorage.bookmark = "";

    // Add sorted bookmarks back to localStorage and the bookmarks section
    for (let bookmark of bookmarks) {
        localStorage.bookmark += `${bookmark.name},${bookmark.url};`;
        addBookmark(bookmark.name, bookmark.url);
    }
}

sortButton.addEventListener("click", sortBookmarks);