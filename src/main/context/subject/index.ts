export class Subject<T> {
  subscribers: Array<(value: T) => void> = [];

  value: T;

  constructor(value: T) {
    this.value = value;
  }

  next = (value: T) => {
    this.value = value;
    this.subscribers.forEach(sub => sub(value));
  };

  //on change execute callbacks
  subscribe = (callback: (value: T) => void) => {
    this.subscribers.push(callback);
    //unsubscribe
    return () => {
      this.subscribers.splice(this.subscribers.indexOf(callback), 1);
    };
  };

  getState = (): T => this.value;
}

export const pick = <T>(object: T, keys: string[]): Partial<T> => {
  return keys.filter(key => key in object).reduce((result, key) => ({ ...result, [key]: object[key as keyof T] }), {});
};
