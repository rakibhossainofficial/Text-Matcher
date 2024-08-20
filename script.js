
const commonWordsBtn = document.getElementById('commonWordsBtn');
const commonSentencesBtn = document.getElementById('commonSentencesBtn');
const missingWordsBtn = document.getElementById('missingWordsBtn');
const generateBtn = document.getElementById('generateBtn');
const resultTextarea = document.getElementById('result');
const copyBtn = document.getElementById('copyBtn');
const clearText1Btn = document.getElementById('clearText1');
const clearText2Btn = document.getElementById('clearText2');

let activeFunction = 'commonWords';

commonWordsBtn.addEventListener('click', () => setActiveFunction('commonWords'));
commonSentencesBtn.addEventListener('click', () => setActiveFunction('commonSentences'));
missingWordsBtn.addEventListener('click', () => setActiveFunction('missingWords'));
generateBtn.addEventListener('click', generateResult);
copyBtn.addEventListener('click', copyToClipboard);
clearText1Btn.addEventListener('click', () => document.getElementById('text1').value = '');
clearText2Btn.addEventListener('click', () => document.getElementById('text2').value = '');

function setActiveFunction(functionName) {
    activeFunction = functionName;
    document.querySelector('header button.active').classList.remove('active');
    document.getElementById(`${functionName}Btn`).classList.add('active');
}

function generateResult() {
    if (activeFunction === 'commonWords') {
        highlightCommonWords();
    } else if (activeFunction === 'commonSentences') {
        highlightCommonSentences();
    } else if (activeFunction === 'missingWords') {
        highlightMissingWords();
    }
}

function highlightCommonWords() {
    const text1 = document.getElementById('text1').value.split(/\s+/);
    const text2 = document.getElementById('text2').value.split(/\s+/);
    const commonWords = text1.filter(word => text2.includes(word) && word !== '');
    displayResult(commonWords.length ? commonWords.join(', ') : 'Nothing found !!');
}

function highlightCommonSentences() {
    const text1Sentences = document.getElementById('text1').value.split('.').map(sentence => sentence.trim()).filter(sentence => sentence !== '');
    const text2Sentences = document.getElementById('text2').value.split('.').map(sentence => sentence.trim()).filter(sentence => sentence !== '');

    const commonSentences = text1Sentences.filter(sentence => text2Sentences.includes(sentence));

    displayResult(commonSentences.length ? commonSentences.join('.\n') : 'Nothing found !!');
}

function highlightMissingWords() {
    const text1 = document.getElementById('text1').value.split(/\s+/);
    const text2 = document.getElementById('text2').value.split(/\s+/);
    const missingWords = text1.filter(word => !text2.includes(word) && word !== '');
    displayResult(missingWords.length ? missingWords.join(', ') : 'Nothing found !!');
}

function displayResult(result) {
    resultTextarea.value = result;
}

function copyToClipboard() {
    const result = document.getElementById('result').value; 
    navigator.clipboard.writeText(result).then(() => {
        const popup = document.getElementById('popup');
        popup.classList.add('show');
        setTimeout(() => popup.classList.remove('show'), 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

