const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// button function
function toggleButton() {
	button.disabled = !button.disabled;
}

// change joke into voice
function tellMe(joke) {
	VoiceRSS.speech({
		key: 'dee37125910141a69aab0ac18e3b64ea',
		src: joke,
		hl: 'en-us',
		r: 0,
		c: 'mp3',
		f: '44khz_16bit_stereo',
		ssml: false,
	});
}

// get jokes from api
async function getJokes() {
	let joke = '';
	const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=religious';
	try {
		const res = await fetch(apiUrl);
		const data = await res.json();
		data.setup ? joke = `${data.setup} ... ${data.delivery}` : joke = data.joke;
		tellMe(joke);
		toggleButton();
	} catch (err) {
		console.log('whoops', err);
	}
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);