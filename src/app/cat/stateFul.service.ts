import { Cat } from './domain/cat';
import { BehaviorSubject } from 'rxjs';

export interface state {
  error: boolean;
  loading: boolean;
  entities: {
    [id: string]: Cat;
  };
}

export const initialState: state = {
  error: false,
  loading: false,
  entities: {},
};

export class StateFulService {
  state$ = new BehaviorSubject(initialState); //Subject -> Notification when change; Behaviour --> Last value + Notification when change; Replay --> List value + Notification when change

  setLoading(value: boolean) {
    const currentState = this.state$.getValue();
    this.state$.next({ ...currentState, loading: value });
  }

  setError() {
    const currentState = this.state$.getValue();
    this.state$.next({ ...currentState, error: true });
  }

  setEntities(values: Cat[]) {
    const currentState = this.state$.getValue();
    this.state$.next({
      ...currentState,
      entities: values.reduce((previousValue, currentValue) => {
        return { ...previousValue, [currentValue.id]: currentValue };
      }, {}),
    });
  }

  setEntity(value: Cat) {
    const currentState = this.state$.getValue();
    this.state$.next({
      ...currentState,
      entities: {
        ...currentState.entities,
        [value.id]: value,
      },
    });
  }

  async dispatch(fun: () => any): Promise<void> {
    this.setLoading(true);
    try {
      await fun();
      this.setLoading(false);
    } catch (error) {
      this.setError();
      this.setLoading(false);
      throw error;
    }
  }
}
