import { RememberData } from "./models";
import { getWrods } from "./words";

const DATA_KEY = "WORDS_DATA";

export function getData(): RememberData[] {
  const json = localStorage.getItem(DATA_KEY);

  if (!json) {
    const words = getWrods();
    const data: RememberData[] = words.map((word) => ({
      word,
      status: 0,
    }));

    saveData(data);

    return data;
  }

  return JSON.parse(json) as RememberData[];
}

export function getKnownData(minStatus: number) {
  const data = getData();

  return data.filter((x) => x.status >= minStatus);
}

export function getSortedKnownData(minStatus: number) {
  return getKnownData(minStatus).sort((x, y) => x.status - y.status);
}

export function getUnknownData(maxStatus: number) {
  const data = getData();

  return data.filter((x) => x.status <= maxStatus);
}

export function getRandomUnknownData(maxStatus: number) {
  const data = getUnknownData(maxStatus);

  if (data.length === 0) return undefined;

  const index = Math.floor(Math.random() * data.length);

  return data[index];
}

export function saveData(list: RememberData[]) {
  const json = JSON.stringify(list);

  localStorage.setItem(DATA_KEY, json);
}

export function incrementKnowledge(word: string) {
  return changeData(word, (rememberData) => rememberData.status++);
}

export function decrementKnowledge(word: string) {
  return changeData(word, (rememberData) => rememberData.status--);
}

export type ChangeDataFunction = (rememberData: RememberData) => void;

export function changeData(word: string, changeFn: ChangeDataFunction) {
  const data = getData();

  let rememberData = data.find((x) => x.word === word);

  if (!rememberData) {
    rememberData = { word, status: 0 };

    data.push(rememberData);
  }

  changeFn(rememberData);

  saveData(data);

  return data;
}
