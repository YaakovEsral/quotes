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
const videoInterval = 900000; // 15 min
const videoArray = ['cheap_quality.mp4', 'confusing.mp4', 'expensive.mp4', 'just_like_everyone_else.mp4', 'rude_on_the_phone.mp4', 'slow_service.mp4', 'useless.mp4', 'waste_of_time.mp4', 'way_too_expensive.mp4'];
let videoIndex = 0;

const quotesListContainer = get('quotes-list-container');
// const deleteButtons = Array.from(document.querySelectorAll('.quote-li-delete'));

const fonts = ['Barlow-Light', 'Barlow-Medium', 'Barlow-Regular', 'Barlow-ExtraLight', 'Barlow-Thin']

// const fonts = ['Barlow-Bold', 'Barlow-ExtraBold', 'Barlow-ExtraLight', 'Barlow-Light', 'Barlow-Medium', 'Barlow-Regular', 'Barlow-SemiBold', 'Barlow-Thin']