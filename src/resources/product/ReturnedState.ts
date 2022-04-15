import State from './State';
import Context from './Context';
import DeletedState from './DeletedState';
import DraftState from './DraftState';

export default class ReturnedState extends State {
    public publishDraft(
        currentState: string,
        nextState: string,
        productId: string
    ) {
        if (currentState === 'returned' && nextState === 'draft') {
            return new Context(this).updateState(
                currentState,
                nextState,
                productId,
                new DraftState()
            );
        }
        return {
            transition: false,
            message: 'Operation not permitted.',
        };
    }
    public deleteDraft() {
        return {
            transition: false,
            message: 'Listing is not a draft',
        };
    }
    public deleteProduct(
        currentState: string,
        nextState: string,
        productId: string
    ) {
        if (currentState === 'returned' && nextState === 'deleted') {
            return new Context(this).updateState(
                currentState,
                nextState,
                productId,
                new DeletedState()
            );
        }
        return {
            transition: false,
            message: 'Operation not permitted.',
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
    returnProduct(currentState: string, nextState: string, productId: string) {
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
