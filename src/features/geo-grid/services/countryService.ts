import dataJson from '../data/country_weight.json'

export interface Country {
  country: string;
  code: string;
  weight: number;
}

const getRandomCountries = (data: Country[], amount: number = 9): Country[] => {
  const dataCopy = [...data];
  const randomData: Country[] = [];

  for (let i = 0; i < amount; i++) {
    if (dataCopy.length === 0) break;
    const index = Math.floor(Math.random() * dataCopy.length);
    randomData.push(dataCopy[index]);
    dataCopy.splice(index, 1);
  }
  return randomData;
};

export const getGameData = (difficultyWeights: number[]): Country[] => {
    const allCountries = dataJson as Country[];
    
    const filteredCountries = allCountries.filter(info => 
      difficultyWeights.includes(info.weight)
    );

    return getRandomCountries(filteredCountries);
};
