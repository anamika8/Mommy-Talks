import {httpClient} from "@/services/HttpClient.tsx";

export const ForumService = {
    async send(user: string, title: string, content: string) {
        return httpClient.post("/forum", { user, title, content});
    }
};