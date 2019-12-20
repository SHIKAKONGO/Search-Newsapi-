$(document).ready( function() {

    $('#searchbtn').on('click' , function(e) {
        e.preventDefault();
        let query = $('#searchquery').val();
        let url = "https://newsapi.org/v2/everything?q="+query+"&from=2019-12-1&sortBy=publishedAt&apiKey=7197d404acc54f7d9fa022c556e06be8";

        if(query !== '') {
            $.ajax({
                url: url,
                method: "GET",
                dataType: "json",

                beforeSend: function() {
                    $("#loader").show();
                },

                complete: function() {
                    $("#loader").hide();
                },

                success: function(data) {
                    let output = "";
                    let news = data.articles;

                    for( var i in news ) {
                        output += `
                        <div class="col 16 md6 s12">
                            <h4>${news[i].title}</h4>
                            <img src="${news[i].urlToImage}" class="responsive-img">
                            <p>${news[i].description}</p>
                            <p>${news[i].content}</p>
                            <p>Published on:${news[i].publishedAt}</p>
                            <a target="_blank" href="${news[i].url}" class="btn">Read More</a>
                           </div> 
                        `;
                    };

                    if(output !== '') {
                        $("#newsResults").html(output);
                        M.toast({
                            html: 'Here You Go',
                            classes: 'green'
                        })
                    } else {
                        $("#newsResults").html('Here is No News To Show');
                        M.toast({
                            html: 'Here is No News To Show',
                            classes: 'red'
                        })
                    }
                },

                error: function() {
                    M.toast({
                        html: 'Back To Your Internet Connection',
                        classes: 'red'
                    })
                }
            })
        } else {
            console.log('enter some data');
        }

    });
});