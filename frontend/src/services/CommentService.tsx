import {httpCommentsClient} from "@/services/CommentsClient.tsx";

export const CommentService = {
    async send(user: string, forumId: string, comment: string) {
        return httpCommentsClient.post("/comment", { user, forumId, comment});
    }
};