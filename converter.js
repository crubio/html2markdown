var gutil = require('gulp-util');
var through = require('through2');
var html2md = require('to-markdown');
var fs = require('graceful-fs');
var cheerio = require('cheerio');

/**
 * This method will parse the HTML of the input file and also return the specified content section as markdown.
 * @return steam The file stream passed by gulp
 */
function parseHTML(){
	var stream = through.obj(function(file, enc, cb) {

		var $ = cheerio.load(file.contents);

		// page properties
		var contentObj = {
			bodyId: $('body').attr('id'),
			bodyClass: $('body').attr('class'),
			pageTitle: $('title').text(),
			pageHeader: $('body').children().first().attr('title'),
			pageLeadIn: '[[PAGE_LEAD_IN]]', // Static string
			nextSectionLink: '// Find in folder structure, ie; docroot/ios/human-interface-guidelines/images',
			nextSectionImg: 'images/next-router.jpg',
			nextSectionAlt: 'Alt description',
			nextSectionTitle: $('.next-link a').text(),
			nextSectionBrief: '[[BRIEF_DESCRIPTION_OF_NEXT_SECTION]]', // Static string
			breadcrumbDir: $('.part-name.nav-part-active.open-part').children().first().text(),
			breadcrumbUrl: '// Get this from the page URL', // Not obtainable
			mainContent: html2md($.html('article section.section')) // Converted to markdown
		};

		var headerMsg = "/* PHP section */ \n\n";
		var outputString = '';
		outputString += headerMsg;

		for (var row in contentObj) {
			if (row === 'mainContent') {
				outputString += "\n\n /* Markdown content */ \n\n";
				outputString += contentObj[row];
			} else {
				outputString += row + ': ' + contentObj[row] + '\n';
			}
		}

		if (file.contents.length){
			file.contents = new Buffer(outputString);
		}

		file.path = gutil.replaceExtension(file.path, '.md');

		cb(null,file);
	});

	return stream;
}

module.exports = parseHTML;