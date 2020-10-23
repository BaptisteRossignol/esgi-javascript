function ucfirst(text) {
    if (typeof text !== "string" || text === "") return "";
    const textUcFirst = text.charAt(0).toUpperCase() + text.slice(1);
    return textUcFirst;
}

function capitalize(text) {
    if (typeof text !== "string" || text === "") return "";
    return text.toLowerCase().split(' ').map(w => ucfirst(w)).join(' ');
}

function camelCase(text) {
    if (typeof text !== "string" || text === "") return "";
    return capitalize(text.replace(/_/g, ' ')).replace(/\W/g, "");
}

function snake_case(text) {
    if (typeof text !== "string" || text === "") return "";
    return text.replace(/ /g, '_');
}

function leet(text) {
    if (typeof text !== "string" || text === "") return "";
    const obj = {a: 4, e: 3, i: 1, o: 0, u: '(_)', y: 7};
    return text.replace(/[AEIOUY]/gi, function(e) {
        return obj[e.toLowerCase()] !== undefined ? obj[e.toLowerCase()] : e;
    });
}

function prop_access(element, text) {
    if (typeof text !== "string" || text.length == 0) return text + " not exist";
    if (typeof element !== "object" || element == null) return element + " not exist";
  
    text.split('.').map(function (prop) {
        if (!element.hasOwnProperty(prop)) return element = prop + " not exist";
        element = element[prop];
    });

    return element;
}

function verlan(text) {
    if (typeof text !== "string" || text === "") return "";

    return text.split(" ").map(function (word) {
        return word.split("").reverse().join("")
    }).join(" ");
}

function yoda(text) {
    return text.split(" ").reverse().join(" ");
}

//  Première lettre en majuscule
console.log(ucfirst("bonjour la france"));

// Toutes les 1ères lettres des mots en majuscules
console.log(capitalize("bonjour la france"));

// Toutes les 1ères lettres des mots en majuscules + mots collés
console.log(camelCase("toggleCase is the coolest"));

console.log(snake_case("toggle case is the coolest"));

// Cryptage LEET
console.log(leet("anaconda"));

// Property access
var prairie = {
    'animal':
    {
        'type':
        {
            'name':'chien'
        }
    }
};
console.log(prop_access(prairie,'animal.type'));

// Verlan
console.log(verlan("bonjour le monde"));

// Yoda
console.log(yoda("bonjour le monde"));