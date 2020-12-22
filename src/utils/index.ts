export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    let random = Math.random() * 16 | 0;
    let value = char === "x" ? random : (random % 4 + 8);
    return value.toString(16);
  });
}

export function updateArrayState<T>(state: T[], items: T[], key: string | number): T[] {
  const newState = JSON.parse(JSON.stringify(state)) as T[]; // @TODO: deepClone
  items.forEach((item: any) => {
    const index = newState.findIndex((i: any) => i[key] === item[key]);
    if (index === -1) throw new Error('Not found');
    newState[index] = { ...newState[index], ...item };
  });
  return newState;
}
