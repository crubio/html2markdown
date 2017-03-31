## HTLM to markdown converter

This is a gulp task that will convert an html page to markdown using the [to-markdown](https://github.com/domchristie/to-markdown) library and [cheeriojs](https://github.com/cheeriojs/cheerio).  It consumes whole HTML files and returns a file with PHP information parsed from the file and the content section in markdown.

> This is specifically tailored for a certain project, but later versions will have greater functionality.

### Steps

1. Create your HTML files in the source folder.  They will need *.html extension.
1. From bash, run gulp.  The default task 'html2md' will automatically run.
1. View the output!