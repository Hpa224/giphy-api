// Variables for first buttons, movie titles and users entry.
let button = ["The Last Samurai", "Terminator 2", "Avatar", "King Kong", "Wind River", "Sicario"]
let apikey = "&api_key=OE6tTG6hixkvEz5T79TdFBVlp96rfh68&limit=10"
let names;
let textentry = $("#entry")

// Loop to dynamically create the default buttons.
for (let i = 0; i < button.length; i++) {
    names = button[i] 
    let newbutton = $("<button type='button' class='btn btn-primary'>"+ names + "</button>")
    $("#buttondiv").prepend(newbutton)
    newbutton.attr("title",names)
    newbutton.attr("class","gifbuttons")

    console.log(names)
}

// Function that makes contact with giphy's api and prepends the gifs and their ratings to the page. Also has the if else statement that pauses them or plays them.
$(document).on("click",".gifbuttons", function(){
let movie = $(this).attr("title")
console.log(movie)
let queryurl = "https://api.giphy.com/v1/gifs/search?q=" + movie + apikey;
console.log(queryurl)

    $.ajax({
    url: queryurl,
    method: "GET"
    }).then(function(response) { 
        console.log(response)

        var results = response.data;

        for (let i = 0; i < results.length; i++) {
            let imagediv = $("<div class='col'>")
            let image = $("<img>");
            
            let p = $("<p>").text("Rated: " + results[i].rating.toUpperCase());
            
            image.attr("src", results[i].images.fixed_height_still.url);
            image.attr("still", results[i].images.fixed_height_still.url);
            image.attr("animate", results[i].images.fixed_height.url);
            image.attr("state","still")
            image.attr("class","gif")

            imagediv.append(image)
            imagediv.append(p)
            $("#gifs").prepend(imagediv);
        }


        $(".gif").click(function() {
            let state = $(this).attr("state")

            if (state === "still") {
            $(this).attr("src", $(this).attr("animate"));
            $(this).attr("state", "animate")
            } else {
            $(this).attr("src", $(this).attr("still"));
            $(this).attr("state","still")
            }
        })

    });

})        

// Function that creates a users button (movies titles encouraged).
$("#submit").click(function(){
    let newentry = textentry.val()

    let newbutton = $("<button type='button' class=gifbuttons>"+ newentry + "</button>")
    $("#buttondiv").prepend(newbutton)
    newbutton.attr("title",newentry)

    console.log(newentry)
})