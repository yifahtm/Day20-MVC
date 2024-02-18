'use strict'

const BOOK_DB = 'bookDB'
var gBooks
const gImages = [
    'img/lori.png',
    'img/world atlas.jpg',
    'img/zorba the greek.jpg',
    'img/the subtle art of not giving a fuck.jpg']
var gFilterBy
var gCount = 1
_createBooks()

function getBooks() {
    if (gFilterBy) return gBooks.filter(book => book.title.toLowerCase().includes(gFilterBy))
    return gBooks || []
}

function getImg() {
    const imgIdx = getRandomInt(0, gImages.length - 1)
    console.log(gImages[imgIdx])
    return gImages[imgIdx]
}

function getRate(bookId, diff) {
    const book = getBook(bookId)
    const newRating = book.rating + diff
    if (newRating >= 0 && newRating <= 5) {
        book.rating = newRating
        _saveBooks()
    }
    return book
}

function getBook(bookId) {
    const book = gBooks.find((book) => book.id === bookId)
    if (book) return book
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
    gFilterBy = ''
}

function getExpensiveBooks() {//chhange length also for functions
    const expensiveBooks = gBooks.filter(book => book.price > 200)
    return expensiveBooks.length
}

function getAverageBooks() {
    const averageBooks = gBooks.filter(book => book.price < 200 && book.price >= 80)
    return averageBooks.length
}

function getCheapBooks() {
    const cheapBooks = gBooks.filter(book => book.price < 80)
    return cheapBooks.length
}

function _createBooks() {
    gBooks = loadFromStorage(BOOK_DB)

    if (!gBooks || !gBooks.length) {
        gBooks = [
            _createBook('The adventures of Lori Ipsi', 120),
            _createBook('World Atlas', 300),
            _createBook('Zorba the Greek', 87),
        ]
        _saveBooks()
    }
}

function _createBook(title, price) {
    return {
        id: makeId(),
        title,
        price,
        rating: 1,
        imgUrl: getImg()
    }
}

function _saveBooks() {
    saveToStorage(BOOK_DB, gBooks)
}