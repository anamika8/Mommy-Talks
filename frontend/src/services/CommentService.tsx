import {httpClient} from "@/services/HttpClient.tsx";

export const CommentService = {
    async send(user: string, forumId: string, comment: string) {
        return httpClient.post("/comment", { user, forumId, comment});
    }
};