**Polynomial Interpolation Project**
This project decodes values in different numeral bases and performs Lagrange Interpolation to compute the polynomial coefficients from given data points. The primary goal is to determine the constant term of the polynomial.

Table of Contents
1) Project Overview
2) Features
3) Installation
4) Usage
5) Example Input
6) Running Tests

**Project Overview**
This project reads a JSON-like input containing numeric values in various bases. It decodes the values, then uses Lagrange interpolation to compute the constant term of the polynomial that fits the given data points.

The key parts of the project are:

Decoding values in various numeral systems (binary, decimal, hex, etc.).
Performing Lagrange Interpolation to determine the coefficients of the polynomial.
Returning the constant term of the polynomial.


**Features**
Parse and decode numeric values from different bases (e.g., binary, hexadecimal, octal).
Calculate the constant term of a polynomial using Lagrange interpolation.
JSON5-compatible input format for easier data management.
Error handling for missing or insufficient data points.

**Installation**
Clone the repository:


A set of keys specifying the number of data points (n) and required points (k).
Encoded data points, where each value is encoded in a different base.
Example input:
{
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
}
Expected Output
Once you run the program, it will output the constant term of the polynomial:
The constant term of the polynomial is: 2.9999999999999987
