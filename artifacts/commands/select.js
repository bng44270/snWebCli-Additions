snCli.beginOutputWait('select');

var query = {
	fields : '',
	table : '',
	filter : '',
	records : 0,
};

var error = false;

input = input.replace(/^select[ \t]*/i,'');

//Determine fields
if (input.match(/^\*/)) {
	//query.fields = '*';
	error = true;
}
else {
	query.fields = input.replace(/^([^ \t]+)[ \t]*.*$/,"$1");
}

input = input.replace(/^[^ \t]+[ \t]+/,"");

//verify from clause
if (input.match(/^from/i)) {
	input = input.replace(/^from[ \t]*/i,'');
	query.table = input.replace(/^([^ \t]+)[ \t]+.*$/,"$1");
	input = input.replace(/^[^ \t]+[ \t]*/,"");
	if (input.match(/^limit/i)) {
		input = input.replace(/^limit[ \t]*/i,'');
		query.records = input.replace(/^([^ \t]+)[ \t]+.*$/,'$1');
		input = input.replace(/^[^ \t]+[ \t]*/,"");
	}
	if (input.match(/^where/i)) {
		input = input.replace(/^where[ \t]*/i,'');
		query.filter = input.replace(/[ \t]+AND[ \t]+/g,"^").replace(/[ \t]+OR[ \t]+/g,'^OR');
	}
	else {
		query.filter = '';
	}
}
else {
	error = true;
}


if (!error) {
	var callServerApi = new GlideAjax('x_293397_web_cli.WebCLIServer');
	callServerApi.addParam('sysparm_name','runSelectQuery');
	callServerApi.addParam('sysparm_cli_select_table',query.table);
	callServerApi.addParam('sysparm_cli_select_fields',query.fields);
	callServerApi.addParam('sysparm_cli_select_filter',query.filter);
	callServerApi.addParam('sysparm_cli_select_records',query.records);
	callServerApi.addParam('sysparm_scope','x_293397_web_cli');
	callServerApi.getXML(function(response) {
		var serverData = response.responseXML.documentElement.getAttribute('answer');
		var respAr = JSON.parse(serverData);
		if (respAr.length > 0) {
			snCli.endOutputWait(JSON.parse(serverData).map(function(thisItm) {
				return thisItm.fields.join(' -- ') + ' [<a target="_blank" href="/nav_to.do?uri=' + encodeURI('/' + query.table + '.do?sys_id=' + thisItm.sysid) + '">view</a>]';
			}).join('\n'));
		}
		else {
			snCli.showOutput('Error while executing query');
		}
	});
}
else {
	snCli.showOutput('Query syntax error');
}