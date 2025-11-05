//buttons
const addANewBook = document.getElementById('button-add');

const textInput = document.getElementById('text-input');
const imgLink = document.getElementById('img-link');
const bookDescription = document.getElementById('book-description');
const booksContainer = document.getElementById('books-container');



//add-new-book button

addANewBook.addEventListener('click', () => {
    const newBook = document.createElement('li');
    newBook.className = 'book';

    const newImg = document.createElement('img');
    newImg.className = 'img';
    newImg.src = imgLink.value;
    newBook.appendChild(newImg);

    const newParagraph = document.createElement('p');
    newParagraph.className = 'title';
    newParagraph.innerText = textInput.value;
    newBook.appendChild(newParagraph);

    const newDescription = document.createElement('p');
    newDescription.className = 'description';
    newDescription.innerText = bookDescription.value;
    newBook.appendChild(newDescription);

    const newDeleteButton = document.createElement('button');
    newDeleteButton.innerText = 'Delete';
    newDeleteButton.className = 'button-delete';
    newDeleteButton.addEventListener('click', () => {
        newDeleteButton.parentElement.remove();
    }
)
    newBook.appendChild(newDeleteButton);

    booksContainer.appendChild(newBook);
}
)


//select-view buttons changing instances

const buttonList = document.getElementById('button-list');
const buttonCard = document.getElementById('button-card');


buttonList.addEventListener('click', () => {
    booksContainer.classList.remove('card');
    booksContainer.classList.add('list');
})

buttonCard.addEventListener('click', () => {
    booksContainer.classList.remove('list');
    booksContainer.classList.add('card');
})



//making all the already existing delete buttons to delete the already existing books on click

const deleteButtons = document.querySelectorAll('.button-delete');
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
    button.parentElement.remove();   
})

})

