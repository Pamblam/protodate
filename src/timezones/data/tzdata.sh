#!/bin/bash

# Create the javascript timezone data files (tzdata-1835-2500.js & tzdata-2012-2022.js)
# Run this script with the mysql username and password:
# ./tzdata.sh mysqluser mysqlpass

# Data source: https://timezonedb.com/download
# Last Updated 26 Mar, 2018

user=$1
password=$2
database=timezonedb
here="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
sql="$here/timezonedb.sql"

jsfileall="$here/tzdata-1835-2500.js"
jsfileltd="$here/tzdata-2012-2022.js"

mysql --user="$user" --password="$password" --execute="DROP DATABASE IF EXISTS $database; CREATE DATABASE $database;"
mysql --user="$user" --password="$password" --database="$database" < $sql

rm -f $jsfileall
rm -f $jsfileltd
touch $jsfileall
touch $jsfileltd
echo " " >> $jsfileall
echo " " >> $jsfileltd
echo "(function(){" >> $jsfileall
echo "(function(){" >> $jsfileltd
echo "	Date.TZData = {" >> $jsfileall
echo "	Date.TZData = {" >> $jsfileltd
echo "		// \"zone_name\": [[\"abbreviation\", \"time_start\", \"gmt_offset\", \"dst\"],...]" >> $jsfileall
echo "		// \"zone_name\": [[\"abbreviation\", \"time_start\", \"gmt_offset\", \"dst\"],...]" >> $jsfileltd

mysql --user="$user" --password="$password" --database="$database" --skip-column-names --execute="SELECT DISTINCT zone_name zn FROM timezonedb.zone ORDER BY zone_name ASC" | while read zn; do
	
	echo "		\"$zn\": [" >> $jsfileall
	echo "		\"$zn\": [" >> $jsfileltd

	echo $zn

	mysql --user="$user" --password="$password" --database="$database" --skip-column-names --execute="SELECT tz.abbreviation, tz.time_start, tz.gmt_offset, tz.dst, z.zone_name FROM timezone tz JOIN zone z ON tz.zone_id = z.zone_id WHERE z.zone_name = \"$zn\" ORDER BY tz.time_start ASC" | while read abbreviation time_start gmt_offset dst zone_name; do
		echo "			[\"$abbreviation\", $time_start, $gmt_offset, $dst]," >> $jsfileall
	done
	
	FOUND=$(mysql --user="$user" --password="$password" --database="$database" --skip-column-names --execute="SELECT tz.abbreviation, tz.time_start, tz.gmt_offset, tz.dst, z.zone_name FROM timezone tz JOIN zone z ON tz.zone_id = z.zone_id WHERE z.zone_name = \"$zn\" AND tz.time_start > 1325375999 AND tz.time_start < 1672531200 ORDER BY tz.time_start ASC" | while read abbreviation time_start gmt_offset dst zone_name; do
		echo "			[\"$abbreviation\", $time_start, $gmt_offset, $dst]," >> $jsfileltd
		echo "1"
	done)
	
	if [ "$FOUND" = "" ]; then
		mysql --user="$user" --password="$password" --database="$database" --skip-column-names --execute="SELECT tz.abbreviation, tz.time_start, tz.gmt_offset, tz.dst, z.zone_name FROM timezone tz JOIN zone z ON tz.zone_id = z.zone_id WHERE tz.abbreviation != \"LMT\" AND z.zone_name = \"$zn\" ORDER BY tz.time_start ASC LIMIT 1" | while read abbreviation time_start gmt_offset dst zone_name; do
			echo "			[\"$abbreviation\", -4260211200, $gmt_offset, $dst]," >> $jsfileltd
		done
	fi

	echo "		]," >> $jsfileall
	echo "		]," >> $jsfileltd
done

echo "	};" >> $jsfileall
echo "	};" >> $jsfileltd
echo "})();" >> $jsfileall
echo "})();" >> $jsfileltd
mysql --user="$user" --password="$password" --execute="DROP DATABASE IF EXISTS $database;"
echo "All done."