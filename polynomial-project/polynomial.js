const fs = require('fs');
const { parse } = require('json5');  


function decodeValue(base, encodedValue) {
    return parseInt(encodedValue, parseInt(base));
}


function lagrangeInterpolation(xValues, yValues, x) {
    let result = 0;
    const n = xValues.length;

    for (let i = 0; i < n; i++) {
        let term = yValues[i];
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term = term * (x - xValues[j]) / (xValues[i] - xValues[j]);
            }
        }
        result += term;
    }
    return result;
}


function getPolynomialCoefficients(xValues, yValues) {
  
    return yValues.map((_, idx) => lagrangeInterpolation(xValues, yValues, idx));
}


function main(jsonInput) {
    const data = parse(jsonInput);

    const n = data.keys.n;
    const k = data.keys.k;

    const xValues = [];
    const yValues = [];

    for (const key in data) {
        if (key !== 'keys') {
            const { base, value } = data[key];
            const x = parseInt(key, 10);
            const y = decodeValue(base, value);
            
            xValues.push(x);
            yValues.push(y);
        }
    }

    
    if (xValues.length < k) {
        throw new Error('Not enough roots to determine the polynomial coefficients');
    }

    
    const coefficients = getPolynomialCoefficients(xValues, yValues);
    const constantTerm = coefficients[0];

    return constantTerm;
}


const jsonInput = `{
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
}
`;

try {
    const constantTerm = main(jsonInput);
    console.log(`The constant term of the polynomial is: ${constantTerm}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
}