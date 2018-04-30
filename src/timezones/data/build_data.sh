#!/bin/bash

# Create the javascript timezone data file (tzdata.js)
# Run this script with the mysql username and password:
# ./build_data.sh mysqluser mysqlpass

# Data source: https://timezonedb.com/download
# Last Updated 26 Mar, 2018

user=$1
password=$2
database=timezonedb
here="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
sql="$here/timezonedb.sql"
jsfile="$here/tzdata.js"

rm -f $jsfile
touch $jsfile
echo " " >> $jsfile
echo "(function(){" >> $jsfile
echo "	Date.TZData = [" >> $jsfile
echo "		// [\"abbreviation\", \"time_start\", \"gmt_offset\", \"dst\", \"zone_name\"]," >> $jsfile
mysql --user="$user" --password="$password" --execute="DROP DATABASE IF EXISTS $database; CREATE DATABASE $database;"
mysql --user="$user" --password="$password" --database="$database" < $sql
mysql --user="$user" --password="$password" --database="$database" --skip-column-names --execute="SELECT tz.abbreviation, tz.time_start, tz.gmt_offset, tz.dst, z.zone_name FROM timezone tz join zone z on tz.zone_id = z.zone_id order by tz.time_start, z.zone_name asc" | while read abbreviation time_start gmt_offset dst zone_name; do
	echo "		[\"$abbreviation\", $time_start, $gmt_offset, $dst, \"$zone_name\"]," >> $jsfile
done
echo "	];" >> $jsfile
echo "})();" >> $jsfile
mysql --user="$user" --password="$password" --execute="DROP DATABASE IF EXISTS $database;"
echo "All done."