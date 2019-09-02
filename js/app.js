const fetchData = () => {
    $.ajax({
        "url": "http://localhost:8282/books",
        "dataType": "json"
    }).done(result => {
        addBookTitles(result);
    });
};

const allBooksContainer = $("#allBooks");

const addBookTitles = dataSet => {
    let bookContainer =$(`<div class="tile" ></div>`);
    bookContainer.appendTo(allBooksContainer);

    let detailsContainer =$(`<div class="tile" ></div>`);
    detailsContainer.appendTo(allBooksContainer);

    dataSet.forEach(
        (el, i) => {
            console.log(i);
            if (i % 3 === 0) {
                bookContainer =$(`<div class="tile" ></div>`);
                bookContainer.appendTo(allBooksContainer);

                detailsContainer =$(`<div class="tile" ></div>`);
                detailsContainer.appendTo(allBooksContainer);
            }

            addBookToList(el, bookContainer, detailsContainer, i);
        }
    );
};

const addBookToList = (el, bookContainer, detailsContainer, i) => {

    const singleBookContainer = $(`<div class="tile is-parent is-4" data-column="${i % 3}"><div class="tile is-child box"></div></div>`).appendTo(bookContainer);
    $(`<p class="title has-text-centered">${el.title}</p>`).appendTo(singleBookContainer.children());
    $(`<p class="title has-text-centered"><button class="button is-small is-rounded is-details">Szczegóły</button><button class="button is-small is-rounded is-danger">Usuń</button></p>`).appendTo(singleBookContainer.children());

    const singleDetailsContainer = $(`<div class="tile is-parent is-4" data-column="${i % 3}" ><div class="tile is-child box" style="display: none"></div></div>`).appendTo(detailsContainer);
    $(`<p class="has-text-centered">Autor: ${el.author}</br>Typ: ${el.type}</br>Wydawnictwo: ${el.publisher}</br>isbn: ${el.isbn}</p>`).appendTo(singleDetailsContainer.children());
};

fetchData();

allBooksContainer.on("click", e => {
    const target = $(e.target);

    if(target.hasClass("is-details")){
        const parentDiv = target.closest(".is-parent");
        const columnNumber = parentDiv.data("column");

        const detailsDiv = parentDiv.parent().next();
        const detailBox = detailsDiv.children(`[data-column=${columnNumber}]`);

        console.log(detailBox.children());


        detailBox.children().slideToggle();
    }
});

