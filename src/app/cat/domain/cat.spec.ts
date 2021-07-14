import { Cat } from './cat';
import { catFixture } from '../fixtures/cat';

describe('cat', () => {
  it('should be created', () => {
    const newCat = Cat.create(catFixture);
    expect(newCat).toBeInstanceOf(Cat);
  });
  it('name cannot start with X', () => {
    expect(() => Cat.create({ ...catFixture, name: 'xavier' })).toThrow(); //Within a lambda function
    expect(() => Cat.create({ ...catFixture, name: 'Xavier' })).toThrow();
  });
  it('color cannot be blue or green', () => {
    expect(() => Cat.create({ ...catFixture, color: 'blue' })).toThrow();
    expect(() => Cat.create({ ...catFixture, color: 'green' })).toThrow();
  });
});
