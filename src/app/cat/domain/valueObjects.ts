export class CatName {
  private constructor(private value: string) {}

  static create(value: string): CatName {
    //Static only for entities
    if (!CatName.validate(value)) {
      throw new Error('Invalid Name!');
    }
    return new CatName(value);
  }

  static validate(value: string): boolean {
    return value[0].toUpperCase() !== 'X';
  }
}

export class CatColor {
  private constructor(private value: string) {}

  static colors = ['orange', 'black', 'white', 'grey'];

  static create(value: string): CatColor {
    if (!CatColor.validate(value)) {
      throw new Error('Invalid Color!');
    }
    return new CatColor(value);
  }

  static validate(value: string): boolean {
    return CatColor.colors.includes(value);
  }
}
