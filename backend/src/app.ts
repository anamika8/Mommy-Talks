import Fastify from "fastify";
import config from "./db/mikro-orm.config.js";
import {FastifyMikroOrmPlugin} from "./plugins/mikro.js";
import MommyTalkRoutes from "./routes.js";

const app = Fastify();

await app.register(FastifyMikroOrmPlugin, config);

await app.register(MommyTalkRoutes);

export default app;