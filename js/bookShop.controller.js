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
                    <button>Read</button>
                    <button>Update</button>
                    <button onclick="OnRemoveBook('${book.id}')">Delete</button>
                </td>
            </tr>
    `)

    const elBooksContainer = document.querySelector('.book-container')
    elBooksContainer.innerHTML = strHTMLs.join('')

    //renderStats()
}

function OnRemoveBook(bookId) {
    removeBook(bookId)
    render()
}