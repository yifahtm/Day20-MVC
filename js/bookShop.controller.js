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
                    <button class="btn-read" onclick="onReadBook('${book.id}')">Read</button>
                    <button  class="btn-update" onclick="onUpdateBook('${book.id}','${book.price}')">Update</button>
                    <button  class="btn-delete" onclick="OnRemoveBook('${book.id}')">Delete</button>
                </td>
            </tr>
    `)

    const elBooksContainer = document.querySelector('.book-container tbody')
    elBooksContainer.innerHTML = strHTMLs.join('')

    renderStats()
}

function renderStats() {
    const elExpensive = document.querySelector('.expensive')
    const elAverage = document.querySelector('.average')
    const elCheap = document.querySelector('.cheap')

    elExpensive.innerText = getExpensiveBooks()
    elAverage.innerText = getAverageBooks()
    elCheap.innerText = getCheapBooks()
}

function OnRemoveBook(bookId) {
    removeBook(bookId)
    handleMessage('delete')
    render()
}

function onUpdateBook(bookId, bookPrice) {
    const newPrice = +prompt('Please enter new price:', bookPrice)
    updatePrice(bookId, newPrice)
    handleMessage('update')
    render()
}

// function onOpenModal() {
//     const elModal = document.querySelector('.input-add')
//     elModal.show()
// }

function onAddBook() {
    const title = prompt('Please Enter a Title:')
    const price = +prompt('Please Enter a Price:')
    if (!title || !price) return
    addBook(title, price)
    handleMessage('add')
    render()
}

// function onAddBook() {
//     const elTitleInput = document.querySelector('.title-input')
//     const elPriceInput = document.querySelector('.price-input')
//     const elModal = document.querySelector('.input-add')
//     const title = elTitleInput.value
//     const price = elPriceInput.value
//     if (!title || !price) return
//     addBook(title, price)
//     handleMessage('add')
//     render()
//     elModal.close()

// }

function onReadBook(bookId) {
    const book = readBook(bookId)

    const elBookDetails = document.querySelector('.book-details')
    const elSpan = elBookDetails.querySelector('h2 span')
    const elPre = elBookDetails.querySelector('pre')
    const elImgSpan = elBookDetails.querySelector('.img')
    // const elIdContainerSpan = elBookDetails.querySelector('.id-container')
    // const elIdSpan = elIdContainerSpan.querySelector('.id')
    // elIdContainerSpan.innerText = 'ID: '
    // elIdSpan.innerText = book.id
    elPre.innerHTML = `
    ID: ${book.id}
    Title: ${book.title}
    Price: ${book.price}
    `
    elSpan.innerText = book.title
    elImgSpan.innerHTML = `<img src="${book.imgUrl}" alt="${book.title}">`
    elBookDetails.showModal()
}

function handleMessage(button) {
    const elMessage = document.querySelector('.message')
    const elMessageH2 = document.querySelector('.message h2')
    if (button === 'delete') elMessageH2.innerText = 'Deleted successfully'
    if (button === 'update') elMessageH2.innerText = 'Price updated successfully'
    if (button === 'add') elMessageH2.innerText = 'Book added to inventory'
    elMessage.show()
    setTimeout(() => elMessage.close(), 2000)
}

function onSetFilterBy(input) {
    const filterBy = input.value
    setFilterBy(filterBy)
    render()
}

function onClearFilter() {
    const elInput = document.querySelector('.filter-input')
    elInput.value = ''
    clearFilter()
    render()
}

function onRate(ev, elBtn) {
    //Need to figure out how to send the bookId, so i could change rate in modal&local storage
    ev.preventDefault()
    const elSpan = document.querySelector('.rate')
    var rate
    if (elBtn.innerText === '+') {
        rate = getRate('+')
        elSpan.innerText = rate
    } else if (elBtn.innerText === '-') {
        rate = getRate('-')
        elSpan.innerText = rate
    }
    // if (elSpan.innerText < 1) elSpan.innerText = '1'
    // if (elSpan.innerText > 5) elSpan.innerText = '5'
    // if (elSpan.innerText >= 1 || elSpan.innerText <= 5) {
    //     if (elBtn.innerText === '+') {
    //         gCount++
    //     }
    //     else if (elBtn.innerText === '-') {
    //         gCount--
    //     }
    // }
    // elSpan.innerText = gCount
    render()
}

function onChangeDisplay() {

}