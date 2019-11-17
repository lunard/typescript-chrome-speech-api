module.exports = {
	launch: {
		dumpio: true,
		headless: false, // Speech API seems to work also in Headless browser
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