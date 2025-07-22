// 9/10 my best cleanest one yet
// looks like dogshit maybe clean up later
const bookshelfDiv = document.getElementById('bookshelf')
const bookName = document.getElementById('bookName')
const authorName = document.getElementById('authorName')
const pagesRead = document.getElementById('pagesRead')
const totalPages = document.getElementById('totalPages')
const score = document.getElementById('score')
const remove = document.getElementById('remove')
const removeButton = document.getElementById('removeButton')
const submit = document.getElementById('submit')
const form = document.getElementById('form')
const reset = document.getElementById('reset')

const books = document.createElement('div') //create html element
books.classList.add('books')
//      ^ adding the class 'books' to the createElem books
const bookNameDiv = document.createElement('div')
bookNameDiv.classList.add('bookNameDiv')
const authorNameDiv = document.createElement('div')
authorNameDiv.classList.add('authorNameDiv')
const pagesReadDiv = document.createElement('div')
pagesReadDiv.classList.add('pagesReadDiv')
const totalPagesDiv = document.createElement('div')
totalPagesDiv.classList.add('totalPagesDiv')
const scoreDiv = document.createElement('div')
scoreDiv.classList.add('scoreDiv')

const emptyStarPic = document.createElement('img')
emptyStarPic.src = './pic/star/empty star.svg'
emptyStarPic.classList.add('stars')
const halfStarPic = document.createElement('img')
halfStarPic.src = './pic/star/half star.svg'
halfStarPic.classList.add('stars')
const fullStarPic = document.createElement('img')
fullStarPic.src = './pic/star/full star.svg'
fullStarPic.classList.add('stars')

const trashPic = document.createElement('img')
trashPic.src = './pic/trash/trash first.svg' //make it become trash second with css?
trashPic.classList.add('trashPic')

const bookmarkPic = document.createElement('img')
bookmarkPic.src = './pic/bookmark/empty bookmark.svg' //'full boomark' with css
bookmarkPic.classList.add('bookmarkPic')

const readDiv = document.createElement('div')
readDiv.classList.add('readDiv')
const readingStatus = document.createElement('div')
readingStatus.classList.add('readingStatus')
const readingPercent = document.createElement('div')
readingPercent.classList.add('readingPercent')

let bookAmount = 0;
const bookshelfArr = []
let indexArr = []
let newBook = {}
let keys = [bookNameDiv, authorNameDiv, pagesReadDiv, totalPagesDiv]


                                                // quest
                                                    // make the 5 stars fill up depending on score

submit.addEventListener('click', function(a) {
    a.preventDefault() // to prevent the submit button from actually submitting and messing shit up
    if (Number(pagesRead.value) <= Number(totalPages.value) && score.value <=5 && score.value >=0 && 
    bookName.value != '' && authorName.value != '' && Number(totalPages.value) != 0 && Number(pagesRead.value) >= 0
    && totalPages.value >= 0) {
//   object that these keys and values will go into
//     v
//     v     key of object
//     v        v
//     v        v            value
//     v        v              v
    newBook['bookName'] = bookName.value
    newBook['authorName'] = authorName.value
    newBook['pagesRead'] = pagesRead.value
    newBook['totalPages'] = totalPages.value
    newBook['score'] = score.value
    newBook['index'] = bookAmount
    newBook['bookmarkStatus'] = false;

    bookshelfArr.push({...newBook}) // add the books with the values to bookshelfArr
                    //  ^ spread operator and {} fucking clones the thing which prevents all the 
                    //                            book values from changing when adding a new book (ref to extra.js)
                    //              (clones for some reason idfk?)
//                  v APPENDCHILD DOES NOT COPY WHEN USED IN DIFFERENT THINGS, YOU NEED TO CLONE THEM!!!!!!!!!!!!!!!!!
    bookshelfDiv.appendChild(books.cloneNode(true)) // putting an empty book in the shelf

    document.querySelectorAll('.books')[bookAmount].appendChild(bookmarkPic.cloneNode(true))
    document.querySelectorAll('.books')[bookAmount].appendChild(trashPic.cloneNode(true))
    
    for (let i = 0; i < keys.length; i++) { // creating texts and making them children to the book div
        keys[i].textContent = Object.values(newBook)[i] //text content comes before appending !!!!!
        document.querySelectorAll('.books')[bookAmount].appendChild(keys[i].cloneNode(true))
    }
    // ^^^ this is what the loop is looping through (i can shorten stuff now woo)
    // bookNameDiv.textContent = bookName.value;// text in bookNameDiv
    // document.querySelectorAll('.books')[bookAmount].appendChild(bookNameDiv.cloneNode(true)) //nesting bookNameDiv in books
    
    document.querySelectorAll('.books')[bookAmount].appendChild(readDiv.cloneNode(true))
    
    readingPercent.textContent = Math.round((pagesRead.value/totalPages.value)*1000)/10 + '%'
    document.querySelectorAll('.readDiv')[bookAmount].appendChild(readingPercent.cloneNode(true))

    if (pagesRead.value != totalPages.value) {
        if (pagesRead.value != 0) {
            readingStatus.textContent = 'Reading'
        }   else {
            readingStatus.textContent = `Haven't Started`
        }
    }   else {
        readingStatus.textContent = 'Finished'
    }
    document.querySelectorAll('.readDiv')[bookAmount].appendChild(readingStatus.cloneNode(true))
    indexArr = []
    for (let i in bookshelfArr) {
        indexArr.push(bookshelfArr[i]['index'])
    }
    let bookmarkArr = Array.from(document.querySelectorAll('.bookmarkPic')); //absolute nightmare to make
    for (let i = 0; i < bookshelfArr.length; i++) {
        const oldEl = bookmarkArr[i]; //                    v since you can have multiple listeners on an element which is fucked
        const newEl = oldEl.cloneNode(true); // to clear event listener since even clonenode(true) doesnt clone listeners)
        //                  v has to be this one because its linked to the original index
        newEl['index'] = indexArr[i] // adding indexes to the bookmark elements (IMPORTANT) 

        newEl.addEventListener('click', function () {
            bookmarkArr = Array.from(document.querySelectorAll('.bookmarkPic')); //updating bookmarkArr
            indexArr = [] //first step of updating indexArr (clearing it out)
            for (let i in bookshelfArr) {
                indexArr.push(bookshelfArr[i]['index'])// second step (pushing shit in)
                bookmarkArr[i].index = indexArr[i] //using indexArr array as a ref to update bookmark array index
            }
            if (bookshelfArr[this.index].bookmarkStatus) {
            bookshelfArr[this.index].bookmarkStatus = false;
            }   else {
            bookshelfArr[this.index].bookmarkStatus = true;
            }
            console.log(bookshelfArr);
            console.log(indexArr);

            if (bookshelfArr[this.index].bookmarkStatus == true) {
                bookmarkArr[i].src = './pic/bookmark/full bookmark.svg' //credits to gpt, GENIUS, thank fuck i didnt have to redo all the code
            }   else {
                bookmarkArr[i].src = './pic/bookmark/empty bookmark.svg'
            }
        });
        oldEl.parentNode.replaceChild(newEl, oldEl); //important, replaces the oldEl with the new one because we dont want old (multiple listeners) so we use newEl instead
        // replaceChild is like (removeChild + appendChild) but replaceChild doesnt fuck up the dom since if you append it will be at the place you appended unlike replace
        // dont want replaceChild and just want a replace? use replaceWith!!! ( oldStuff.replaceWith(newStuff) )

        bookmarkArr[i] = newEl;
    }

    let trashArray = Array.from(document.querySelectorAll('.trashPic'));
    for (let i = 0; i < bookshelfArr.length; i++) {
        const oldEl = trashArray[i];
        const newEl = oldEl.cloneNode(true);
        newEl['index'] = indexArr[i]
        newEl.addEventListener('click', function() {
            console.log(this.index);

            console.log(bookshelfArr);
            console.log(trashArray);
            console.log(indexArr);
            
            //upd bookshelfArr, indexArr, trashArray
            let arr = []
            arr = indexArr.splice(this.index) // removed and kept as var for ref to trashArr and bookshelfArr
            trashArray.splice(this.index, 1)
            bookshelfArr.splice(this.index, 1)
            arr.splice(0,1) //remove first elem
            for (let i in arr) { //push arr to indexArr back
                arr[i] = arr[i] - 1
                indexArr.push(arr[i])
                trashArray[arr[i]].index = arr[i]
                bookshelfArr[arr[i]].index = arr[i]
            }
            bookshelfDiv.removeChild(document.querySelectorAll('.books')[this.index])
            bookAmount = bookshelfArr.length;
            console.log(bookshelfArr);
            console.log(trashArray);
            console.log(indexArr);

            const bookmarkArr = Array.from(document.querySelectorAll('.bookmarkPic'));
        for (let i = 0; i < bookshelfArr.length; i++) { //to update the bookmark index
        const oldEl = bookmarkArr[i];
        const newEl = oldEl.cloneNode(true);
        newEl['index'] = indexArr[i] 
        bookmarkArr[i] = newEl;
}
})
oldEl.parentNode.replaceChild(newEl, oldEl);
    }
    document.querySelectorAll('.books')[bookAmount].appendChild(scoreDiv.cloneNode(true))
    const starValue = Math.round((score.value) * 2) // ranges from 0 - 10, 11 vals, no decimals
    let totalStars = 0
    for (let i = 1; i <= starValue/2; i++) {
        // amount of full stars
        document.querySelectorAll('.scoreDiv')[bookAmount].appendChild(fullStarPic.cloneNode(true))
        totalStars++
    }
    console.log(starValue);
    if (starValue % 2 !== 0) {
        // have half star?
        document.querySelectorAll('.scoreDiv')[bookAmount].appendChild(halfStarPic.cloneNode(true))
        totalStars++
    }
    for (let i = totalStars; i < 5; i++) {
        // amount of empty stars
        document.querySelectorAll('.scoreDiv')[bookAmount].appendChild(emptyStarPic.cloneNode(true))
    }

    trashArray = Array.from(document.querySelectorAll('.trashPic'));
    bookAmount = bookshelfArr.length;
} else {
    console.log('invalid input');
}
})

reset.addEventListener('click', function (a) {
a.preventDefault()
    bookName.value = ''
    authorName.value = ''
    pagesRead.value = 0
    totalPages.value = 0
    score.value = 0
});
                // eventlistener wont work if -> the function runs and finds nothing, so 
                // the eventlistener target has to exist before adding the event listener