function isElementInViewport (el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function scrollView(elemID) {
    document.getElementById(elemID).scrollIntoView({behavior: "smooth", block: "center"});
}

function copyToClipboard(elem) {
    switch (elem) {
        case 'email':
            navigator.clipboard.writeText('tobiasg2024@gmail.com');
            break;
    
        case 'phone':
            navigator.clipboard.writeText('1 415 290-8692');
            break;

        case 'cpg':
            navigator.clipboard.writeText('249 17th Avenue, 94121, CA');
            break;
    }
}

// Function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to track page view
async function trackPageView() {
    var visitTimestamp = new Date().toUTCString();

    // Get or create a unique visitor ID
    var visitorId = getCookie('visitorId');
    if (!visitorId) {
        visitorId = Math.random().toString(36).substring(2) + Date.now().toString(36);
        setCookie('visitorId', visitorId, 365); // Set a cookie that expires in 365 days
    }
}

// Track page view on page load
window.addEventListener('load', trackPageView);
