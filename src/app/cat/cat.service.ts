import { CatFacade } from './domain/cat.facade';
import { CatName } from './domain/valueObjects';
import { StateFulService } from './stateFul.service';

export class CatService extends StateFulService {
  constructor(private facade: CatFacade) {
    super();
  }

  async getList(): Promise<void> {
    await this.dispatch(async () => {
      const cats = await this.facade.getList();
      this.setEntities(cats);
    }).catch((error) => {
      //Show error
    });
  }

  async updateName(id: string, name: string) {
    await this.dispatch(async () => {
      const currentState = this.state$.getValue();
      await this.facade.updateName(id, name);
      const newCat = currentState.entities[id].copyWith({
        name: CatName.create(name),
      });
      this.setEntity(newCat);
    }).catch((error) => {
      //Show error
    });
  }
}
