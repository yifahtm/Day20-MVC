'use strict'

const BOOK_DB = 'bookDB'
var gBooks
_createBooks()

function getBooks() {
    return gBooks
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
}

function updatePrice(bookId, newPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice
}

function addBook(title, price) {
    const newBook = _createBook(title, price)
    gBooks.unshift(newBook)
}

function readBook(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    return book
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