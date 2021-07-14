//How to define the 'contract' (Interface or abstract class)
import { Cat } from './cat';
import { catFixture } from '../fixtures/cat';

export abstract class CatFacade {
  abstract getList(): Promise<Cat[]>;
  abstract updateName(id: string, name: string): Promise<void>;
}

export class exampleCatFacade implements CatFacade {
  async getList(): Promise<Cat[]> {
    return await [Cat.create(catFixture)]; //HTTP or MongoDB query as other examples
  }
  async updateName(id: string, name: string): Promise<void> {
    return Promise.resolve();
  }
}
