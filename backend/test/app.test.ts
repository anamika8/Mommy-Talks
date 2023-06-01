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

void tap.test("List all users from /dbTest", async () => {
    const response = await app.inject({
        method: "GET",
        url: "/dbTest",
    });

    response.statusCode.should.equal(200);
});
//User routes testing
void tap.test("GET /users should return all users", async () => {
    const response = await app.inject({
        method: "GET",
        url: "/users",
    });

    response.statusCode.should.equal(200);

    const users = JSON.parse(response.body);
    Array.isArray(users).should.equal(true);
});

void tap.test("POST /users should create a new user", async () => {
    const user = {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        password: "password",
    };

    const response = await app.inject({
        method: "POST",
        url: "/users",
        payload: user,
    });

    response.statusCode.should.equal(200);

    const newUser = JSON.parse(response.body);
    newUser.first_name.should.equal(user.first_name);
    newUser.last_name.should.equal(user.last_name);
    newUser.email.should.equal(user.email);
});

void tap.test("PUT /users should update a user", async () => {
    // Assuming there is a user with ID 1
    const userId = 1;
    const updatedUser = {
        id: userId,
        first_name: "Updated",
        last_name: "User",
    };

    const response = await app.inject({
        method: "PUT",
        url: "/users",
        payload: updatedUser,
    });

    response.statusCode.should.equal(200);

    const user = JSON.parse(response.body);
    user.id.should.equal(userId);
    user.first_name.should.equal(updatedUser.first_name);
    user.last_name.should.equal(updatedUser.last_name);
});

void tap.test("GET /users with ID should return a specific user", async () => {
    // Assuming there is a user with ID 1
    const userId = 1;

    const response = await app.inject({
        method: "GET",
        url: `/users?id=${userId}`,
    });

    response.statusCode.should.equal(200);

    const user = JSON.parse(response.body);
    console.log(user);
    const foundUser = user.find((u) => u.id === userId);
    foundUser.should.exist;
    foundUser.id.should.equal(userId);
});