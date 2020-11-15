// Sets the poll. The total is the number of URLs or IDs in poll_config.
var POLL = 0;


var new_header = new Headers();

new_header.append('Clear-Site-Data', '*');
new_header.get('Clear-Site-Data') // should return 'text/xml'

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

// Test the URL and everify if it is the selected poll page
if( poll_config.url[ POLL ] == window.location.href && 
    document.querySelectorAll(".cs-post-survey-promo__share").length < 1
    ){

    // Select the answer desired with # and the ID
    document.querySelectorAll(
        
        "#" + poll_config.vote_id[ POLL ]
    
    )[0].click();

    // Vote 
    document.querySelectorAll(
        
        "." + poll_config.confirm_vote
        
    )[0].click();

// Redirect to the selected poll's page
} else {

    window.location.href = poll_config.url[ POLL ];

}