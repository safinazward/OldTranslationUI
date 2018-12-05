const TranslationService = {
	addTranslation: (locale, translation) => {
		return fetch('http://' + window.location.hostname + ':5002/api/Translation/',
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ locale: locale, key: translation.key, text: translation.text })
			})
			.then(response => {
				return response.json();
			})
	},
	updateTranslation: (locale, translationKey, translationText) => {
		let urlEncodedKey = encodeURIComponent(translationKey).replace(/\./g, '%2E');
		return fetch('http://' + window.location.hostname + ':5002/api/Translation/' + locale + '/' + urlEncodedKey,
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'PUT',
				body: JSON.stringify({ text: translationText })
			})
			.then(response => {
				return response.json();
			})
	},
	removeTranslation: (locale, translationKey) => {
		let urlEncodedKey = encodeURIComponent(translationKey).replace(/\./g, '%2E');
		return fetch('http://' + window.location.hostname + ':5002/api/Translation/' + locale + '/' + urlEncodedKey, { method: 'DELETE' });
	},
	addCustomTranslation: (locale, tanslationKey, translationText) => {
		return fetch('http://' + window.location.hostname + ':5002/api/CustomTranslation/',
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ locale: locale, key: tanslationKey, text: translationText })
			})
			.then(response => {
				return response.json();
			})
	},
	updateCustomTranslation: (locale, tanslationKey, translationText) => {
		let urlEncodedKey = encodeURIComponent(tanslationKey).replace(/\./g, '%2E');
		return fetch('http://' + window.location.hostname + ':5002/api/CustomTranslation/' + locale + '/' + urlEncodedKey,
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'PUT',
				body: JSON.stringify({ text: translationText })
			})
			.then(response => {
				return response.json();
			})
	},
	removeCustomTranslation: (locale, translationKey) => {
		let urlEncodedKey = encodeURIComponent(translationKey).replace(/\./g, '%2E');
		return fetch('http://' + window.location.hostname + ':5002/api/CustomTranslation/' + locale + '/' + urlEncodedKey, { method: 'DELETE' })
	}
}

export default TranslationService;