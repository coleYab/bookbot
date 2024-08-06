function main() {
    const fs = require('node:fs');
    const title = './books/frankenstein.txt';

    const data = fs.readFileSync(title, 'utf8');
    const words = data.split(new RegExp('[ \r\n\t]')).filter(item => item.length !== 0);

    const charFrequency = new Map();

    for (let term of data) {
        let lterm = term.toLowerCase();
        if (lterm >= 'a' && lterm <= 'z') {
            if (charFrequency.has(lterm))
                charFrequency.set(lterm, charFrequency.get(lterm) + 1);
            else
                charFrequency.set(lterm, 1);
        }
    }

    printReport(createBookReport(
    title, words, data.split(''), charFrequency
    ));
}

function createBookReport(title, words, chars, charFrequency) {
    const book = new Map();
    const arr = sortMap(charFrequency);


    book.set('title', title);
    book.set('charOccurance', arr);
    book.set('letters', chars);
    book.set('words', words);

    return book;
}

function sortMap(map) {
    const arr = Array.from(map);

    return arr.sort((a, b) => (-a[1] + b[1]));
}


function printReport(book) {
    console.log(`--- Print Report of ${book.get("title")} ---`);
    console.log(`--- This book has ${book.get("letters").length} letters`);
    console.log(`--- This book has ${book.get("words").length} words`);

    for (let entry of book.get('charOccurance')) {
        console.log(`The ${entry[0]} character was found ${entry[1]} times`);
    }

    console.log(`-- End Of Report ---`);
}

main();
