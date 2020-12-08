snCli.beginOutputWait('check-acl');

var success = false;

input = input.replace(/^acl[ \t]*/,'');

var tableName = input.replace(/^([^ \t]+)[ \t]+.*$/,"$1");
input = input.replace(/^[^ \t]+[ \t]+/,"");

var fieldName = '';

if (input.match(/^for[ \t]+/)) {
	fieldName = input.replace(/^for[ \t]+([^ \t]+)[ \t]*.*$/,"$1");
}

if (tableName.length > 0) {

var callServerApi = new GlideAjax('x_293397_web_cli.WebCLIServer');
callServerApi.addParam('sysparm_name','getFieldAcl');
callServerApi.addParam('sysparm_cli_table_name',tableName);
callServerApi.addParam('sysparm_cli_field_name',fieldName);
callServerApi.addParam('sysparm_scope','x_293397_web_cli');
callServerApi.getXML(function(response) {
	var serverData = JSON.parse(response.responseXML.documentElement.getAttribute('answer'));
	if (serverData) {
		var aclData = serverData.map(function(thisAcl) {
			return (thisAcl.acl + ' on ' + thisAcl.type + ' ' + thisAcl.operation + ' requires(' + thisAcl.roles.join(',') + ')');
		});
		snCli.endOutputWait(aclData.join('\n'));
	}
	else {
		snCli.endOutputWait('No ACLs found');
	}
});
}
else {
	snCli.endOutputWait('Invalid ACL command');
}