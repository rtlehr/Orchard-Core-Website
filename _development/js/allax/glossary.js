/**
 * Add items to text with a 'run-glossary' class
 *
 * @class glossary
 */

(function() {

	//Load glossary xml
	loadGlossary = function(glossaryPath) {
		var gP = glossaryPath;

		if ($(".add-glossary").length > 0) {

			$.ajax({
				type: "GET",
				url: gP,
				dataType: "xml",
				success: runGlossary,
				fail: glossaryXMLLoadFail
			});

		}
	};

	//Run the glossary
	runGlossary = function(xml) {
		//go thru all the content with the 'run-glossary' class
		$(".add-glossary").each(function(index) {
			//get the text of the content
			var words = $.trim($(this).html());

			//create the contentText verible
			var contentText = null;

			//go thru all the words in the glossary.xml file
			$(xml).find("item").each(function() {
				//if the content has a glossary.xml word replace it with the 'replaceWith' tag
				contentText = words.replace(new RegExp($(this).find("word").text(), 'g'), $(this).find("replaceWith").text());

				//set "words" to the updated content
				words = contentText;

			});

			//change the text of the content to the new updated words
			$(this).html(contentText);
		});

	};

	glossaryXMLLoadFail = function() {
		alert("failed to load glossary file.");
	};

}());
