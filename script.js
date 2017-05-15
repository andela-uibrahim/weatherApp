$(document).ready(function(){
 $.getJSON("http://ip-api.com/json/?callback=?", function(data) {
            console.log(data)
        });
});