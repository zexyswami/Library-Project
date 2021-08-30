var helper = require('./helper');

function findAuthorById(authors, id) {
    return helper(authors, id, 'id');
}

function findBookById(books, id) {
    return helper(books, id, 'id');
}

function partitionBooksByBorrowedStatus(books) {
    const checkedOut = [];
    const returned = [];
    let result = [];
    books.forEach((book) => {
        const statuses = book.borrows;
        statuses.every((status) => status.returned === true) ? returned.push(book) : checkedOut.push(book);
    });
    return result = [checkedOut, returned];
}

function getBorrowersForBook(book, accounts) {
    const look = book.borrows;
    const result = [];
    accounts.forEach((account) => {
        if (result.length < 10) {
            look.forEach((foo) => {
                if (foo.id === account.id) {
                    const copy = account;
                    copy.returned = foo.returned;
                    result.push(copy);
                }
            });
        }
    });
    return result;
}

module.exports = {
    findAuthorById,
    findBookById,
    partitionBooksByBorrowedStatus,
    getBorrowersForBook,
};