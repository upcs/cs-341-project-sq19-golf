//Dummy test for completions sake. Please check the WebScraper folder for more purposed testing
var func = require('../public/functions')

test('Submit, a mocked up function', () => {
	func.submit();
	expect(1).toBe(1);
})
