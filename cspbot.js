// ==UserScript==
// @name            cspbot.js
// @namespace       http://github.com/jfcandidofilho/cspbot
// @version         1.0.0
// @description     Crowdsignal Poll's Bot to autovote seemlessly.
// @author          J. F. Candido Filho | jfcandidofilho.xyz
// @match           https://poll.fm/10641155
// @match           https://poll.fm/10641155/*
// @grant           none
// @encoding        utf-8
// @downloadURL     https://raw.githubusercontent.com/jfcandidofilho/cspbot/master/cspbot.js
// @updateURL       https://raw.githubusercontent.com/jfcandidofilho/cspbot/master/cspbot.js
// @contributionURL https://github.com/jfcandidofilho/cspbot#donations
// @supportURL      https://github.com/jfcandidofilho/cspbot/issues
// ==/UserScript==

(function() { 'use strict';

    // Sets the poll. The total is the number of URLs or IDs in poll_config.
    var POLL = 0;

    //var new_header = new Headers();

    //new_header.append('Clear-Site-Data', '*');
    //new_header.get('Clear-Site-Data') // should return 'text/xml'

    // Defines the styles of the counting board
    var styles = {

        vote: "font-size: 12pt; position: fixed; clean: both;\
        border: 1em solid #c33; background-color: #fff; \
        color: #33c; padding: 4em; width: 120px; top: 0;\
        height: 70px; font-weight: bold; left: 0; z-index: 2;\
        text-align: center; margin: 10px; border-radius: 25px 25px;",

        vote_title: "font-size: 12pt; color: #678;",

        vote_count: "font-size: 28pt;"

    };

    // Configure polling scheme
    var poll_config = {

        // The list of poll's URLs (in order)
        url: [

            "https://poll.fm/10641155", // CH AWARDS 2020 - Melhores Amigas
            "https://poll.fm/10648838" // CH AWARDS 2020 - Fandom de 2020

        ],

        // List of IDs of the option desired in the polls (in order)
        vote_id: [ 
            
            "PDI_answer49274973",   // CH AWARDS 2020 - Melhores Amigas
            "PDI_answer49303197"    // CH AWARDS 2020 - Fandom de 2020
        
        ],

        // Vote button
        confirm_vote: "vote-button"

    };


    // Gets the value of a give cookie
    function get_cookie_value( name ){

        // Sets cookie parameters
        var cookie_name = name + "=";

        // Decodes cookie for the current Google Form
        var cookie_decoded = (decodeURIComponent( document.cookie ))
                            .split( ";" );

        // Print cookie table for the current Google Form
        console.table( cookie_decoded );

        // Returns the amount of votes so far
        
        // Seeks inside the cookie for the current Google Form
        for( var i = 0; i < cookie_decoded.length; i++ ) {

            // Remove leading spaces
            while( cookie_decoded[i].charAt(0) == ' ' ){

                cookie_decoded[i] = cookie_decoded[i].substring(1);

            }

            // Returns the amount of votes so far (without this vote)
            if ( cookie_decoded[i].indexOf( cookie_name ) == 0 ){

                // Parses the string to int and stores it
                return parseInt( cookie_decoded[i].substring(

                    cookie_name.length, 
                    cookie_decoded[i].length

                ));

            }

        }

        // In case no cookie was created yet
        return 0;

    }

    // Sets the value being hold into the cookie
    function set_cookie_value( name, value, age_in_days ){

        // Set the number of seconds in a day
        var seconds_per_day = 60 * 60 * 24;

        // Creates a new Date object to set expire date
        var expires = new Date();

        // Setting the proper expire date
        expires.setTime( 

            expires.getTime() + ( seconds_per_day * age_in_days )
        
        );

        // Convert date to an UTC string
        var expire_date = expires.toUTCString();

        // Sets the cookie
        document.cookie = name + "=" + value + ";expires=" + expire_date;

    }


    // Creates an element with given arguments
    function create_element( type, id, style ){

        var element = document.createElement( type.toUpperCase() );

        element.id = id;
        element.style = style;

        return element;

    }

    // Creates a text to put inside an element
    function create_text( value ){

        var text_node = document.createTextNode( value );

        return text_node;

    }


    // Creates a vote panel with vote count
    function create_panel( styles, cookie_name ){

        // Declaring variables
        var vote_holder = null;
        var vote_child = null;


        // Creates the main div of the counting
        vote_holder = create_element( "div", "vote", styles.vote );


        // Creates the title holder of the counting and adds it
        vote_child = create_element( 
        
            "div", 
            "vote_title", 
            styles.vote_title 
            
        );

        vote_child.appendChild( create_text( "VOTE COUNT" ) );
        vote_holder.appendChild( vote_child );


        // Creates the number of votes holder and adds it
        vote_child = create_element( 
        
            "div", 
            "vote_count", 
            styles.vote_count 
            
        );

        vote_child.appendChild( create_text( 
            
            get_cookie_value( cookie_name ) 
            
        ) );
        
        vote_holder.appendChild( vote_child );


        // Adds the holder into the page as the first child of BODY tag
        document.body.insertBefore( 
            
            vote_holder, 
            document.body.childNodes[0] 
            
        );

    }


    // Executes cspbot code
    function cspbot(){//"cspbot_votes"

        // Creates a vote panel with vote count
        create_panel( styles, "cspbot_votes" );

        // Test the URL and everify if it is the selected poll page
        if( poll_config.url[ POLL ] == window.location.href && 
            document.querySelectorAll(".cs-post-survey-promo__share").length < 1
            ){

            // Select the answer desired with # and the ID
            document.querySelectorAll(
                
                "#" + poll_config.vote_id[ POLL ]
            
            )[0].click();

            // Sets the cookie
            set_cookie_value( 

                "cspbot_votes", 
                get_cookie_value( "cspbot_votes" ) + 1, 
                10
                
            );

            // Vote 
            document.querySelectorAll(
                
                "." + poll_config.confirm_vote
                
            )[0].click();

        // Redirect to the selected poll's page
        } else {

            window.location.href = poll_config.url[ POLL ];

        }

    }


    // Calls the code to be executed!
    cspbot();
    
})();