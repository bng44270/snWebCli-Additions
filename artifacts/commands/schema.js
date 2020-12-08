input = input.replace(/^schema[ \t]*/i,'');

if (input.length > 0) {
	var callServerApi = new GlideAjax('x_293397_web_cli.WebCLIServer');
	callServerApi.addParam('sysparm_name','getTableSchema');
	callServerApi.addParam('sysparm_cli_table_name',input);
	callServerApi.addParam('sysparm_scope','x_293397_web_cli');
	callServerApi.getXML(function(response) {
		var serverData = JSON.parse(response.responseXML.documentElement.getAttribute('answer'));
		var tableListing = [];
		serverData.tables.forEach(function(thisTable) {
			thisTable.fields.forEach(function(thisField) {
				tableListing.push("  " + thisTable.name + '.' + thisField.element + '(' + thisField.type + ')');
			});
		});
		snCli.showOutput("Table Inheritence:\n  " + serverData.tableMap + '\n\nFields - table.field(datatype):\n' + tableListing.join('\n'));
	});
}
else {
	snCli.showOutput('Table name not specified');
}