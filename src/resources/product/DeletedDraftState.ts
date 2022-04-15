import State from './State';

export default class DeletedDraftState extends State {
    // private context;
    public publishDraft() {
        return {
            transition: false,
            message: 'Nothing to do',
        };
    }
    public deleteDraft() {
        return {
            transition: false,
            message: 'Nothing to do',
        };
    }
    public deleteProduct() {
        return {
            transition: false,
            message: 'Nothing to do',
        };
    }
    public saleProduct() {
        return {
            transition: false,
            message: 'Nothing to do',
        };
    }
    public returnProduct() {
        return {
            transition: false,
            message: 'Nothing to do',
        };
    }
    public renewProduct() {
        return {
            transition: false,
            message: 'Nothing to do',
        };
    }
    public expiredProduct() {
        return {
            transition: false,
            message: 'Nothing to do',
        };
    }
    public reservedProduct() {
        return {
            transition: false,
            message: 'Nothing to do',
        };
    }
}
