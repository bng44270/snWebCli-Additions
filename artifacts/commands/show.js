success = false;

postData = {
	type: "",
	table : ""
};

var objectType = "";

input = input.replace(/^show[ \t]+/,'');

if (input.match(/^business-rule/)) {
	input = input.replace(/^business-rule[ \t]+/,"");
	if (input.match(/^for/)) {
		input = input.replace(/^for[ \t]+/,"");
		if (input.length > 0) {
			success = true;
			postData.table = input;
			postData.type = "sys_script";
			objectType = "business rule";
		}
	}
}
else if (input.match(/^client-script/)) {
	input = input.replace(/^client-script[ \t]+/,"");
	if (input.match(/^for/)) {
		input = input.replace(/^for[ \t]+/,"");
		if (input.length > 0) {
			success = true;
			postData.table = input;
			postData.type = "sys_script_client";
			objectType = "client script";
		}
	}
}
else if (input.match(/^ui-action/)) {
	input = input.replace(/^ui-action[ \t]+/,"");
	if (input.match(/^for/)) {
		input = input.replace(/^for[ \t]+/,"");
		if (input.length > 0) {
			success = true;
			postData.table = input;
			postData.type = "sys_ui_action";
			objectType = "ui action";
		}
	}
}
else if (input.match(/^ui-policy/)) {
	input = input.replace(/^ui-policy[ \t]+/,"");
	if (input.match(/^for/)) {
		input = input.replace(/^for[ \t]+/,"");
		if (input.length > 0) {
			success = true;
			postData.table = input;
			postData.type = "sys_ui_policy";
			objectType = "ui policy";
		}
	}
}
else if (input.match(/^data-policy/)) {
	input = input.replace(/^data-policy[ \t]+/,"");
	if (input.match(/^for/)) {
		input = input.replace(/^for[ \t]+/,"");
		if (input.length > 0) {
			success = true;
			postData.table = input;
			postData.type = "sys_data_policy2";
			objectType = "data policy";
		}
	}
}
else if (input.match(/^notification/)) {
	input = input.replace(/^notification[ \t]+/,"");
	if (input.match(/^for/)) {
		input = input.replace(/^for[ \t]+/,"");
		if (input.length > 0) {
			success = true;
			postData.table = input;
			postData.type = "sysevent_email_action";
			objectType = "notification";
		}
	}
}
else if (input.match(/^dictionary/)) {
	input = input.replace(/^dictionary[ \t]+/,"");
	if (input.match(/^for/)) {
		input = input.replace(/^for[ \t]+/,"");
		if (input.length > 0) {
			success = true;
			postData.table = input;
			postData.type = "sys_dictionary";
			objectType = "dictionary";
		}
	}
}
else if (input.match(/^override/)) {
	input = input.replace(/^override[ \t]+/,"");
	if (input.match(/^for/)) {
		input = input.replace(/^for[ \t]+/,"");
		if (input.length > 0) {
			success = true;
			postData.table = input;
			postData.type = "sys_dictionary_override";
			objectType = "dictionary override";
		}
	}
}
else if (input.match(/^acl/)) {
	input = input.replace(/^acl[ \t]+/,"");
	if (input.match(/^for/)) {
		input = input.replace(/^for[ \t]+/,"");
		if (input.length > 0) {
			success = true;
			postData.table = input;
			postData.type = "sys_security_acl";
			objectType = "acl";
		}
	}
}
else if (input.match(/^style/)) {
	input = input.replace(/^style[ \t]+/,"");
	if (input.match(/^for/)) {
		input = input.replace(/^for[ \t]+/,"");
		if (input.length > 0) {
			success = true;
			postData.table = input;
			postData.type = "sys_ui_style";
			objectType = "style";
		}
	}
}
else if (input.match(/^view-rule/)) {
	input = input.replace(/^view-rule[ \t]+/,"");
	if (input.match(/^for/)) {
		input = input.replace(/^for[ \t]+/,"");
		if (input.length > 0) {
			success = true;
			postData.table = input;
			postData.type = "sysrule_view";
			objectType = "view rule";
		}
	}
}
else if (input.match(/^hierarchy/)) {
	input = input.replace(/^hierarchy[ \t]+/,"");
	if (input.match(/^for/)) {
		input = input.replace(/^for[ \t]+/,"");
		if (input.length > 0) {
			success = true;
			postData.table = input;
			postData.type = "hierarchy";
		}
	}
}
else if (input.match(/^info/)) {
	input = input.replace(/^info[ \t]+/,"");
	if (input.match(/^for/)) {
		input = input.replace(/^for[ \t]+/,"");
		if (input.length > 0) {
			success = true;
			postData.table = input;
			postData.type = "sys_db_object";
			objectType = "info";
		}
	}
}

if (success) {
	var callServerApi = new GlideAjax('x_293397_web_cli.WebCLIServer');
	callServerApi.addParam('sysparm_name','getRelatedObjects');
	callServerApi.addParam('sysparm_obj_type',postData.type);
	callServerApi.addParam('sysparm_obj_table',postData.table);
	callServerApi.addParam('sysparm_scope','x_293397_web_cli');
	callServerApi.getXML(function(response) {
		var serverData = JSON.parse(response.responseXML.documentElement.getAttribute('answer'));
		if (serverData.length > 0) {
			if (postData.type == 'hierarchy') {
				snCli.showOutput('Hierarchy for ' + postData.table + '\n  ' + serverData.join(' --> '));
			}
			else {
				snCli.showOutput(objectType + " for " + postData.table + ":\n" + serverData.map(function(thisObj) {
					return "  " + thisObj.name + ' [<a target="_blank" href="/nav_to.do?uri=' + encodeURI('/' + postData.type + '.do?sys_id=' + thisObj.sys_id) + '">view</a>]';
				}).join('\n'));
			}
		}
		else {
			snCli.showOutput('No records found');
		}
	});
}
else {
	snCli.showOutput('Error in show statement');
}