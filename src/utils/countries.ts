// utils/countries.ts
import { countries } from 'countries-list';

const getEmojiFlag = (countryCode: string) => {
  return countryCode
    .toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join('');
};

export const countryList = Object.entries(countries).map(([code, country]) => ({
  name: country.name,
  code,
  flag: getEmojiFlag(code), 
})).sort((a, b) => a.name.localeCompare(b.name));
