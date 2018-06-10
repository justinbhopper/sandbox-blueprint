
import words from './word-list'

export function randomWords(wordCount: number): string[] {
	const result: string[] = [];
	for (let i = 0; i < wordCount; ++i) {
		result.push(words[Math.floor(Math.random() * words.length)]);
	}
	return result;
}