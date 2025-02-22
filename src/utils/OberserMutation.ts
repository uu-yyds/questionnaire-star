// 观察者模式
interface Observer {
  update(data: any): void;
}

export class ObserverMutation {
  private observers: Observer[] = [];

  constructor() {
    this.observers = [];
  }

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(data: any) {
    this.observers.forEach(observer => observer.update(data));
  }
}
