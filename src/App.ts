import * as express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';

import IApplicationConfiguration from './core/IApplicationConfiguration';
import ApplicationDataProvider from './providers/AppDataProvider';
import AppRoutes from './routes/AppRoutes';


export default class App {
    private static app: App;

    private expApp: Express;

    private dataProviders: ApplicationDataProvider;

    public static getInstance(): App {
        return App.app;
    }

    constructor(private config: IApplicationConfiguration) {
        this.config = config;
        this.expApp = express();
        App.app = this;
    }

    run(): void {
        this.expApp.use(session({
            resave: false,
            saveUninitialized: false,
            secret: 'typescipt',
            cookie: {maxAge: 3600000}
        }));
        this.expApp.use(bodyParser.urlencoded({extended: false}));

        this.expApp.use((req: Request, res: Response, next: NextFunction) => {
            res.contentType('application/json');
            next();
        });

        this.dataProviders = new ApplicationDataProvider();

        let appRouter = new AppRoutes();
        appRouter.mount(this.expApp);

        this.expApp.listen(this.config.port);
    }
    get providers(): ApplicationDataProvider {
        return this.dataProviders;
    }
}