import State from './State';
import Context from './Context';
import ReturnedState from './ReturnedState';

export default class SoldState extends State {
    public publishDraft() {
        return {
            transition: false,
            message: 'Listing already sold',
        };
    }
    public deleteDraft() {
        return {
            transition: false,
            message: 'Listing already sold',
        };
    }
    public deleteProduct() {
        return {
            transition: false,
            message: 'Listing already sold',
        };
    }
    public expiredProduct() {
        return {
            transition: false,
            message: 'Listing already sold',
        };
    }
    public saleProduct() {
        return {
            transition: false,
            message: 'Listing already sold',
        };
    }
    public reservedProduct() {
        return {
            transition: false,
            message: 'Listing already sold',
        };
    }
    public returnProduct(
        currentState: string,
        nextState: string,
        productId: string
    ) {
        if (currentState === 'sold' && nextState === 'returned') {
            return new Context(this).updateState(
                currentState,
                nextState,
                productId,
                new ReturnedState()
            );
        }
        return {
            transition: false,
            message: 'Operation not permitted.',
        };
    }
}
