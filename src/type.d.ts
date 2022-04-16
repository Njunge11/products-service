declare namespace Express {
    export interface Request {
        user?: typeof Model;
        currentState: string;
        nextState: string;
    }
}
