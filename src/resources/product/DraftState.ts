import AvailableState from './AvailableState';
import Context from './Context';
import DeletedDraftState from './DeletedDraftState';
import State from './State';

export default class DraftState extends State {
    public publishDraft = async (
        currentState: string,
        nextState: string,
        productId: string
    ) => {
        if (currentState === 'draft' && nextState === 'available') {
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
    };
    public deleteDraft = async (
        currentState: string,
        nextState: string,
        productId: string
    ) => {
        if (currentState === 'draft' && nextState === 'deletedDraft') {
            return new Context(this).updateState(
                currentState,
                nextState,
                productId,
                new DeletedDraftState()
            );
        }
        return {
            transition: false,
            message: 'Operation not permitted.',
        };
    };
    public deleteProduct = async (currentState: string) => {
        return {
            transition: false,
            message: `Transitioning from ${currentState} to deleted is not permitted.`,
        };
    };
    public expiredProduct = async (currentState: string) => {
        return {
            transition: false,
            message: `Transitioning from ${currentState} to expired is not permitted.`,
        };
    };
    public reservedProduct = async (currentState: string) => {
        return {
            transition: false,
            message: `Transitioning from ${currentState} to reserved is not permitted.`,
        };
    };
    public saleProduct = async (currentState: string) => {
        return {
            transition: false,
            message: `Transitioning from ${currentState} to sold is not permitted.`,
        };
    };
    public returnProduct = async (currentState: string) => {
        return {
            transition: false,
            message: `Transitioning from ${currentState} to returned is not permitted.`,
        };
    };
    public renewProduct = async (currentState: string) => {
        return {
            transition: false,
            message: `Transitioning from ${currentState} to renewed is not permitted.`,
        };
    };
}
