module.exports = {
	launch: {
        //executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
		dumpio: true,
		headless: false, // Speech synth API doesn't work in headless.
        args: [
            '--disable-infobars', 
            '--no-sandbox',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--allow-file-access-from-file'
        ],
	},
	browserContext: 'default'
};