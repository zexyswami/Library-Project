var helper = require('./helper');

function findAccountById(accounts, id) {
    return accounts.find((ids) => ids.id === id);
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
            const copy = book;
            const found = authors.find((author) => author.id === book.authorId);
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