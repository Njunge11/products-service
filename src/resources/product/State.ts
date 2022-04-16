import Context from './Context';
/**
 * This is the state interface:
 * Declares methods associated with the different states in the system.
 */
export default abstract class State {
    private context: Context | undefined;
    public setContext(context: Context) {
        this.context = context;
    }

    public abstract publishDraft(
        currentState?: string,
        nextState?: string,
        productId?: string
    ): void;
    public abstract deleteDraft(
        currentState?: string,
        nextState?: string,
        productId?: string
    ): void;
    public abstract deleteProduct(
        currentState?: string,
        nextState?: string,
        productId?: string
    ): void;
    public abstract expiredProduct(
        currentState?: string,
        nextState?: string,
        productId?: string
    ): void;
    public abstract reservedProduct(
        currentState?: string,
        nextState?: string,
        productId?: string
    ): void;
    public abstract saleProduct(
        currentState?: string,
        nextState?: string,
        productId?: string
    ): void;
    public abstract returnProduct(
        currentState?: string,
        nextState?: string,
        productId?: string
    ): void;
    // public abstract renewProduct(
    //     currentState: string,
    //     nextState: string,
    //     productId: string
    // ): void;
}
