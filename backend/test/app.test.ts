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

void tap.test("PUT /users should update user last login datetime", async () => {
    // Assuming there is a user with ID 1
    const userId = 1;
    const lastLogin = "2023-06-06T23:40:32.874Z";
    const updatedUser = {
        id: userId,
        last_login: lastLogin
    };
    const response = await app.inject({
        method: "PUT",
        url: "/users",
        payload: updatedUser,
    });

    response.statusCode.should.equal(200);

    const user = JSON.parse(response.body);
    user.id.should.equal(userId);
    should.not.equal(user.last_login, null);
    user.last_login.should.equal(lastLogin);
});

void tap.test("SEARCH /users should search by id", async () => {
    const idSearch = {"id": 1};
    const response = await app.inject({
        method: "SEARCH",
        url: "/users",
        payload: idSearch
    });

    response.statusCode.should.equal(200);
    const user = JSON.parse(response.body);
    Array.isArray(user).should.equal(false);
    should.exist(user);
    should.not.equal(user, null);
    user.id.should.equal(1);
    should.exist(user.uuid);
    should.exist(user.email);
});

void tap.test("SEARCH /users should search by uuid", async () => {
    const idSearch = {"uuid": "Qci0x8jTlAapxa2hZusgrGr9IlC3"};
    const response = await app.inject({
        method: "SEARCH",
        url: "/users",
        payload: idSearch
    });

    response.statusCode.should.equal(200);
    const user = JSON.parse(response.body);
    Array.isArray(user).should.equal(false);
    should.exist(user);
    should.not.equal(user, null);
    user.id.should.equal(1);
    should.exist(user.uuid);
    should.exist(user.email);
});

void tap.test("SEARCH /users should search by both id & uuid", async () => {
    const idSearch = {
        "uuid": "Qci0x8jTlAapxa2hZusgrGr9IlC3",
        "id": 1
    };
    const response = await app.inject({
        method: "SEARCH",
        url: "/users",
        payload: idSearch
    });

    response.statusCode.should.equal(200);
    const user = JSON.parse(response.body);
    Array.isArray(user).should.equal(false);
    should.exist(user);
    should.not.equal(user, null);
    user.id.should.equal(1);
    should.exist(user.uuid);
    should.exist(user.email);
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
    const foundUser = user.find((u) => u.id === userId);
    foundUser.should.exist;
    foundUser.id.should.equal(userId);
});

void tap.test("Should return all topics from /topics", async () => {
    const response = await app.inject({
        method: "GET",
        url: "/topics",
    });

    const topics = JSON.parse(response.body);
    response.statusCode.should.equal(200);
    Array.isArray(topics).should.equal(true);
    topics.length.should.be.gte(1);
});

void tap.test("Should be able to search topics by title", async () => {
    const search = {
        "title": "Hi"
    };

    const response = await app.inject({
        method: "GET",
        url: "/topics",
        payload: search
    });

    const topics = JSON.parse(response.body);
    response.statusCode.should.equal(200);
    Array.isArray(topics).should.equal(true);
    topics.length.should.be.gte(1);
});

void tap.test("Should be able to search forums by id", async () => {
    const search = {
        "id": 1
    };

    const response = await app.inject({
        method: "SEARCH",
        url: "/forums/id",
        payload: search
    });

    const forums = JSON.parse(response.body);
    response.statusCode.should.equal(200);
    Array.isArray(forums).should.equal(false);
    forums.id.should.be.equal(1);
});

void tap.test("Should be able to create new forum", async () => {
    const newForum = {
        "user": "email@email.com",
        "title": "New Post",
        "content": "New unit testing"
    };

    const response = await app.inject({
        method: "POST",
        url: "/forum",
        payload: newForum
    });

    const forum = JSON.parse(response.body);
    response.statusCode.should.equal(200);
    Array.isArray(forum).should.equal(false);
    forum.id.should.be.gte(1);
});

void tap.test("Should be able to update existing forum", async () => {
    const newForum = {
        "forumId": "1",
        "title": "Update Post",
        "content": "Update Content"
    };

    const response = await app.inject({
        method: "PUT",
        url: "/forum",
        payload: newForum
    });
    const forum = JSON.parse(response.body);
    response.statusCode.should.equal(200);
    Array.isArray(forum).should.equal(false);
    forum.title.should.be.equal("Update Post");
    forum.content.should.be.equal("Update Content");
});

void tap.test("Should be able to update existing forum title", async () => {
    const newForum = {
        "forumId": "1",
        "title": "Update title"
    };

    const response = await app.inject({
        method: "PUT",
        url: "/forum",
        payload: newForum
    });
    const forum = JSON.parse(response.body);
    response.statusCode.should.equal(200);
    Array.isArray(forum).should.equal(false);
    forum.title.should.be.equal("Update title");
});

void tap.test("Should be able to update existing forum content", async () => {
    const newForum = {
        "forumId": "1",
        "content": "new content"
    };

    const response = await app.inject({
        method: "PUT",
        url: "/forum",
        payload: newForum
    });
    const forum = JSON.parse(response.body);
    response.statusCode.should.equal(200);
    Array.isArray(forum).should.equal(false);
    forum.content.should.be.equal("new content");
});

void tap.test("Should be able to delete existing forum", async () => {
    const newForum = {
        "forumId": "1"
    };
    const response = await app.inject({
        method: "DELETE",
        url: "/forum",
        payload: newForum
    });
    const forum = JSON.parse(response.body);
    response.statusCode.should.equal(200);
    Array.isArray(forum).should.equal(false);
    should.not.equal(forum.deleted_at, null);
});