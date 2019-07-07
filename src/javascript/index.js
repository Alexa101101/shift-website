import '../sass/styles.scss';

// Remove "no-js" class since we do have javascript enabled
document.body.className = document.body.className.replace("no-js","");


// Load SVG sprite
var ajax = new XMLHttpRequest();
ajax.open("GET", "/dist/icons/sprite.svg", true);
ajax.send();
ajax.onload = function(e)
{
    var div = document.createElement("div");
    div.style.display = "none";
    div.innerHTML = ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);
}

// Set the --vh without the navbar for mobile
function calculateHeight()
{
    var vh = window.innerHeight;
    document.documentElement.style.setProperty('--vh', vh + "px");
}
window.addEventListener('resize', calculateHeight);
calculateHeight();

// Scroll to animation
// document.getElementsByClassName(".banner .scrollto").
//     function () {
//         $("html,body").animate({scrollTop: $(window).width() <= 767 ? $(".grid > .banner + *").offset().top - 50 : $(".grid > .banner + *").offset().top}, 1000);
//     }
// );


// Call to actions
document.addEventListener(
    "click",
    function (e) {
        const element = this.activeElement;
        const action = element.dataset.action;

        if (action) {
            if (action === "scrollto") {
                document.getElementsByClassName("maincontainer")[0].scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    }
);
