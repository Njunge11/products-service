import 'dotenv/config';
import 'regenerator-runtime/runtime';
import CategoryRouter from '../category.router';

const router = new CategoryRouter().Router;

describe('category router', () => {
    test('has get route', () => {
        const routes = [{ path: '/categories', method: 'get' }];
        routes.forEach((route) => {
            const match = router.stack.find(
                (s) =>
                    s.route.path === route.path && s.route.methods[route.method]
            );
            expect(match).toBeTruthy();
        });
    });
});
