'use strict'

const BOOK_DB = 'bookDB'
var gBooks
_createBooks()

function getBooks() {
    return gBooks
}
function _createBooks() {
    gBooks = loadFromStorage(BOOK_DB)

    if (!gBooks) {
        gBooks = [
            _createBook('The adventures of Lori Ipsi', 120),
            _createBook('World Atlas', 300),
            _createBook('Zorba the Greek', 87),
        ]
    }
}


function _createBook(txt, price) {
    return {
        id: makeId(),
        title: txt,
        price: price,
        imgUrl: 'lori-ipsi.jpg'
    }
}