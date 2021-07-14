import { CatColor, CatName } from './valueObjects';

export class Cat {
  private constructor(
    public id: string,
    public name: CatName,
    public color: CatColor
  ) {}

  public copyWith(modifyObject: { [P in keyof Cat]?: Cat[P] }): Cat {
    return Object.assign(Object.create(this.constructor.prototype), {
      ...this,
      ...modifyObject,
    });
  }

  static create({ id, name, color }: any): Cat {
    return new Cat(id, CatName.create(name), CatColor.create(color));
  }
  //   updateName(name: string): Cat {
  //     return new Cat(this.id, CatName.create(name), this.color);
  //   }
}
