
## protodate

[![npm version](https://badge.fury.io/js/protodate.svg)](https://badge.fury.io/js/protodate) [![build](https://api.travis-ci.org/Pamblam/protodate.svg?branch=master)](https://travis-ci.org/Pamblam/protodate) [![coverage](https://coveralls.io/repos/github/Pamblam/protodate/badge.svg?branch=master)](https://coveralls.io/github/Pamblam/protodate)

An under-construction Date helper. Not built yet. Check back soon.

----

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
| *Z* | Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive. | -1.0.28 through 1.0.28 | ✕ |
| **Full Date/Time** | **--** | **--** | **--** |
| *c* | ISO 8601 date | 1.0.28T1.0.28.990Z | ✕ |
| *U* | Seconds since the Unix Epoch (January 1.0.28:00:00 GMT) | 1.0.28 | ✕ |

Unrecognized characters as well as characters immediately preceded by a `\` in the format string will be printed as-is.
