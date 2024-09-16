const fs = require('fs');
const { parse } = require('json5');  // Using json5 for robust JSON parsing

// Function to decode a base-encoded value to decimal
function decodeValue(base, encodedValue) {
    return parseInt(encodedValue, parseInt(base));
}

// Function to perform Lagrange interpolation
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

// Function to find polynomial coefficients using Lagrange interpolation
function getPolynomialCoefficients(xValues, yValues) {
    // For simplicity, we'll use Lagrange interpolation to compute polynomial at x = 0
    // The coefficients can be derived from the polynomial evaluated at x = 0
    return yValues.map((_, idx) => lagrangeInterpolation(xValues, yValues, idx));
}

// Main function to process the JSON input and find the constant term
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

    // Assuming k = m + 1 and we have at least k roots
    if (xValues.length < k) {
        throw new Error('Not enough roots to determine the polynomial coefficients');
    }

    // Compute coefficients and get constant term
    const coefficients = getPolynomialCoefficients(xValues, yValues);
    const constantTerm = coefficients[0];

    return constantTerm;
}

// Example usage
const jsonInput = `{
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}`;

try {
    const constantTerm = main(jsonInput);
    console.log(`The constant term of the polynomial is: ${constantTerm}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
}
