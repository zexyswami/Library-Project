var helper = require('./helper');

function getTotalBooksCount(books) {
    return books.length;
}

function getTotalAccountsCount(accounts) {
    return accounts.length;
}

function getBooksBorrowedCount(books) {
    const borrowed = books.filter((book) => book.borrows.some((status) => !status.returned));
    return borrowed.length;
}

function getMostCommonGenres(books) {
    const genre = books.map((type) => type.genre);
    const nameCount = genre.reduce((acc, type, i) => {
        if (!acc.some((genre) => genre.name === type) && acc.length < 5) {
            acc[i] = { name: type, count: 1, };
        } else if (helper(acc, type, 'name')) {
            let found = helper(acc, type, 'name');
            found.count++;
        }
        return acc;
    }, []);
    return nameCount.sort((countA, countB) => countB.count - countA.count);
}


function getMostPopularBooks(books) {
    const sorted = books.sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length);
    return sorted.reduce((acc, book, i) => {
        if (acc[i] === undefined && acc.length < 5) acc[i] = { name: book.title, count: book.borrows.length, };
        return acc;
    }, []);
}

function getMostPopularAuthors(books, authors) {
    const popular = [];
    authors.forEach((author, i) => {
        books.forEach((book) => {
            if (popular[i] === undefined) {
                popular[i] = { name: `${author.name.first} ${author.name.last}`, count: 0, };
            }
            if (book.authorId === author.id) {
                popular[i].count += book.borrows.length;
            }
        });
    });
    const result = popular.sort((varA, varB) => varB.count - varA.count);
    //cuts the array to 5 entries if the length is over 5
    return result.length > 5 ? result.slice(0, 5) : result;

}

module.exports = {
    getTotalBooksCount,
    getTotalAccountsCount,
    getBooksBorrowedCount,
    getMostCommonGenres,
    getMostPopularBooks,
    getMostPopularAuthors,
};