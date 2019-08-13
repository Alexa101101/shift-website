import '../sass/styles.scss';

// Require modules
require("./modules/nojs");
require("./modules/svgsprite");
require("./modules/dimensions");
require("./modules/viewport");
require("./modules/banner");
require("./modules/roadmap");

function getParentWithMatchingSelector (target, selector) {
    let result = null;
    [...document.querySelectorAll(selector)].forEach(function(el) {
        if (el !== target && el.contains(target)) {
            result = el;
        }
    });
    return result;
}

function handleHref(href, target = "_self", linkdiv = null) {
    console.log("handleHref", href, target);
    if (linkdiv) {
        // Handle linkdiv animations when needed
        if (linkdiv.classList.contains("newsarticle")) {
            console.log("Handle newsarticle animation");
        }
    }
}

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
            } else if (action === "togglemenu") {
                if (document.body.classList.contains("menu-open")) {
                    document.body.classList.remove("menu-open");
                    element.classList.remove("is-active");
                } else {
                    document.body.classList.add("menu-open");
                    element.classList.add("is-active");
                }
            } else if (action === "locknload") {
                if (document.getElementsByClassName("steps")[0].classList.contains("inactive")) {
                    document.getElementsByClassName("steps")[0].classList.remove("inactive");
                } else {
                    document.getElementsByClassName("steps")[0].classList.add("inactive");
                }
            }
        } else {
            var e = e || window.event;
            const element = e.target || e.srcElement;
                const linkdiv = getParentWithMatchingSelector(element, '.linkdiv');
                if (linkdiv) {
                    e.preventDefault();
                    // Href with linkdiv & custom animations when needed
                    if (linkdiv.querySelector("a")) {
                        const href = linkdiv.querySelector("a").getAttribute("href");
                        let target = linkdiv.querySelector("a").getAttribute("target");
                        handleHref(href, target ? target : "_self", linkdiv);
                    }
                } else if (element.hasAttribute("href")) {
                    e.preventDefault();
                    // Normal href without linkdiv
                    const href = element.getAttribute("href");
                    const target = element.getAttribute("target");
                    handleHref(href, target);
                }
        }
    }
);

window.addEventListener("scroll", function() {
    var bannerTarget = document.getElementsByClassName("banner")[0];
    if (bannerTarget) {
        if (window.scrollY > (bannerTarget.offsetTop + bannerTarget.offsetHeight - 200)) {
            bannerTarget.classList.add("past");
        } else {
            bannerTarget.classList.remove("past");
        }
    }
    var maincontainerTarget = document.getElementsByClassName("maincontainer")[0];
    if (window.scrollY > (maincontainerTarget.offsetTop + maincontainerTarget.offsetHeight - window.innerHeight)) {
        maincontainerTarget.classList.add("past");
    } else {
        maincontainerTarget.classList.remove("past");
    }
});

// Force to start at top of page, because of the animations.
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

studioibizz.fakepreload.init();