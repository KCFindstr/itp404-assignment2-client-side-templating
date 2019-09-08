let threadTemplate = null;

$(document).ready(() => {
	Handlebars.registerHelper('locale-number',num => num.toLocaleString());
	threadTemplate = Handlebars.compile($('#thread-template').html());
});

function startSearch() {
	$('#load').show();
	$('#result').hide();
	$('#error').hide();
	$.ajax({
		type: 'GET',
		url: 'https://www.reddit.com/r/' + $('#search').val() + '.json'
	})
	.then((data) => {
		data = data.data.children;
		let html = threadTemplate({
			threads: data
		});
		$('#load').hide();
		$('#result > tbody').html(html);
		$('#result').show();
	})
	.fail(() => {
		$('#load').hide();
		$('#error').text('Thread does not exist');
		$('#error').show();
	});
	return false;
}