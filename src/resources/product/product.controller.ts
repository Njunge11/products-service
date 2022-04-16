import express from 'express';
import Sequelize from 'sequelize';
import Product from '../../../models/product';
import ProductImage from '../../../models/productimage';
import Database from '../../utils/db';
import AvailableState from './AvailableState';
import Context from './Context';
import DeletedDraftState from './DeletedDraftState';
import DeletedState from './DeletedState';
import DraftState from './DraftState';
import ExpiredState from './ExpiredState';
import ReservedState from './ReservedState';
import ReturnedState from './ReturnedState';
import SoldState from './SoldState';
import State from './State';

export default class ProductController {
    private sequelize;
    private products;
    private productImages;
    constructor() {
        this.sequelize = new Database().connect();
        this.products = Product(this.sequelize, Sequelize.DataTypes);
        this.productImages = ProductImage(this.sequelize, Sequelize.DataTypes);
    }

    public fetchProducts = async (state: any, page: number, limit: number) => {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = await this.products.findAll({
            include: { model: this.productImages },
            where: { productStatus: state },
            offset: page,
            limit,
        });
        const count = await this.products.count();
        // return result;
        return {
            data: result,
            totalCount: count,
            ...(endIndex < count && {
                next: { page: page + 1, limit },
            }),
            ...(startIndex > 0 && { previous: { page: page - 1, limit } }),
        };
    };

    public getProducts = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response | void> => {
        try {
            const state = req.query.state;
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);

            if (!state) {
                return res.status(400).send({
                    message: `state not provided. Available states: draft, deletedDraft, available, deleted, expired, reserved, sold, returned `,
                });
            }

            // add pagination

            const products = await this.fetchProducts(state, page, limit);
            if (products.data.length === 0) {
                return res.status(400).send({ message: 'Data not found' });
            }
            res.status(200).send(products);
        } catch (error) {
            console.error(error);
            res.status(500).end();
        }
    };

    public getConcreteStateClass(state: string): State {
        let concreteClass: State = new DraftState();
        switch (state) {
            case 'draft':
                concreteClass = new DraftState();
                break;
            case 'deletedDraft':
                concreteClass = new DeletedDraftState();
                break;
            case 'deleted':
                concreteClass = new DeletedState();
                break;
            case 'available':
                concreteClass = new AvailableState();
                break;

            case 'expired':
                concreteClass = new ExpiredState();
                break;
            case 'reserved':
                concreteClass = new ReservedState();
                break;
            case 'sold':
                concreteClass = new SoldState();
                break;
            case 'returned':
                concreteClass = new ReturnedState();
                break;
        }

        return concreteClass;
    }

    private getMessage(result: any, currentState: string, nextState: string) {
        let response;
        for (let i = 0; i < result.length; i++) {
            if (result[i].transition) {
                console.log(result[i].transition);
                response = {
                    success: true,
                    message: `Updated product from ${currentState} to ${nextState} `,
                };
                break;
            } else {
                response = {
                    success: false,
                    message: `Cannot transition from ${currentState} to ${nextState} `,
                };
                continue;
            }
        }
        return response;
    }

    private executeStateTransitions = async (
        currentState: string,
        nextState: string,
        productId: string
    ) => {
        const context = new Context(this.getConcreteStateClass(currentState));
        return await Promise.all([
            context.publishDraft(currentState, nextState, productId),
            context.deleteDraft(currentState, nextState, productId),
            context.saleProduct(currentState, nextState, productId),
            context.deleteProduct(currentState, nextState, productId),
            context.expiredProduct(currentState, nextState, productId),
            context.returnProduct(currentState, nextState, productId),
            context.reservedProduct(currentState, nextState, productId),
        ]);
    };

    public updateProductStateById = async (
        req: express.Request,
        res: express.Response
    ) => {
        try {
            const currentState = req.currentState;
            const nextState = req.nextState;
            const productId = req.params.id;

            const result = await this.executeStateTransitions(
                currentState,
                nextState,
                productId
            );
            console.log('the feedback from various states', result);
            const response = this.getMessage(result, currentState, nextState);
            if (response?.success) {
                return res.status(200).send({
                    message: response?.message,
                });
            }
            return res.status(400).send({
                message: response?.message,
            });
        } catch (error) {
            console.error(error);
            res.status(500).end();
        }
    };
}
