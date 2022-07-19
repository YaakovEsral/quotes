const form = get('quotes-form');
const quoteInput = get('quote-input');
const authorInput = get('author-input');
const submitSuccessMessage = get('submit-success');
const submitFailureMessage = get('submit-failure');

const container = get('container');
var quotesDisplay = get('quotes-display');
var videoDisplay = get('video-display');
const mainQuoteDiv = get('main-quote');
const secondaryQuoteDivs = Array.from(document.querySelectorAll('.secondary-quote'));
const allQuoteDivs = Array.from(document.querySelectorAll('.single-quote'));

const fonts = ['Barlow-Light', 'Barlow-Medium', 'Barlow-Regular', 'Barlow-ExtraLight', 'Barlow-Thin']

// const fonts = ['Barlow-Bold', 'Barlow-ExtraBold', 'Barlow-ExtraLight', 'Barlow-Light', 'Barlow-Medium', 'Barlow-Regular', 'Barlow-SemiBold', 'Barlow-Thin']