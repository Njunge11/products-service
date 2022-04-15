import Categories from './Categories';
import Products from './Products';

export const rootValue = {
    categories: () => {
        return new Categories();
    },
    products: () => {
        return new Products();
    },
};
