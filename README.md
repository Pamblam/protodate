
![Protodate Logo](https://i.imgur.com/rwU5zSL.png)

[![npm version](https://badge.fury.io/js/protodate.svg)](https://badge.fury.io/js/protodate) [![build](https://api.travis-ci.org/Pamblam/protodate.svg?branch=master)](https://travis-ci.org/Pamblam/protodate) [![coverage](https://coveralls.io/repos/github/Pamblam/protodate/badge.svg?branch=master)](https://coveralls.io/github/Pamblam/protodate)

Better Javascript Dates.

## Contents
 - [**Intro**](#overview)
 - [**Usage**](#usage)
 - [**Formatting Dates**](#formatting-dates)
 - [**Parsing Dates**](#parsing-dates)
 - [**Manipulating Dates**](#mainpulating-dates)
 - [**Formatting Characters**](#formatting-characters)
 - [**License**](#license)

## Intro

Protodate is a very fast and lightweight solution for building, parsing, manipulating and formatting Javascript Dates. Protodate extends the native JS Date object for ease of use and to keep the library light. By leveraging native, low-level code Protodate is able to achieve unprecedented speeds. 

Compare Protodate to Moment.js:

| Protodate | Moment.js |
| --- | --- |
| Parses Dates more than **2x faster** | Slower |
| Calculates elapsed time nearly **20x faster** | Much slower |
| Minified @ 9.5kb (**5x Lighter**) | Minified @ 50.43kb |
| [**100% code coverage**](https://coveralls.io/github/Pamblam/protodate) | [only 94.6% code coverage](https://coveralls.io/github/moment/moment) |

[Check out the benchmarks](https://jsperf.com/protodate-v-moment-js/1).

Also, if you happened to be a PHP developer, you're in luck because Protodate uses the same [date formatting](#formatting-characters) as PHP's native `date` function.


## Usage

#### Browsers:

Download and include the [protodate.js](https://github.com/Pamblam/protodate/blob/master/protodate.js) file or the minified, production-ready [protodate.min.js](https://github.com/Pamblam/protodate/blob/master/protodate.min.js) and include it in your markup.

    <script src='protodate.min.js'></script>
    
#### Node

Install it with `npm install protodate` and require it in your script.

    const Date = require('protodate.js');

## Formatting Dates

Use the [`format(formatStr)`](https://github.com/Pamblam/protodate/wiki#new-dateformatformatstr) method to format dates as strings. Use the [Formatting Characters Table](#formatting-characters) to build your format string.

**Example**: `new Date().format("m/d/y g:i a")`

## Parsing Dates

Use the [`parse(dateStr[, formatStr])`](https://github.com/Pamblam/protodate/wiki#dateparsedatestr-formatstr) method to create a Date object from a string. If you provide a format string to the method, parsing will be much faster, but protodate is smart enough to guess just about any format without it. Use any of the parsable formatting characters to create a [format string](#formatting-characters).

**Example**: `Date.parse("January 3rd 2007 @ 4 o'clock")`

## Manipulating Dates

Use the [`plus(quantity, period)`](https://github.com/Pamblam/protodate/wiki#new-dateplusquantity-period) and [`minus(quantity, period)`](https://github.com/Pamblam/protodate/wiki#new-dateminusquantity-period) methods to add and subtract time from a Date instance.

The `period` parameter is the unit of time to add or subtract, and the quantity parameter is how many of them to add or subtract. Specify the period parameter with using one of the 6 [Date Period Constants](https://github.com/Pamblam/protodate/wiki#constants), (ie, [`Date.MILLISECOND`](https://github.com/Pamblam/protodate/wiki#datemillisecond), [`Date.SECOND`](https://github.com/Pamblam/protodate/wiki#datesecond), [`Date.MINUTE`](https://github.com/Pamblam/protodate/wiki#dateminute), [`Date.HOUR`](https://github.com/Pamblam/protodate/wiki#datehour), [`Date.DAY`](https://github.com/Pamblam/protodate/wiki#dateday), [`Date.YEAR`](https://github.com/Pamblam/protodate/wiki#dateyear)).

**Example**: `new Date().add(3, Date.DAY) // 3 days from now`

## Formatting Characters

Each character represents part of a date format string. Characters listed as *Parsable* are understood by the `parse` method. All other characters, as well as characters escaped with a `\` in the format string will be printed as-is.

| format character  | Description | Example returned values | Parsable |
| ------------- | ------------- | -------------- | -------------- |
| **Day**  | **--**  | **--** | **--** |
| *d*  | Day of the month, 2 digits with leading zeros | 01 to 31 | ✔ |
| *D* | A textual representation of a day, three letters  | Mon through Sun | ✔ |
| *j* | Day of the month without leading zeros | 1 to 31 | ✔ |
| *l* (lowercase 'L') | A full textual representation of the day of the week | Sunday through Saturday | ✔ |
| *N* |	ISO-8601 numeric representation of the day of the week | 1 (for Monday) through 7 (for Sunday) | ✕ |
| *S* | English ordinal suffix for the day of the month, 2 characters | st, nd, rd or th. Works well with j | ✔ |
| *w*  | Numeric representation of the day of the week | 0 (for Sunday) through 6 (for Saturday) | ✕ |
| *z* | The day of the year (starting from 0) | 0 through 365 |
| **Week** | **--** | **--** | **--** |
| *W* | ISO-8601 week number of year, weeks starting on Monday | Example: 42 (the 42nd week in the year) | ✕ |
| **Month** | **--** | **--** | **--** |
| *F* | A full textual representation of a month, such as January or March | January through December | ✔ |
| *m* | Numeric representation of a month, with leading zeros | 01 through 12 | ✔ |
| *M* | A short textual representation of a month, three letters | Jan through Dec | ✔ |
| *n* | Numeric representation of a month, without leading zeros | 1 through 12 | ✔ |
| *t* | Number of days in the given month | 28 through 31 | ✕ |
| **Year** | **--** | **--** | **--** |
| *L* | Whether it's a leap year | 1 if it is a leap year, 0 otherwise. | ✕ |
| *o* | ISO-8601 week-numbering year. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead. | Examples: 1999 or 2003 | ✕ |
| *Y* | A full numeric representation of a year, 4 digits | Examples: 1999 or 2003 | ✔ |
| *y* | A two digit representation of a year | Examples: 99 or 03 | ✔ |
| **Time** | **--** | **--** | **--** |
| *a* | Lowercase Ante meridiem and Post meridiem | am or pm | ✔ |
| *A* | Uppercase Ante meridiem and Post meridiem | AM or PM | ✔ |
| *B* | Swatch Internet time | 000 through 999 | ✕ |
| *g* | 12-hour format of an hour without leading zeros | 1 through 12 | ✔ |
| *G* | 24-hour format of an hour without leading zeros | 0 through 23 | ✔ |
| *h* | 12-hour format of an hour with leading zeros | 01 through 12 | ✔ |
| *H* | 24-hour format of an hour with leading zeros | 00 through 23 | ✔ |
| *i* | Minutes with leading zeros | 00 to 59 | ✔ |
| *s* | Seconds, with leading zeros | 00 through 59 | ✔ |
| *v* | Milliseconds with leading zeros - 3 Digits. | Example: 654 | ✔ |
| **Timezone** | **--** | **--** | **--** |
| *Z* | Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive. | -2.0.11 through 2.0.11 | ✕ |
| **Full Date/Time** | **--** | **--** | **--** |
| *c* | ISO 8601 date | 2.0.11T2.0.11.990Z | ✕ |
| *U* | Seconds since the Unix Epoch (January 2.0.11:00:00 GMT) | 2.0.11 | ✕ |


## License

Protodate comes with an Apache 2.0 license. [Read the license here](https://github.com/Pamblam/protodate/blob/master/LICENSE).
