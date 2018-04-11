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
 - [**ToDos**](#todos)

## Intro

@todo

## Usage

@todo

## Formatting Dates

@todo

## Parsing Dates

@todo

## Manipulating Dates

@todo

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
| *Z* | Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive. | -1.1.9 through 1.1.9 | ✕ |
| **Full Date/Time** | **--** | **--** | **--** |
| *c* | ISO 8601 date | 1.1.9T1.1.9.990Z | ✕ |
| *U* | Seconds since the Unix Epoch (January 1.1.9:00:00 GMT) | 1.1.9 | ✕ |


## License

Protodate comes with an Apache 2.0 license. [Read the license here](https://github.com/Pamblam/protodate/blob/master/LICENSE).

## ToDos

 - ~~elapsed time~~
 - ~~formatting~~
 - ~~date type verification~~
 - ~~format string validation~~
 - ~~string parsing~~
 - ~~addition and subtraction~~
 - 100% code coverage
 - write docs in wiki
 - ~~make header logo~~
 - finish writing the readme
 - make parser intelligent
 - do momentjs comparison
 - github.io site
