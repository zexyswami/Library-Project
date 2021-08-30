var helper = require('./helper');

function findAccountById(accounts, id) {
    return helper(accounts, id, 'id');
}

function sortAccountsByLastName(accounts) {
    return accounts.sort((idA, idB) => idA.name.last > idB.name.last ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
    const id = account.id;
    let counter = 0;
    books.forEach((book) => {
        const lent = book.borrows;
        if (lent.some((foo) => foo.id === id)) counter++;
    });
    return counter;
}

function getBooksPossessedByAccount(account, books, authors) {
    const id = account.id;
    let result = books.reduce((acc, book, index) => {
        const lent = book.borrows;
        if (lent.some((foo) => foo.id === id && foo.returned === false)) {
            //had to make copy of book in order to not alter the original data set
            const copy = book;
            const found = helper(authors, book.authorId, 'id');
            copy.author = found;
            acc.push(copy);
        }
        return acc;
    }, []);
    return result;
}

module.exports = {
    findAccountById,
    sortAccountsByLastName,
    getTotalNumberOfBorrows,
    getBooksPossessedByAccount,
};