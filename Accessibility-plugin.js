 
  

(function(window,$){

// JavaScript source code
   if (typeof window.orientation == 'undefined') {
$(window).ready(function () {
    (function () {
     //is mobile
    if (typeof window.orientation == 'undefined') {

        
        var button = document.createElement('div');
        button.innerHTML = '<a class="openMenu ico-wheelchair"  title="open accessibility menu" href="#" tabindex="0"> &#9855; </a>'
        document.body.insertBefore(button, document.body.childNodes[0]);
        
        var wapContent = document.body;
        var allOptions = ["black", "color", "defult_view", "big_text", "zoom", "links", "defult_all", "keyboard_nav","screen_reader","Access"];
        var activeOptions = [undefined, "black", "color", "big_text", "zoom", "links", "keyboard_nav", "screen_reader"];
        

        function startAc(){
        
        var menuHtml = document.createElement('div');
        menuHtml.innerHTML ='<div id="accessibilityNav" class="sidenav" ><a href="javascript:void(0)"  title="close accessibility menu" class="closeMenu">×</a><a href="#" class="accessibilityTitle" >Accessibility</a><a id="keyboard_nav" title=" keyboard navigation" href="#">Tab navigation</a><a id="screen_reader" title="screen reader" href="#">Screen reader</a><a id="black" title="black & white view " href="#">Black & white</a><a id="color"  title="High contrast view" href="#">High contrast </a><a id="defult_view"  title="Reset view" href="#"> Reset view</a><a id="big_text" title="Bigger text" href="#">Bigger text</a><a id="zoom" title=" Bigger view"  href="#">Bigger view</a><a id="defult_all" title="Reset accessibility" href="#">Rest accessibility </a><a id="accessibility_file" title="Accessibility Statement " href="#"> Accessibility Statement</a></div>';


        document.body.insertBefore(menuHtml, document.body.childNodes[0]);
            
      
        }

/// KeyBoard

        function openPassengerModal(id) {

            $(id).keyup(function (event) {
                    if (event.keyCode == 13) {
                        $(this).click()
                    };
            });

        }
        
        function addClassOnfocus() {

            $('*').focus(function () {
                $(this).addClass("tab_cover");
            }).blur(function () {
                $(this).removeClass("tab_cover");
            });

        }

        function Checkbox_to_RadioButton(box, myEvent) {

            if (myEvent == "enter") {
                var $box = $(box);
                if ($box.attr('checked'))
                    $box.attr('checked', false);
                else
                    $box.attr('checked', true);
            }
            $('input:checkbox[name=' + box.name + ']').each(function () {
                if (this != box)
                    $(this).attr('checked', false);
            });

        }

        function checkboxClick() {
            $('[type="checkbox"]').keypress(function (event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == 13) {
                    //Checkbox_to_RadioButton(this,"enter");
                    (this).click();
                }
                event.stopPropagation();
            });
        }

        function carousel_KeyBoar() {
            if ($('body').hasClass('rtl')) {
                $(".owl-carousel").css("direction", "ltr")
                $('.owl-carousel .owl-item').css("float", "left")
            }
        }

        function runKeyBoardNav() {

            checkboxClick();
            addClassOnfocus();
            carousel_KeyBoar();


            $('.closeMenu').click();
            $('select.fake').css( "opacity", "1");

            if ($('#homeSearch').length > 0) {
                var active_search = $('#homeSearch').find($('.active')).attr("data-lob");

                switch (active_search) {
                    case "Flights":
                        flight_keyboard();
                        break;
                    case "Hotels":
                        hotels_keyboard();
                        break;
                    case "Packages":
                        packages_keyboard();
                        break;
                    case "Cruises":
                        cruises_keyboard();
                        break;
                    case "Trains":
                        return;
                        break;
                    case "Cars":
                        cars_keyboard();
                        break;
                    case "Transfers":
                        transfers_keyboard();
                        break;
                }
            } else {
                if ($(".contBuscadorPaquetes").length > 0) {
                    packages_keyboard();
                } else if ($(".contBuscadorVuelos").length > 0) {
                    flight_keyboard();
                } else if ($(".contBuscadorHotelesV").length > 0) {
                    hotels_keyboard();
                } else if ($("#cruisesSearchBox").length > 0) {
                    cruises_keyboard();
                } else if ($(".contBuscadorCoches").length > 0) {
                    cars_keyboard();
                } else if ($(".buscadorTransfers").length > 0) {
                    transfers_keyboard();
                } else if ($("#brModifySearch").length > 0) {
                    HotelAvailability_keyboard();
                } else if ($("#flightsAvailability").length > 0) {
                flightAvailability_keyboard();
                } else if ($("#cruisesResultBox,#pestanya_calendario").length > 0) {
                    cruisesAvailability_keyboard();
                }

            }
        }

 ///view functions
        function toggleLinks(element, className) {
            var aElemnt = document.getElementsByTagName(element);
            if ($(wapContent).hasClass('links_active')) {
                for (i = 0; i < aElemnt.length; i++) {
                    if ($(aElemnt[i]).parent().attr("id") == "accessibilityNav") continue;
                    $(aElemnt[i]).addClass(className);
                }
            } else {
                for (i = 0; i < aElemnt.length; i++) {
                    if ($(aElemnt[i]).parent().attr("id") == "accessibilityNav") continue;
                    $(aElemnt[i]).removeClass(className);
                }
            }
        }

        function BiggerText() {
            if ($(wapContent).hasClass('big_text_active')) {
                $('*').not("#accessibilityNav a").css('font-size', '102%');
                return;
            } else {
                $('*').not("#accessibilityNav a").css('font-size', '');
                return;
            }
        }

        function defultAll() {
            for (i = 0; i < allOptions.length; i++) {
                $(wapContent).removeClass(allOptions[i] + "_active");
                document.cookie = allOptions[i] + "_active =false;"
            }
            BiggerText();
            toggleLinks("a", "link_text");
            $('#accessibilityNav a').removeClass("active");
        }

        function defultView() {
            $(wapContent).removeClass("black_active color_active");
            setCookie("black_active", "false");
            setCookie("color_active", "false");
            $('#black,#color').removeClass("active");
        }

///screenReader
        function screenReader() {

            $('button,.owl-controls i,.carousel ol li,.owl-pagination .owl-page').attr("role", "button");
            $(".navPrincipal a").attr("role", "navigation");
            $("footer a").attr("role", "link");
            $("img").attr("role", "img");
            $("form").attr("role", "form");
            $("[type='checkbox']").attr("role", "checkbox");
            $("select").attr("role", "select");
            $("option").attr("role", "option");
            $(".owl-carousel").attr("role", "slider");
            $("input[type='text']").attr("role", "input");
            $(".pestanyasBuscador").attr("role", "menu");
            $(".pestanyasBuscador a").attr("role", "menuitem");

        }


///Access 
        function Access() {

            $('[tabindex="-1"]').attr("aria-label", $(this).attr("aria-labelledby")).removeAttr("aria-labelledby");

            $("img:not([alt])").attr("alt", "");
            $("img:not([title])").attr("title", "");

            $("h1:empty").append(".").addClass("spot");
            $("h2:empty").append(".").addClass("spot");
            $("h3:empty").append(".").addClass("spot");
            $("h4:empty").append(".").addClass("spot");
            $("h5:empty").append(".").addClass("spot");

            $("th span:empty").append(".").addClass("spot");

            var label = document.getElementsByTagName('label');

            for (i = 0; i < label.length; i++) {
                if ($(label[i]).text().trim() == "") {
                    $(label[i]).append("<span class='spot'>.</span>");
                }
            }

            var aElemnt = document.getElementsByTagName('a');
            for (i = 0; i < aElemnt.length; i++) {
                if (aElemnt[i].text.trim() == "") {
                    $(aElemnt[i]).attr("aria-label", "icon");
                    $(aElemnt[i]).children("img").attr("alt", "link photo");
                } else {
                    $(aElemnt[i]).removeAttr("title");
                    $(aElemnt[i]).attr("");
                }
                if ($(aElemnt[i]).attr("href") == undefined) {
                    $(aElemnt[i]).attr("href", "#");
                }
            }

            var select = document.getElementsByTagName('select');

            function createSelectLebal(select) {
                $(select).before('<label class="spot" for="' + $(select).attr('id') + '"> ' + $(select).attr("id"))
            }
            for (i = 0; i < select.length; i++) {
                var id = $(select[i]).attr("id");
                var exitLabel = $('label[for="' + id + '"]');
                if (exitLabel.length == 0) {
                    createSelectLebal(select[i]);
                }
            }

            var input = document.getElementsByTagName('input');

            function checkMultilpeLabel(id) {

                var countInput = $('[id="' + id + '"]');
                var conutLabel = $('[for="' + id + '"]');

                

                if (countInput.length == conutLabel.length && conutLabel.length > 1 && countInput.length > 1) {
                    for (i = 0; i < countInput.length; i++) {
                        $(countInput[i]).attr("id", $(input[i]).attr("id") + i);
                        $(conutLabel[i]).attr("for", $(input[i]).attr("for") + i);
                    }
                    return;
                }


                if (countInput.length != conutLabel.length && conutLabel.length > 1 && countInput.length > 1) {
                    for (i = 0; i < countInput.length; i++) {
                        $(countInput[i]).attr("id", $(input[i]).attr("id") + i);
                        if (conutLabel[i] != undefined) {
                            $(conutLabel[i]).attr("for", $(input[i]).attr("for") + i);
                        }
                    }
                }

            }

            function createLebal(input) {
                $(input).attr("aria-label", $(input).attr("name"));
            }

            for (i = 0; i < input.length; i++) {
                var id = $(input[i]).attr("id");
                if (id == "devolucion") return;
                if (id != undefined) checkMultilpeLabel(id);
            }

            for (i = 0; i < input.length; i++) {
                var id = $(input[i]).attr("id");
                var exitLabel = $('label[for="' + id + '"]');
                if (exitLabel.length == 0) {
                    createLebal(input[i]);
                }
                if ($(input[i]).attr("value") == undefined) {
                    input[i].setAttribute("value", "");
                }
            }

        };

        function HotelAvailabilityAccess() {

           
            $.each($("button i:empty"), function (index, value) {
                if ($(this).parent().val() != "") {
                    $(this).parent().html($(this).parent().val());
                } else {
                    $(this).parent().html($(this).parent().attr("data-original-title"))
                }
            });
            $('span.txtBMedio').css("color", "black");

        }

        function flightAvailabilityAccess() {
             
          $('.cflight').attr("tabindex", "0");
          $('.cflight').first().focus();

            $('.cflight').keyup(function (event) {
                if (event.keyCode == 13) {
                    $(this).click();
                    $('a.continueWithSelectedFlights').attr("href", "#").focus();
                }
            })

        }

 ///Cookie
        function setCookie(cname, cvalue) {
            var d = new Date();
            d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        function cookiesCheck() {
            for (i = 0; i < allOptions.length; i++) {
                var cookieName = allOptions[i] + "_active";
                var idName = "#" + allOptions[i];
                var status = getCookie(cookieName);
                if (status == "true") {
                    $(wapContent).addClass(cookieName);
                    $(idName).toggleClass("active");

                        if (cookieName == "links_active" ) {
                            toggleLinks("a", "link_text");
                        }
                        else if (cookieName == "big_text_active" ) {
                            BiggerText();
                        }
                        else if (cookieName == "keyboard_nav_active" ) {
                            runKeyBoardNav();
                        }
                        else if (cookieName == "screen_reader_active" ) {
                            screenReader();
                        }

               }
            }
        }

//Events
        var openClick = 0;
        var needAccess = true;
        $(document).on('click', '.openMenu', function (e) {
            if (openClick == 0){
                startAc();
                openClick++;
                 setTimeout(function(){
                document.getElementById("accessibilityNav").style.width = "290px";
                 }, 500);
                 Access();
                 clickAccess = false;
            }else{
                            document.getElementById("accessibilityNav").style.width = "290px";
            }
          

        });

        $(document).on('click', '.closeMenu', function (e) {
            document.getElementById("accessibilityNav").style.width = "0";
        });

        $(document).on('click', '#accessibilityNav a', function (e) {
            
            if ($(this).attr("id") == undefined) return;
            var elementId = $(this).attr("id");
            var idName = elementId + "_active";
            $(wapContent).toggleClass(idName); 
            if (elementId == "defult_all") {
                defultAll();
                return;
            }
            else if (elementId == "defult_view") {
                defultView();
                return;
            }
            else if (elementId == "accessibility_file") {
                
                confirm(AcStatment);
                return;
            }
            else if (elementId == "links") toggleLinks("a", "link_text");
            else if (elementId == "keyboard_nav") runKeyBoardNav();
            else if (elementId == "big_text") BiggerText();
            else if (elementId == "screen_reader") screenReader();

            if ($(wapContent).hasClass(idName)) {
                setCookie(idName, "true");
            } else {
                setCookie(idName, "false");
            }
            if (activeOptions.indexOf(elementId)) {
                $(this).toggleClass("active");
            }
        });

        $(document).on("click", ".pestanyasBuscador a", function () {

            if (getCookie("keyboard_nav_active") == "true"){
                $(document).ajaxComplete(function (event, xhr, settings) { 
                    if (settings.url.indexOf("SearchBox")) {
                            runKeyBoardNav();
                            Access();
                    }
               });
             }
        });


        (function init() {           
                cookiesCheck();
        }());
        
      }

    }());

});
  
 }
    
      
        var AcStatment = ` Accessibility Statement

        The company attaches great importance to the fact that everyone can use the site and navigate easily, so that the company invests great effort in making the site accessible to the entire population.

        One of our goals is to provide the experience paid to anyone who wants to take a vacation. We do everything in order to make the information accessible to the customer easily and conveniently from the first click to the return home with a great smile and a lot of experience, for which we make every effort to achieve this goal.
        The site is accessible at level "2" standard according to the W3C standard.
        Accessibility on site

        All the pages of the site have an accessibility menu in the upper left corner, to facilitate the use of the site at any time.
        In the accessibility menu you can find a number of accessories to use on the site, such as site navigation by keyboard only, site matching to screen reader, black and white site display, high contrast site display, enlarge text on site, enlarge display, Flashes and stop elements that move without user control.
        Keyboard Navigation Guide:

            After selecting the keyboard navigation accessibility menu, you can easily navigate to all parts of the site by pressing the TAB button and to go back you can press TAB + Shift, you can perform a selection by pressing the Enter button and exit by the Esc button to control the date fields and change the date on By entering numbers 1 - 9 in the format of year / month / day.
            Exclusions:

            It is possible that there were pages or information that would come from other sites or update contents or parts and areas on the site that have not yet been updated. But we will do our best to find the right solution to give each user all the options and services on the site.
            contact:

            In the event that you encounter a problem on the site that prevented you from using or navigating the site, we would be happy to share with you so that other users will not encounter the same problem. You can contact us by sending an email to: In order for us to solve the problem please specify in the email the action that is being avoided by the user, what type of browser, operating system, if there is assistive technology and the address of the page.
            In any case we will always be happy to help you instantly by our customer service.

            The Accessibility Statement was last updated on: 1.1.2018` ;   



})(window ,$);


