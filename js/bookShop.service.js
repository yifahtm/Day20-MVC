'use strict'

const BOOK_DB = 'bookDB'
var gBooks
const gImages = [
    'img/lori.png',
    'img/world atlas.jpg',
    'img/zorba the greek.jpg',
    'img/the subtle art of not giving a fuck.jpg']
var gFilterBy
_createBooks()

function getImg() {
    const imgIdx = getRandomInt(0, gImages.length - 1)
    console.log(gImages[imgIdx])
    return gImages[imgIdx]
}

function getBooks() {
    if (gFilterBy) return gBooks.filter(book => book.title.toLowerCase().includes(gFilterBy))
    return gBooks || []
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    _saveBooks()
}

function updatePrice(bookId, newPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice
    _saveBooks()
}

function addBook(title, price) {
    const newBook = _createBook(title, price)
    gBooks.unshift(newBook)
    _saveBooks()
}

function readBook(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    return book
}

function setFilterBy(filterBy) {
    gFilterBy = filterBy.toLowerCase()
    console.log(gFilterBy)
}

function clearFilter() {
    gFilterBy = null
}

function getExpensiveBooks() {
    const expensive = gBooks.filter(book => book.price > 200)
    return expensive.length
}

function getAverageBooks() {
    const average = gBooks.filter(book => book.price < 200 && book.price >= 80)
    return average.length
}

function getCheapBooks() {
    const cheap = gBooks.filter(book => book.price < 80)
    return cheap.length
}

function _createBooks() {
    gBooks = loadFromStorage(BOOK_DB)

    if (!gBooks || gBooks.length === 0) {
        gBooks = [
            _createBook('The adventures of Lori Ipsi', 120),
            _createBook('World Atlas', 300),
            _createBook('Zorba the Greek', 87),
        ]
        _saveBooks()
    }
}

function _createBook(txt, price) {
    return {
        id: makeId(),
        title: txt,
        price: price,
        imgUrl: getImg()
    }
}

function _saveBooks() {
    saveToStorage(BOOK_DB, gBooks)
}