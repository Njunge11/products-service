import State from './State';
import Context from './Context';
import SoldState from './SoldState';
import AvailableState from './AvailableState';

export default class ReservedState extends State {
    public publishDraft(
        currentState: string,
        nextState: string,
        productId: string
    ) {
        if (currentState === 'reserved' && nextState === 'available') {
            return new Context(this).updateState(
                currentState,
                nextState,
                productId,
                new AvailableState()
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
    public deleteProduct() {
        return {
            transition: false,
            message: 'Delete is not permitted',
        };
    }

    public expiredProduct() {
        return {
            transition: false,
            message: 'Expire is not permitted',
        };
    }

    public reservedProduct() {
        return {
            transition: false,
            message: 'Listing already reserved',
        };
    }
    public saleProduct(
        currentState: string,
        nextState: string,
        productId: string
    ) {
        if (currentState === 'reserved' && nextState === 'sold') {
            return new Context(this).updateState(
                currentState,
                nextState,
                productId,
                new SoldState()
            );
        }
        return {
            transition: false,
            message: 'Operation not permitted.',
        };
    }
    public returnProduct() {
        return {
            transition: false,
            message: 'Listing cannot be returned when reserved',
        };
    }
}
