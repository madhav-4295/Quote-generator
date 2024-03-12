// Get quotes from the API
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuote = []

//show loading

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;

}
//hide loading

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
async function getQuotes(){
    loading();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
     try {
        const data = await fetch(apiURL);

        // turning respnse into a JSON objet.
        apiQuote = await data.json();
        
        // Selecting new quote 
        showNewQuote()

     }catch(error){
        // Catch error here
        alert(error);
     }
}

// Show new Quote
function showNewQuote(){
    loading();
    // pick random quote from apiQuote array
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];

    // check for null values for author field
    if (!quote.author){
        quoteAuthor.textContent  = "Unknown";
    }else{
        quoteAuthor.textContent = quote.author;
    }

    // check quote length to determine styling

    if(quote.text.length> 50 ){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    //set Quite and hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Tweet COde 

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    
    window.open(twitterUrl, '_blank');
}

// Event Listeners for buttons

newQuoteBtn.addEventListener('click', showNewQuote);

twitterBtn.addEventListener('click', tweetQuote);
// on Load
getQuotes();