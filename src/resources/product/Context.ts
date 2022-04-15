import State from './State';
import Crud from '../../utils/crud';
export default class Context {
    private state: State | undefined;
    private crud: Crud;
    constructor(state: State) {
        this.transitionTo(state);
        this.crud = new Crud();
    }

    public transitionTo(state: State): void {
        console.log(
            `Context: Transition to ${(<State>state).constructor.name}.`
        );
        this.state = state;
        this.state.setContext(this);
    }

    public updateState = async (
        currentState: string,
        nextState: string,
        productId: string,
        concreteClass: any
    ) => {
        const result = await this.crud.updateProductStateById(
            nextState,
            productId
        );
        if (result.success) {
            this.transitionTo(concreteClass);
            return {
                transition: true,
                message: `Transitioned from ${currentState} to ${nextState}`,
            };
        } else {
            return { transition: false, message: result.message };
        }
    };

    public publishDraft(
        currentState: string,
        nextState: string,
        productId: string
    ) {
        return this.state?.publishDraft(currentState, nextState, productId);
    }

    public deleteDraft(
        currentState: string,
        nextState: string,
        productId: string
    ) {
        return this.state?.deleteDraft(currentState, nextState, productId);
    }

    public deleteProduct(
        currentState: string,
        nextState: string,
        productId: string
    ) {
        return this.state?.deleteProduct(currentState, nextState, productId);
    }

    public expiredProduct(
        currentState: string,
        nextState: string,
        productId: string
    ) {
        return this.state?.expiredProduct(currentState, nextState, productId);
    }

    public saleProduct(
        currentState: string,
        nextState: string,
        productId: string
    ) {
        return this.state?.saleProduct(currentState, nextState, productId);
    }

    public reservedProduct(
        currentState: string,
        nextState: string,
        productId: string
    ) {
        return this.state?.reservedProduct(currentState, nextState, productId);
    }

    public returnProduct(
        currentState: string,
        nextState: string,
        productId: string
    ) {
        return this.state?.returnProduct(currentState, nextState, productId);
    }
}
