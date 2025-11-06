#Assignment 01

##Brief

Starting from the concept of a pinboard, implement a web page that:

- is responsive (properly layout for smartphone, tablet, and desktop)
- allows the user to add and remove elements
- allows the user to coustomize elements (i.e. colors, size)
- allows the switch between two views (at least)

##Screenshots

<img src= "docs/Maria Mititelu_page-card-view.png">
<img src= "docs/Maria Mititelu_list-view.png">
<img src= "docs/Maria Mititelu_Delete book.png">
<img src= "docs/Maria Mititelu_adding a new book.png">
<img src= "docs/Maria Mititelu_adding a new book 2.png">


##Short project description (general concept, functional logic and interaction modalities, 300 characters)

I created a digital library where by clicking on the 'Add a new book' you can add a new book based on the three inputs on the top of the page. The books are displayed on two different views: 'list-view' and 'card-view' that can be toggled by clicking on the 'Books list' and 'Books view' buttons. Also, every book has a delete button that by clicking it you can delete the whole book. Also, the page has 3 different displays: phone display, tablet display and desktop display.


##Lista funzioni (name of the function, arguments, description, what it returns) (if you have them)

Name of the function: buttonList.addEventListener 
Arguments : type of event, 'callBack' function;
Description: change card-view to list-view on button click
Returns: -

Name of the function: buttonCard.addEventListener 
Arguments : type of event, 'callBack' function;
Description: change list-view to card-view on button click
Returns: -

Name of the function: button.addEventListener
Arguments : type of event, 'callBack' function;
Description: makes the button delete to delete the book on click
Returns: -