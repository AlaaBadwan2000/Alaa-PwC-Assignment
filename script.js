$(document).ready(function () {
  $(".button").on("click", function (event) {
    var city = document.getElementById("city").value;

    $(".loading-icon").removeClass("hide");
    $(".button").attr("disabled", true);
    $(".btn-text").text("Searching...");
    event.preventDefault();

    setTimeout(function () {
      $(".loading-icon").addClass("hide");
      $(".button").attr("disabled", false);
      $(".btn-text").text("Search");
    }, 3000);
    $.ajax({
      method: "GET",
      async: false,
      url: "https://api.api-ninjas.com/v1/geocoding?city=" + city,
      headers: {
        "X-Api-Key": "DwOzFphXygW+LH16qrf5Iw==3e1qVnG8sTXfOtfa",
      },
      contentType: "application/json",
      success: function (result) {
        if (result.length > 0) {
          var arr = [];
          var longitude = result[0].longitude;
          var latitude = result[0].latitude;
          arr.push(longitude);
          arr.push(latitude);
          focusLocation(arr);
        } else {
          window.alert("Please enter a valid city!");
        }
      },
      error: function ajaxError(jqXHR) {
        console.error("Error: ", jqXHR.responseText);
      },
    });
    $(document).ajaxStart(function () {
      $(".loader").show();
    });

    $(document).ajaxStop(function () {
      $(".loader").hide();
    });
  });
  $(".loader").show();
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      var arr = [];
      var longitude = position.coords.longitude;
      var latitude = position.coords.latitude;
      arr.push(longitude);
      arr.push(latitude);
      focusLocation(arr);
    });
  } else {
    focusLocation([35.9239625, 31.9515694]);
  }
  function focusLocation(arr) {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWxhYS1iYWR3YW4iLCJhIjoiY2xjZGRmdWJwMXByMTN2cDhiOGlzdzV0cCJ9.no4yMfUQ3fCWNFgKNFTzYA";
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: arr,
      zoom: 9,
    });
    $(".loader").hide();
  }
});
