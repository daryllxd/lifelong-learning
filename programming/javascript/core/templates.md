# Templating
[link](http://jsforallof.us/2014/08/08/templating/)

A template is a document which can be built upon or from to produce other documents.

    $('#searchInput').on('keyup', function(e){
            var value = $(this).val();
            $.ajax({
                    url: "/autocomplete/" + value,
                    success: function(results){
                            var resultsEl = $('#results');
                            resultsEl.empty();
                            for(var i = 0; i < results.length; i++){
                                    resultsEl.append('<li class="search-result">' + results[i].item + '</li>');
                            }
                    }
            });
    });

This autocompletes via an AJAX call to the back-end. We can use Handlebars for this:

    <script id="results-template" type="text/x-handlebars-template">
    {{#each results}}
            <li class="search-result">{{item}}</li>
    {{/each}}
    </script>

Templates pull the actual HTML out of the JavaScript code.

Handlebars stores the fragment of HTML in script tags, but it changes the `type` attribute to something other than `text/javascript`, which means that it won't be processed by the browser as actual JavaScript code.

    $('#searchInput').on('keyup', function(e){
            var value = $(this).val();
            $.ajax({
                    url: "/autocomplete/" + value,
                    success: function(results){
                            var resultsEl = $('#results');
                            var source = $("#results-template").html(); // this is the contents of our script tag
                            var template = Handlebars.compile(source); // here we pass the template to Handlebars
                            var html = template(results); // Handlebars gives us a function which returns HTML. Results is from the server
                            resultsEl.html(html); // We can then use that HTML to populate into the DOM
                    }
            });
    });

Gulp: Build system which asks the system to find the main JS file and transform the file as it is being processed.
