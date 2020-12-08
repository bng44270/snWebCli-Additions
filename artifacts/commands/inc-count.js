var callServerApi = new GlideAjax('x_293397_web_cli.WebCLIServer');
callServerApi.addParam('sysparm_name','getIncidentCount');
callServerApi.addParam('sysparm_scope','x_293397_web_cli');
callServerApi.getXML(function(response) {
	var serverData = response.responseXML.documentElement.getAttribute('answer');
	snCli.showOutput('Incident count: ' + serverData);
});