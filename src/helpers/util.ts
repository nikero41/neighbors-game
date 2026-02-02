export const shuffleArray = <T>(array: T[]): T[] => {
	for (let length = array.length - 1; length > 0; length--) {
		const elementToBeSwaped = Math.floor(Math.random() * length);

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const temp = array[length]!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		array[length] = array[elementToBeSwaped]!;
		array[elementToBeSwaped] = temp;
	}

	return array;
};

// Returns a flag emoji from a 2-letter country code
export const getEmojiForCountry = (countryCode: string) => {
	const OFFSET = 127397;
	const codeArray = Array.from(countryCode.toUpperCase());

	return String.fromCodePoint(...codeArray.map(c => c.charCodeAt(0) + OFFSET));
};
