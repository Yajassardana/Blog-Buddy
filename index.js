import axios from 'axios';
const errors = document.querySelector('.errors');
const loading = document.querySelector('.loading');
const synonyms = document.querySelector('.Synonyms'); //deaths
const definition = document.querySelector('.Definition'); //cases
const results = document.querySelector('.result-container');
results.style.display = 'none';
loading.style.display = 'none';
errors.textContent = '';
// grab the form
const form = document.querySelector('.form-data');
// grab the country name
const word = document.querySelector('.word');

// declare a method to search by country name
const searchForWord = async (word) => {
	loading.style.display = 'block';
	errors.textContent = '';
	try {
		const response = await axios.get(
			`https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=6bc8b42d-c598-4c95-add4-07268328955f`
		);
		loading.style.display = 'none';
		definition.textContent = response.data[0].def[0].sseq[0][0][1].dt[0][1];
		// recovered.textContent = response.data.recovered.value;
		let synArray;
		response.data[0].meta.syns[0].forEach((synonym) => {
			synArray = synArray + synonym + ',' + ' <br> ';
		});
		synonyms.innerHTML = synArray;
		results.style.display = 'block';
	} catch (error) {
		loading.style.display = 'none';
		results.style.display = 'none';
		errors.textContent = 'We have no data for the country you have requested.';
	}
};

// declare a function to handle form submission
const handleSubmit = async (e) => {
	e.preventDefault();
	searchForWord(word.value);
	console.log(word.value);
};

form.addEventListener('submit', (e) => handleSubmit(e));