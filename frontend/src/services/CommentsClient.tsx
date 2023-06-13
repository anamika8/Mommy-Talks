import axios from "axios";
import {CommentType, ForumType, ProfileType} from "@/ProfileTypes.ts";
import {hostPortConfig} from "../../envConfig.ts";

const serverIP = hostPortConfig.API_HOST;
const serverPort = hostPortConfig.COMMENTS_PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

export const httpCommentsClient = axios.create({
    baseURL: serverUrl,
    headers: {
        "Content-type": "application/json",
    },
});

export async function getForumComments(forumId: number): Promise<CommentType[]> {
    try {
        const response = await httpCommentsClient.get(`/comments/${forumId}`);
        return response.data as CommentType[];
    } catch (error) {
        console.error("Error fetching forum comments:", error);
        return [];
    }
}