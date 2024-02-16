'use strict'

function onInit() {
    render()
}

function render() {
    const books = getBooks()
    const strHTMLs = books.map(book => `
         <tr>
                <td>${book.title}</td>
                <td>${book.price}</td>
                <td>
                    <button onclick="onReadBook('${book.id}')">Read</button>
                    <button onclick="onUpdateBook('${book.id}','${book.price}')">Update</button>
                    <button onclick="OnRemoveBook('${book.id}')">Delete</button>
                </td>
            </tr>
    `)

    const elBooksContainer = document.querySelector('.book-container tbody')
    elBooksContainer.innerHTML = strHTMLs.join('')

    //renderStats()
}

function OnRemoveBook(bookId) {
    removeBook(bookId)
    render()
}

function onUpdateBook(bookId, bookPrice) {
    const newPrice = +prompt('Please enter new price:', bookPrice)
    updatePrice(bookId, newPrice)
    render()
}

function onAddBook() {
    const title = prompt('Please Enter a Title:')
    const price = +prompt('Please Enter a Price:')
    addBook(title, price)
    render()
}

function onReadBook(bookId) {
    const book = readBook(bookId)

    const elBookDetails = document.querySelector('.book-details')
    const elSpan = elBookDetails.querySelector('h2 span')
    const elPre = elBookDetails.querySelector('pre')

    elPre.innerText = JSON.stringify(book, null, 4)
    elSpan.innerText = book.title

    elBookDetails.showModal()
}