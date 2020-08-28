

![Protodate Logo](https://i.imgur.com/rwU5zSL.png)

[![npm version](https://badge.fury.io/js/protodate.svg)](https://badge.fury.io/js/protodate) [![build](https://api.travis-ci.org/Pamblam/protodate.svg?branch=master)](https://travis-ci.org/Pamblam/protodate) [![coverage](https://coveralls.io/repos/github/Pamblam/protodate/badge.svg?branch=master)](https://coveralls.io/github/Pamblam/protodate) v3.0.5

Better Javascript Dates.

## Contents
 - [**Intro**](#overview)
 - [**Choose Your File**](#choose-your-file)
 - [**Usage**](#usage)
 - [**Formatting Dates**](#formatting-dates)
 - [**Parsing Dates**](#parsing-dates)
 - [**Manipulating Dates**](#mainpulating-dates)
 - [**Converting Timezones**](#converting-timezones)
 - [**Formatting Characters**](#formatting-characters)
 - [**Timezone Reference**](#timezone-reference)
 - [**License**](#license)

## Intro

Protodate is a very fast and lightweight solution for building, parsing, manipulating and formatting Javascript Dates. Protodate extends the native JS Date object for ease of use and to keep the library light. By leveraging native, low-level code Protodate is able to achieve unprecedented speeds. 

Compare Protodate to Moment.js:

| Protodate | Moment.js |
| --- | --- |
| Parses Dates more than **2x faster** | Slower |
| Calculates elapsed time nearly **20x faster** | Much slower |
| Base lib minified @ 9.6kb (**1/5<sup>th</sup> the size**) | Minified @ 50.43kb |
| [**100% code coverage**](https://coveralls.io/github/Pamblam/protodate) | [only 94.6% code coverage](https://coveralls.io/github/moment/moment) |
| Timezone support from 1835-2500 (**665yr Range**) | Timezone support from 2012-2022 (**10yr Range**) |

[Check out the benchmarks](https://jsperf.com/protodate-v-moment-js/1).

Also, if you happened to be a PHP developer, you're in luck because Protodate uses the same [date formatting](#formatting-characters) as PHP's native `date` function.

## Choose Your File

Protodate has 6 different versions so you only have to download what you need. 

 - [protodate.min.js](https://github.com/Pamblam/protodate/blob/master/protodate.min.js)
 - [protodate.js](https://github.com/Pamblam/protodate/blob/master/protodate.js)
 - [protodate.tz.min.js](https://github.com/Pamblam/protodate/blob/master/protodate.tz.min.js)
 - [protodate.tz.js](https://github.com/Pamblam/protodate/blob/master/protodate.tz.js)
 - [protodate.tz.full.js](https://github.com/Pamblam/protodate/blob/master/protodate.tz.full.js)
 - [protodate.tz.full.min.js](https://github.com/Pamblam/protodate/blob/master/protodate.tz.full.min.js)

Here's a helpful flow chart to help you choose which file best fits your needs:

![Protodate file chooser flowchart](https://i.imgur.com/ApMOPng.png)

## Usage

#### Browsers:

Download and include the js file that [best fits your needs](#choose-your-file) and include it in your markup.

    <script src='protodate.min.js'></script>
    
#### Node

Install the library with `npm install protodate` and `require` the file that [best fits your needs](#choose-your-file) in your script.

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

## Converting Timezones

*This functionality is only available in the `protodate.tz.*` files*

You can convert dates to other timezones with the [`setTimezone(timezone)`](https://github.com/Pamblam/protodate/wiki#new-datesettimezonetimezone) method. 

**Example**: `new Date().setTimezone('Asia/Hong_Kong').toString() // Current time in Hong Kong`

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
| *Z* | Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive. | -43200 through 50400 | ✕ |
| **Full Date/Time** | **--** | **--** | **--** |
| *c* | ISO 8601 date | 2004-02-12T15:19:21.990Z | ✕ |
| *U* | Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT) | 1533566318 | ✕ |
| **Other** | **--** | **--** | **--** |
| *J* | Count of days since since noon Universal Time on January 1, 4713 BC on the Julian calendar | 123412.5 | ✕ |
| *P* | Moon Phase | Waning Crescent | ✕ |


## Timezone Reference

A list of timezones and their corresponding countries:

| Country | Timezone |
|---------|----------|
| **Afghanistan** | `Asia/Kabul` |
| **Aland Islands** | `Europe/Mariehamn` |
| **Albania** | `Europe/Tirane` |
| **Algeria** | `Africa/Algiers` |
| **American Samoa** | `Pacific/Pago_Pago` |
| **Andorra** | `Europe/Andorra` |
| **Angola** | `Africa/Luanda` |
| **Anguilla** | `America/Anguilla` |
| **Antarctica** | `Antarctica/Casey` |
| **Antarctica** | `Antarctica/Davis` |
| **Antarctica** | `Antarctica/DumontDUrville` |
| **Antarctica** | `Antarctica/Mawson` |
| **Antarctica** | `Antarctica/McMurdo` |
| **Antarctica** | `Antarctica/Palmer` |
| **Antarctica** | `Antarctica/Rothera` |
| **Antarctica** | `Antarctica/Syowa` |
| **Antarctica** | `Antarctica/Troll` |
| **Antarctica** | `Antarctica/Vostok` |
| **Antigua and Barbuda** | `America/Antigua` |
| **Argentina** | `America/Argentina/Buenos_Aires` |
| **Argentina** | `America/Argentina/Catamarca` |
| **Argentina** | `America/Argentina/Cordoba` |
| **Argentina** | `America/Argentina/Jujuy` |
| **Argentina** | `America/Argentina/La_Rioja` |
| **Argentina** | `America/Argentina/Mendoza` |
| **Argentina** | `America/Argentina/Rio_Gallegos` |
| **Argentina** | `America/Argentina/Salta` |
| **Argentina** | `America/Argentina/San_Juan` |
| **Argentina** | `America/Argentina/San_Luis` |
| **Argentina** | `America/Argentina/Tucuman` |
| **Argentina** | `America/Argentina/Ushuaia` |
| **Armenia** | `Asia/Yerevan` |
| **Aruba** | `America/Aruba` |
| **Australia** | `Antarctica/Macquarie` |
| **Australia** | `Australia/Adelaide` |
| **Australia** | `Australia/Brisbane` |
| **Australia** | `Australia/Broken_Hill` |
| **Australia** | `Australia/Currie` |
| **Australia** | `Australia/Darwin` |
| **Australia** | `Australia/Eucla` |
| **Australia** | `Australia/Hobart` |
| **Australia** | `Australia/Lindeman` |
| **Australia** | `Australia/Lord_Howe` |
| **Australia** | `Australia/Melbourne` |
| **Australia** | `Australia/Perth` |
| **Australia** | `Australia/Sydney` |
| **Austria** | `Europe/Vienna` |
| **Azerbaijan** | `Asia/Baku` |
| **Bahamas** | `America/Nassau` |
| **Bahrain** | `Asia/Bahrain` |
| **Bangladesh** | `Asia/Dhaka` |
| **Barbados** | `America/Barbados` |
| **Belarus** | `Europe/Minsk` |
| **Belgium** | `Europe/Brussels` |
| **Belize** | `America/Belize` |
| **Benin** | `Africa/Porto-Novo` |
| **Bermuda** | `Atlantic/Bermuda` |
| **Bhutan** | `Asia/Thimphu` |
| **Bolivia** | `America/La_Paz` |
| **Bonaire, Saint Eustatius and Saba** | `America/Kralendijk` |
| **Bosnia and Herzegovina** | `Europe/Sarajevo` |
| **Botswana** | `Africa/Gaborone` |
| **Brazil** | `America/Araguaina` |
| **Brazil** | `America/Bahia` |
| **Brazil** | `America/Belem` |
| **Brazil** | `America/Boa_Vista` |
| **Brazil** | `America/Campo_Grande` |
| **Brazil** | `America/Cuiaba` |
| **Brazil** | `America/Eirunepe` |
| **Brazil** | `America/Fortaleza` |
| **Brazil** | `America/Maceio` |
| **Brazil** | `America/Manaus` |
| **Brazil** | `America/Noronha` |
| **Brazil** | `America/Porto_Velho` |
| **Brazil** | `America/Recife` |
| **Brazil** | `America/Rio_Branco` |
| **Brazil** | `America/Santarem` |
| **Brazil** | `America/Sao_Paulo` |
| **British Indian Ocean Territory** | `Indian/Chagos` |
| **British Virgin Islands** | `America/Tortola` |
| **Brunei** | `Asia/Brunei` |
| **Bulgaria** | `Europe/Sofia` |
| **Burkina Faso** | `Africa/Ouagadougou` |
| **Burundi** | `Africa/Bujumbura` |
| **Cambodia** | `Asia/Phnom_Penh` |
| **Cameroon** | `Africa/Douala` |
| **Canada** | `America/Atikokan` |
| **Canada** | `America/Blanc-Sablon` |
| **Canada** | `America/Cambridge_Bay` |
| **Canada** | `America/Creston` |
| **Canada** | `America/Dawson` |
| **Canada** | `America/Dawson_Creek` |
| **Canada** | `America/Edmonton` |
| **Canada** | `America/Fort_Nelson` |
| **Canada** | `America/Glace_Bay` |
| **Canada** | `America/Goose_Bay` |
| **Canada** | `America/Halifax` |
| **Canada** | `America/Inuvik` |
| **Canada** | `America/Iqaluit` |
| **Canada** | `America/Moncton` |
| **Canada** | `America/Nipigon` |
| **Canada** | `America/Pangnirtung` |
| **Canada** | `America/Rainy_River` |
| **Canada** | `America/Rankin_Inlet` |
| **Canada** | `America/Regina` |
| **Canada** | `America/Resolute` |
| **Canada** | `America/St_Johns` |
| **Canada** | `America/Swift_Current` |
| **Canada** | `America/Thunder_Bay` |
| **Canada** | `America/Toronto` |
| **Canada** | `America/Vancouver` |
| **Canada** | `America/Whitehorse` |
| **Canada** | `America/Winnipeg` |
| **Canada** | `America/Yellowknife` |
| **Cape Verde** | `Atlantic/Cape_Verde` |
| **Cayman Islands** | `America/Cayman` |
| **Central African Republic** | `Africa/Bangui` |
| **Chad** | `Africa/Ndjamena` |
| **Chile** | `America/Punta_Arenas` |
| **Chile** | `America/Santiago` |
| **Chile** | `Pacific/Easter` |
| **China** | `Asia/Shanghai` |
| **China** | `Asia/Urumqi` |
| **Christmas Island** | `Indian/Christmas` |
| **Cocos Islands** | `Indian/Cocos` |
| **Colombia** | `America/Bogota` |
| **Comoros** | `Indian/Comoro` |
| **Cook Islands** | `Pacific/Rarotonga` |
| **Costa Rica** | `America/Costa_Rica` |
| **Croatia** | `Europe/Zagreb` |
| **Cuba** | `America/Havana` |
| **Curaçao** | `America/Curacao` |
| **Cyprus** | `Asia/Famagusta` |
| **Cyprus** | `Asia/Nicosia` |
| **Czech Republic** | `Europe/Prague` |
| **Democratic Republic of the Congo** | `Africa/Kinshasa` |
| **Democratic Republic of the Congo** | `Africa/Lubumbashi` |
| **Denmark** | `Europe/Copenhagen` |
| **Djibouti** | `Africa/Djibouti` |
| **Dominica** | `America/Dominica` |
| **Dominican Republic** | `America/Santo_Domingo` |
| **East Timor** | `Asia/Dili` |
| **Ecuador** | `America/Guayaquil` |
| **Ecuador** | `Pacific/Galapagos` |
| **Egypt** | `Africa/Cairo` |
| **El Salvador** | `America/El_Salvador` |
| **Equatorial Guinea** | `Africa/Malabo` |
| **Eritrea** | `Africa/Asmara` |
| **Estonia** | `Europe/Tallinn` |
| **Ethiopia** | `Africa/Addis_Ababa` |
| **Falkland Islands** | `Atlantic/Stanley` |
| **Faroe Islands** | `Atlantic/Faroe` |
| **Fiji** | `Pacific/Fiji` |
| **Finland** | `Europe/Helsinki` |
| **France** | `Europe/Paris` |
| **French Guiana** | `America/Cayenne` |
| **French Polynesia** | `Pacific/Gambier` |
| **French Polynesia** | `Pacific/Marquesas` |
| **French Polynesia** | `Pacific/Tahiti` |
| **French Southern Territories** | `Indian/Kerguelen` |
| **Gabon** | `Africa/Libreville` |
| **Gambia** | `Africa/Banjul` |
| **Georgia** | `Asia/Tbilisi` |
| **Germany** | `Europe/Berlin` |
| **Germany** | `Europe/Busingen` |
| **Ghana** | `Africa/Accra` |
| **Gibraltar** | `Europe/Gibraltar` |
| **Greece** | `Europe/Athens` |
| **Greenland** | `America/Danmarkshavn` |
| **Greenland** | `America/Godthab` |
| **Greenland** | `America/Scoresbysund` |
| **Greenland** | `America/Thule` |
| **Grenada** | `America/Grenada` |
| **Guadeloupe** | `America/Guadeloupe` |
| **Guam** | `Pacific/Guam` |
| **Guatemala** | `America/Guatemala` |
| **Guernsey** | `Europe/Guernsey` |
| **Guinea** | `Africa/Conakry` |
| **Guinea-Bissau** | `Africa/Bissau` |
| **Guyana** | `America/Guyana` |
| **Haiti** | `America/Port-au-Prince` |
| **Honduras** | `America/Tegucigalpa` |
| **Hong Kong** | `Asia/Hong_Kong` |
| **Hungary** | `Europe/Budapest` |
| **Iceland** | `Atlantic/Reykjavik` |
| **India** | `Asia/Kolkata` |
| **Indonesia** | `Asia/Jakarta` |
| **Indonesia** | `Asia/Jayapura` |
| **Indonesia** | `Asia/Makassar` |
| **Indonesia** | `Asia/Pontianak` |
| **Iran** | `Asia/Tehran` |
| **Iraq** | `Asia/Baghdad` |
| **Ireland** | `Europe/Dublin` |
| **Isle of Man** | `Europe/Isle_of_Man` |
| **Israel** | `Asia/Jerusalem` |
| **Italy** | `Europe/Rome` |
| **Ivory Coast** | `Africa/Abidjan` |
| **Jamaica** | `America/Jamaica` |
| **Japan** | `Asia/Tokyo` |
| **Jersey** | `Europe/Jersey` |
| **Jordan** | `Asia/Amman` |
| **Kazakhstan** | `Asia/Almaty` |
| **Kazakhstan** | `Asia/Aqtau` |
| **Kazakhstan** | `Asia/Aqtobe` |
| **Kazakhstan** | `Asia/Atyrau` |
| **Kazakhstan** | `Asia/Oral` |
| **Kazakhstan** | `Asia/Qyzylorda` |
| **Kenya** | `Africa/Nairobi` |
| **Kiribati** | `Pacific/Enderbury` |
| **Kiribati** | `Pacific/Kiritimati` |
| **Kiribati** | `Pacific/Tarawa` |
| **Kuwait** | `Asia/Kuwait` |
| **Kyrgyzstan** | `Asia/Bishkek` |
| **Laos** | `Asia/Vientiane` |
| **Latvia** | `Europe/Riga` |
| **Lebanon** | `Asia/Beirut` |
| **Lesotho** | `Africa/Maseru` |
| **Liberia** | `Africa/Monrovia` |
| **Libya** | `Africa/Tripoli` |
| **Liechtenstein** | `Europe/Vaduz` |
| **Lithuania** | `Europe/Vilnius` |
| **Luxembourg** | `Europe/Luxembourg` |
| **Macao** | `Asia/Macau` |
| **Macedonia** | `Europe/Skopje` |
| **Madagascar** | `Indian/Antananarivo` |
| **Malawi** | `Africa/Blantyre` |
| **Malaysia** | `Asia/Kuala_Lumpur` |
| **Malaysia** | `Asia/Kuching` |
| **Maldives** | `Indian/Maldives` |
| **Mali** | `Africa/Bamako` |
| **Malta** | `Europe/Malta` |
| **Marshall Islands** | `Pacific/Kwajalein` |
| **Marshall Islands** | `Pacific/Majuro` |
| **Martinique** | `America/Martinique` |
| **Mauritania** | `Africa/Nouakchott` |
| **Mauritius** | `Indian/Mauritius` |
| **Mayotte** | `Indian/Mayotte` |
| **Mexico** | `America/Bahia_Banderas` |
| **Mexico** | `America/Cancun` |
| **Mexico** | `America/Chihuahua` |
| **Mexico** | `America/Hermosillo` |
| **Mexico** | `America/Matamoros` |
| **Mexico** | `America/Mazatlan` |
| **Mexico** | `America/Merida` |
| **Mexico** | `America/Mexico_City` |
| **Mexico** | `America/Monterrey` |
| **Mexico** | `America/Ojinaga` |
| **Mexico** | `America/Tijuana` |
| **Micronesia** | `Pacific/Chuuk` |
| **Micronesia** | `Pacific/Kosrae` |
| **Micronesia** | `Pacific/Pohnpei` |
| **Moldova** | `Europe/Chisinau` |
| **Monaco** | `Europe/Monaco` |
| **Mongolia** | `Asia/Choibalsan` |
| **Mongolia** | `Asia/Hovd` |
| **Mongolia** | `Asia/Ulaanbaatar` |
| **Montenegro** | `Europe/Podgorica` |
| **Montserrat** | `America/Montserrat` |
| **Morocco** | `Africa/Casablanca` |
| **Mozambique** | `Africa/Maputo` |
| **Myanmar** | `Asia/Yangon` |
| **Namibia** | `Africa/Windhoek` |
| **Nauru** | `Pacific/Nauru` |
| **Nepal** | `Asia/Kathmandu` |
| **Netherlands** | `Europe/Amsterdam` |
| **New Caledonia** | `Pacific/Noumea` |
| **New Zealand** | `Pacific/Auckland` |
| **New Zealand** | `Pacific/Chatham` |
| **Nicaragua** | `America/Managua` |
| **Niger** | `Africa/Niamey` |
| **Nigeria** | `Africa/Lagos` |
| **Niue** | `Pacific/Niue` |
| **Norfolk Island** | `Pacific/Norfolk` |
| **North Korea** | `Asia/Pyongyang` |
| **Northern Mariana Islands** | `Pacific/Saipan` |
| **Norway** | `Europe/Oslo` |
| **Oman** | `Asia/Muscat` |
| **Pakistan** | `Asia/Karachi` |
| **Palau** | `Pacific/Palau` |
| **Palestinian Territory** | `Asia/Gaza` |
| **Palestinian Territory** | `Asia/Hebron` |
| **Panama** | `America/Panama` |
| **Papua New Guinea** | `Pacific/Bougainville` |
| **Papua New Guinea** | `Pacific/Port_Moresby` |
| **Paraguay** | `America/Asuncion` |
| **Peru** | `America/Lima` |
| **Philippines** | `Asia/Manila` |
| **Pitcairn** | `Pacific/Pitcairn` |
| **Poland** | `Europe/Warsaw` |
| **Portugal** | `Atlantic/Azores` |
| **Portugal** | `Atlantic/Madeira` |
| **Portugal** | `Europe/Lisbon` |
| **Puerto Rico** | `America/Puerto_Rico` |
| **Qatar** | `Asia/Qatar` |
| **Republic of the Congo** | `Africa/Brazzaville` |
| **Reunion** | `Indian/Reunion` |
| **Romania** | `Europe/Bucharest` |
| **Russia** | `Asia/Anadyr` |
| **Russia** | `Asia/Barnaul` |
| **Russia** | `Asia/Chita` |
| **Russia** | `Asia/Irkutsk` |
| **Russia** | `Asia/Kamchatka` |
| **Russia** | `Asia/Khandyga` |
| **Russia** | `Asia/Krasnoyarsk` |
| **Russia** | `Asia/Magadan` |
| **Russia** | `Asia/Novokuznetsk` |
| **Russia** | `Asia/Novosibirsk` |
| **Russia** | `Asia/Omsk` |
| **Russia** | `Asia/Sakhalin` |
| **Russia** | `Asia/Srednekolymsk` |
| **Russia** | `Asia/Tomsk` |
| **Russia** | `Asia/Ust-Nera` |
| **Russia** | `Asia/Vladivostok` |
| **Russia** | `Asia/Yakutsk` |
| **Russia** | `Asia/Yekaterinburg` |
| **Russia** | `Europe/Astrakhan` |
| **Russia** | `Europe/Kaliningrad` |
| **Russia** | `Europe/Kirov` |
| **Russia** | `Europe/Moscow` |
| **Russia** | `Europe/Samara` |
| **Russia** | `Europe/Saratov` |
| **Russia** | `Europe/Simferopol` |
| **Russia** | `Europe/Ulyanovsk` |
| **Russia** | `Europe/Volgograd` |
| **Rwanda** | `Africa/Kigali` |
| **Saint Barthélemy** | `America/St_Barthelemy` |
| **Saint Helena** | `Atlantic/St_Helena` |
| **Saint Kitts and Nevis** | `America/St_Kitts` |
| **Saint Lucia** | `America/St_Lucia` |
| **Saint Martin** | `America/Marigot` |
| **Saint Pierre and Miquelon** | `America/Miquelon` |
| **Saint Vincent and the Grenadines** | `America/St_Vincent` |
| **Samoa** | `Pacific/Apia` |
| **San Marino** | `Europe/San_Marino` |
| **Sao Tome and Principe** | `Africa/Sao_Tome` |
| **Saudi Arabia** | `Asia/Riyadh` |
| **Senegal** | `Africa/Dakar` |
| **Serbia** | `Europe/Belgrade` |
| **Seychelles** | `Indian/Mahe` |
| **Sierra Leone** | `Africa/Freetown` |
| **Singapore** | `Asia/Singapore` |
| **Sint Maarten** | `America/Lower_Princes` |
| **Slovakia** | `Europe/Bratislava` |
| **Slovenia** | `Europe/Ljubljana` |
| **Solomon Islands** | `Pacific/Guadalcanal` |
| **Somalia** | `Africa/Mogadishu` |
| **South Africa** | `Africa/Johannesburg` |
| **South Georgia and the South Sandwich Islands** | `Atlantic/South_Georgia` |
| **South Korea** | `Asia/Seoul` |
| **South Sudan** | `Africa/Juba` |
| **Spain** | `Africa/Ceuta` |
| **Spain** | `Atlantic/Canary` |
| **Spain** | `Europe/Madrid` |
| **Sri Lanka** | `Asia/Colombo` |
| **Sudan** | `Africa/Khartoum` |
| **Suriname** | `America/Paramaribo` |
| **Svalbard and Jan Mayen** | `Arctic/Longyearbyen` |
| **Swaziland** | `Africa/Mbabane` |
| **Sweden** | `Europe/Stockholm` |
| **Switzerland** | `Europe/Zurich` |
| **Syria** | `Asia/Damascus` |
| **Taiwan** | `Asia/Taipei` |
| **Tajikistan** | `Asia/Dushanbe` |
| **Tanzania** | `Africa/Dar_es_Salaam` |
| **Thailand** | `Asia/Bangkok` |
| **Togo** | `Africa/Lome` |
| **Tokelau** | `Pacific/Fakaofo` |
| **Tonga** | `Pacific/Tongatapu` |
| **Trinidad and Tobago** | `America/Port_of_Spain` |
| **Tunisia** | `Africa/Tunis` |
| **Turkey** | `Europe/Istanbul` |
| **Turkmenistan** | `Asia/Ashgabat` |
| **Turks and Caicos Islands** | `America/Grand_Turk` |
| **Tuvalu** | `Pacific/Funafuti` |
| **U.S. Virgin Islands** | `America/St_Thomas` |
| **Uganda** | `Africa/Kampala` |
| **Ukraine** | `Europe/Kiev` |
| **Ukraine** | `Europe/Uzhgorod` |
| **Ukraine** | `Europe/Zaporozhye` |
| **United Arab Emirates** | `Asia/Dubai` |
| **United Kingdom** | `Europe/London` |
| **United States** | `America/Adak` |
| **United States** | `America/Anchorage` |
| **United States** | `America/Boise` |
| **United States** | `America/Chicago` |
| **United States** | `America/Denver` |
| **United States** | `America/Detroit` |
| **United States** | `America/Indiana/Indianapolis` |
| **United States** | `America/Indiana/Knox` |
| **United States** | `America/Indiana/Marengo` |
| **United States** | `America/Indiana/Petersburg` |
| **United States** | `America/Indiana/Tell_City` |
| **United States** | `America/Indiana/Vevay` |
| **United States** | `America/Indiana/Vincennes` |
| **United States** | `America/Indiana/Winamac` |
| **United States** | `America/Juneau` |
| **United States** | `America/Kentucky/Louisville` |
| **United States** | `America/Kentucky/Monticello` |
| **United States** | `America/Los_Angeles` |
| **United States** | `America/Menominee` |
| **United States** | `America/Metlakatla` |
| **United States** | `America/New_York` |
| **United States** | `America/Nome` |
| **United States** | `America/North_Dakota/Beulah` |
| **United States** | `America/North_Dakota/Center` |
| **United States** | `America/North_Dakota/New_Salem` |
| **United States** | `America/Phoenix` |
| **United States** | `America/Sitka` |
| **United States** | `America/Yakutat` |
| **United States** | `Pacific/Honolulu` |
| **United States Minor Outlying Islands** | `Pacific/Midway` |
| **United States Minor Outlying Islands** | `Pacific/Wake` |
| **Uruguay** | `America/Montevideo` |
| **Uzbekistan** | `Asia/Samarkand` |
| **Uzbekistan** | `Asia/Tashkent` |
| **Vanuatu** | `Pacific/Efate` |
| **Vatican** | `Europe/Vatican` |
| **Venezuela** | `America/Caracas` |
| **Vietnam** | `Asia/Ho_Chi_Minh` |
| **Wallis and Futuna** | `Pacific/Wallis` |
| **Western Sahara** | `Africa/El_Aaiun` |
| **Yemen** | `Asia/Aden` |
| **Zambia** | `Africa/Lusaka` |
| **Zimbabwe** | `Africa/Harare` |

## License

Protodate comes with an Apache 2.0 license. [Read the license here](https://github.com/Pamblam/protodate/blob/master/LICENSE).
