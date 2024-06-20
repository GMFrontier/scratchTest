import { reaction, observable, runInAction } from 'mobx';

export function postEvent(): any {
  return Math.random();
}

export function reactionEveryTime(dataFunction: any, effect: any) {
  let trigger = observable.box(0);

  const reactionDisposer = reaction(
    () => [dataFunction()],
    () => {
      runInAction(() => {
        trigger.set(trigger.get() + 1); //trigger que posibilita el reaction en el posteo del mismo value anterior de dataFunction
      });
      effect();
    },
    { fireImmediately: true }
  );

  return reactionDisposer;
}
