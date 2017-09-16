let fs = require('fs-promise');

function askQuestion() {
    process.stdout.write('Input city name: ');
}

function getNetCityInfo(cityName) {
	return Promise.resolve({
		city: cityName,
		comment: 'Data from network'
	});
}

function getCityInfo(cityName) {
	let fileName = `${cityName}.txt`;
	return fs.exists(fileName)
		.then(exists => {
			return exists
				? fs.readFile(fileName)
					.then(x => JSON.parse(x.toString()))
				: getNetCityInfo(cityName);
		});
}

function processInput(buffer) {
    let cityName = buffer.toString().trim();
    console.log(`Entered city: '${cityName}'`);
    if (cityName) {
		getCityInfo(cityName)
			.then(info => console.log(info))
			.then(askQuestion);
    } else {
        // exit
        console.log(`Exit.`);
        process.stdin.end();  // stop listening input
    }
}

process.stdin.addListener('data', processInput);

askQuestion();
