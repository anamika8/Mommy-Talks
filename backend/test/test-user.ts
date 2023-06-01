// @ts-nocheck
import * as dotenv from "dotenv";

dotenv.config();
import "chai/register-should.js"; // Using Should style
// @ts-ignore
import tap from "tap";
import { MikroORM, ISeedManager } from "@mikro-orm/core";
import { faker } from "@faker-js/faker";
import app from "../src/app.js";
import { UserRole } from "../src/db/entities/User.js";
import config from "../src/db/mikro-orm.config.js";
import { DatabaseSeeder } from "../src/db/seeders/DatabaseSeeder.js";

let orm: MikroORM;

tap.before(async () => {
    app.log.warn("Initializing database...");
    orm = await MikroORM.init(config);
    const seeder: ISeedManager = orm.getSeeder();
    app.log.warn("Refreshing database schema...");
    await orm.getSchemaGenerator().refreshDatabase();
    app.log.warn("Database refreshed, seeding...");
    await seeder.seed(DatabaseSeeder);
    app.log.warn("Finished seeding.");
});

tap.teardown(async () => {
    await orm.close();
    await app.close();
});

void tap.test("List all users from /dbvoid tap.test", async () => {
    const response = await app.inject({
        method: "GET",
        url: "/dbTest",
    });

    response.statusCode.should.equal(200);
});