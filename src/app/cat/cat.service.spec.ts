import { Cat } from './domain/cat';
import { catFixture } from './fixtures/cat';
import { CatFacade, exampleCatFacade } from './domain/cat.facade';
import { mock, instance, when, reset, anyString } from 'ts-mockito';
import { CatService } from './cat.service';
import { initialState } from './stateFul.service';

const MockFacade = mock<CatFacade>();

describe('cat service', () => {
  let catService: CatService;
  let facade: CatFacade;
  beforeEach(() => {
    //facade = new exampleCatFacade(); //<We instantiate Class with '()'>
    facade = instance(MockFacade);
    catService = new CatService(facade);
  });
  afterEach(() => {
    reset(MockFacade);
  });
  describe('get list', () => {
    it('should return a cat list', async () => {
      when(MockFacade.getList()).thenResolve([Cat.create(catFixture)]);
      let currentIndex = 0;
      const expectedState: any = {
        0: initialState,
        1: { ...initialState, loading: true },
        2: {
          ...initialState,
          loading: true,
          entities: { [catFixture.id]: Cat.create(catFixture) },
        },
        3: {
          ...initialState,
          loading: false,
          entities: { [catFixture.id]: Cat.create(catFixture) },
        },
      };
      const subscription = catService.state$.subscribe((lastValue: any) => {
        expect(lastValue).toEqual(expectedState[currentIndex]);
        currentIndex++;
      });
      const newList = await catService.getList();
      subscription.unsubscribe(); //Removing eventListener
    });
    it('should set error', async () => {
      when(MockFacade.getList()).thenThrow();
      let currentIndex = 0;
      const expectedState: any = {
        0: initialState,
        1: { ...initialState, loading: true },
        2: {
          ...initialState,
          loading: true,
          error: true,
        },
        3: {
          ...initialState,
          loading: false,
          error: true,
        },
      };
      const subscription = catService.state$.subscribe((lastValue: any) => {
        expect(lastValue).toEqual(expectedState[currentIndex]);
        currentIndex++;
      });
      const newList = await catService.getList();
      subscription.unsubscribe();
    });
  });
  describe('update cat', () => {
    it('should update a cat', async () => {
      when(MockFacade.updateName(anyString(), anyString())).thenResolve();
      let currentIndex = 0;
      catService.state$.next({
        ...initialState,
        entities: {
          [catFixture.id]: Cat.create(catFixture),
        },
      });
      const expectedState: any = {
        0: {
          ...initialState,
          entities: {
            [catFixture.id]: Cat.create(catFixture),
          },
        },
        1: {
          ...initialState,
          loading: true,
          entities: {
            [catFixture.id]: Cat.create(catFixture),
          },
        },
        2: {
          ...initialState,
          loading: true,
          entities: {
            [catFixture.id]: Cat.create({ ...catFixture, name: 'Garfield' }),
          },
        },
        3: {
          ...initialState,
          loading: false,
          entities: {
            [catFixture.id]: Cat.create({ ...catFixture, name: 'Garfield' }),
          },
        },
      };
      const subscription = catService.state$.subscribe((lastValue: any) => {
        expect(lastValue).toEqual(expectedState[currentIndex]);
        currentIndex++;
      });
      const newList = await catService.updateName(catFixture.id, 'Garfield');
      subscription.unsubscribe();
    });
  });
});
