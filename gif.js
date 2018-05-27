var gifs = ["T-bone", "Ribeye", "Boston-Butt", "Picanha"];
var flag = 0;

      
      function displayGif() {

        var gif = $(this).attr("data-name");
        var quantity = $("#gif-quantity").val();
        console.log(gif + " valor a buscar en la api")
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=VebGpDGOgiLt6YYsQMzEviuUosk1K86c&q="+gif+"&limit="+quantity+"&offset=0&lang=en";
        var gifDiv =$("<div id=gifs-"+gif+">")

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response.data);
            console.log(response.data.length);

           for (var i = 0; i<response.data.length;i++){
            var gifImageDiv = $("<figure class='gif' id="+i+" data-name="+gif+">");
            var gifImage = $("<img>");
            var rating = $("<figcaption class='caption'>").html(response.data[i].rating+" "+"<a href="+response.data[i].images.original.url+" download>Download</a>");
            gifImage.attr("data-state","still");
            gifImage.attr("data-animate",response.data[i].images.fixed_width.url);
            gifImage.attr("data-still",response.data[i].images.fixed_width_still.url);
            gifImage.attr("src",response.data[i].images.fixed_width_still.url);
            gifImageDiv.append(gifImage);
            gifImageDiv.append(rating);
            gifDiv.append(gifImageDiv);
           } 

        });

        var title = $("<div class='title' id="+gif+">")
        title.html("<h2>"+gif+"<button class='remove' data-name='"+gif+"'>x</button></h2><hr>");
        $("#gifArea").prepend(gifDiv);
        $("#gifArea").prepend(title); 
  

      }

      $("#gifArea").on("click","img" ,function() {
        console.log("entro a cambio de estado")
        console.log(this)
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });



      function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < gifs.length; i++) {
          var a = $("<button>");
          a.addClass("gif-btn");
          a.attr("data-name", gifs[i]);
          a.text(gifs[i]);
          $("#buttons-view").append(a);
        }
      }

      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        gifs.push(gif);
        renderButtons();
      });

      function removeGif() {
          console.log("entro remove")
        var toRemove = $(this).attr("data-name");
        $("#"+toRemove+"").remove();
        $("#gifs-"+toRemove+"").remove();
      }


      $(document).on("click", ".gif-btn", displayGif);
      $(document).on("click", ".remove", removeGif);
      renderButtons();