snCli.showOutput('What is your name?');
snCli.addInputTask(function (input) {
	snCli.showOutput('Nice to meet you, ' + input);
	snCli.resetInputTask();
});