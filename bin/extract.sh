#!/bin/bash

# Generate script/command files

stripxml() {
	sed 's/\(<\/[^>]\+>\)/\1\n/g;s/<[^>]\+>//g'
}

getcdata() {
	perl -0777 -pe 's/^.*<!\[CDATA\[(.*)\]\]>.*$/\1/igs'
}

BASE="$(dirname $0)/.."
ARTBASE="$BASE/artifacts"

[[ -d $ARTBASE ]] || mkdir $ARTBASE
[[ -d $ARTBASE/commands ]] || mkdir $ARTBASE/commands
[[ -d $ARTBASE/scripts ]] || mkdir $ARTBASE/scripts

xmllint --xpath  /unload/x_293397_web_cli_command_scripts/name $BASE/x_293397_web_cli_command_scripts.xml | stripxml | while read line; do
	xmllint --xpath '/unload/x_293397_web_cli_command_scripts[name="'"$line"'"]/script' $BASE/x_293397_web_cli_command_scripts.xml | stripxml > $ARTBASE/scripts/$line.script
done

xmllint --xpath '/unload/x_293397_web_cli_code_entries/name' $BASE/x_293397_web_cli_code_entries.xml | stripxml | while read line; do
	xmllint --xpath '/unload/x_293397_web_cli_code_entries[name="'"$line"'"]/script' $BASE/x_293397_web_cli_code_entries.xml | getcdata > $ARTBASE/commands/$line.js
done
