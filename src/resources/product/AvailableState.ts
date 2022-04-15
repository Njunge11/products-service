import Context from './Context';
import DeletedState from './DeletedState';
import ExpiredState from './ExpiredState';
import ReservedState from './ReservedState';
import State from './State';

export default class AvailableState extends State {
    public publishDraft() {
        return {
            transition: false,
            message: 'Listing already published',
        };
    }
    public deleteDraft() {
        return {
            transition: false,
            message: 'Listing is not a draft',
        };
    }
    public deleteProduct = async (
        currentState: string,
        nextState: string,
        productId: string
    ) => {
        if (currentState === 'available' && nextState === 'deleted') {
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
    };

    public expiredProduct(
        currentState: string,
        nextState: string,
        productId: string
    ) {
        if (currentState === 'available' && nextState === 'expired') {
            return new Context(this).updateState(
                currentState,
                nextState,
                productId,
                new ExpiredState()
            );
        }
        return {
            transition: false,
            message: 'Operation not permitted.',
        };
    }

    public reservedProduct = async (
        currentState: string,
        nextState: string,
        productId: string
    ) => {
        if (currentState === 'available' && nextState === 'reserved') {
            return new Context(this).updateState(
                currentState,
                nextState,
                productId,
                new ReservedState()
            );
        }
        return {
            transition: false,
            message: 'Operation not permitted.',
        };
    };
    public saleProduct(currentState: string) {
        return {
            transition: false,
            message: `Transitioning from ${currentState} to sold is not permitted.`,
        };
    }
    public returnProduct(currentState: string) {
        return {
            transition: false,
            message: `Transitioning from ${currentState} to returned is not permitted.`,
        };
    }
}
