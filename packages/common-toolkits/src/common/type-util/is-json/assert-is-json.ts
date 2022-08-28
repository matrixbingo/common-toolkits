'use strict';

// VARIABLES //

/**
* Detects a JSON string.
*
* Regular expression: `/^\{[\s\S]*\}$|^\[[\s\S]*\]$/`
*
* -   `^\{`
*
*     -   match a `{` literal which is the first character
*
* -   `[\s\S]*`
*
*     -   match any whitespace and non-whitespace characters which occur `0` or more times
*
* -   `\}$`
*
*     -   match a `}` literal which is the last character
*
* -   `|`
*
*     -   alternatively
*
* -   `^\[`
*
*     -   match a `[` literal which is the first character
*
* -   `[\s\S]*`
*
*     -   match any whitespace and non-whitespace characters which occur `0` or more times
*
* -   `\]$`
*
*     -   match a `]` literal which is the last character
*
*
* Example matching strings:
*
* -   `'{}'`
* -   `'[]'`
* -   `'{adjlkfaj3743.,><\n\t\rdf}'`
* -   `'[adjlkfaj3743.,><\n\t\rdf]'`
* -   `'{"a":5}'`
*
* @constant
* @type {RegExp}
* @default /^\{[\s\S]*\}$|^\[[\s\S]*\]$/
*/
const re = /^\{[\s\S]*\}$|^\[[\s\S]*\]$/;


// MAIN //

/**
* Tests if a value is a parseable JSON string.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a parseable JSON string
*
* @example
* var v = isJSON( '{"a":5}' );
* // returns true
*
* @example
* var v = isJSON( '{a":5}' );
* // returns false
*/
export default function assertIsJson( value: any ): boolean {
	if ( typeof value !== 'string' ) {
		return false;
	}
	if ( !re.test( value ) ) {
		return false;
	}
	try {
		JSON.parse( value );
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
	return true;
};
