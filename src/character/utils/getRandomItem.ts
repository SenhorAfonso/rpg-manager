function getRandomItem<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export default getRandomItem;