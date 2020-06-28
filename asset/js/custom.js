/* Theme Name: Worthy - Free Powerful Theme by HtmlCoder
 * Author:HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Version:1.0.0
 * Created:November 2014
 * License: Creative Commons Attribution 3.0 License (https://creativecommons.org/licenses/by/3.0/)
 * File Description: Place here your custom scripts
 */

$(".read-more").on('click', function() {
    $(this).hide();
    $(".hidden-text").slideDown();
})

$(".read-less").on('click', function() {
    $(".hidden-text").slideUp();
    $(".read-more").show('slow');
})

$(window).load(readMore)

$(window).resize(readMore)

function readMore() {
    var width = $(window).width();
    if(width < 768) {
        $(".read-more, .read-less").each(function() {
            $(this).show()
            $(".hidden-text").hide();
        })
    } else {
        $(".read-more, .read-less").each(function() {
            $(this).hide();
            $(".hidden-text").show();
        })
    }
}
