import axios from 'axios';
const errors = document.querySelector('.errors');
const resultWord = document.querySelector('.result-word');
const loading = document.querySelector('.loading');
const synonyms = document.querySelector('.Synonyms'); //deaths
const definition = document.querySelector('.Definition'); //cases
const results = document.querySelector('.result-container');
const didYouMean = document.querySelector('.did-you-mean');
const noMatch = document.querySelector('.no-match');
results.style.display = 'none';
loading.style.display = 'none';
noMatch.style.display = 'none';
errors.textContent = '';
let apiKey = '';//secret api key goes here
// grab the form
const form = document.querySelector('.form-data');
// grab the country name
const word = document.querySelector('.word');

// declare a method to search by country name
const searchForWord = async (word) => {
	loading.style.display = 'block';
	errors.textContent = '';
	results.style.display = 'none';
	loading.style.display = 'none';
	noMatch.style.display = 'none';
	try {
		const response = await axios.get(
			`https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?${apiKey}`
		);
		loading.style.display = 'none';

		if (typeof response.data[0] === 'object') {
			definition.textContent = response.data[0].def[0].sseq[0][0][1].dt[0][1];
			let synArray = '';
			response.data[0].meta.syns.forEach((syn) => {
				syn.forEach((synonym) => {
					synArray = synArray + synonym + ', ';
				});
			});
			synArray = synArray.substring(0, synArray.length - 2);
			synonyms.innerHTML = synArray;
			resultWord.textContent = word;
			results.style.display = 'block';
		} else if (response.data.length > 0) {
			didYouMean.textContent = ' ' + response.data[0];
			noMatch.style.display = 'block';
		}
	} catch (error) {
		loading.style.display = 'none';
		results.style.display = 'none';
		errors.textContent =
			'Sorry! we have no data for the word you have searched';
	}
};

// declare a function to handle form submission
const handleSubmit = async (e) => {
	e.preventDefault();
	searchForWord(word.value);
};

form.addEventListener('submit', (e) => handleSubmit(e));
