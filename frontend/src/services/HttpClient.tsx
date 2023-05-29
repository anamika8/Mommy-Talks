import axios from "axios";
import {ForumType} from "@/ProfileTypes.ts";

const serverIP = import.meta.env.VITE_API_HOST;
const serverPort = import.meta.env.VITE_PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

export const httpClient = axios.create({
    baseURL: serverUrl,
    headers: {
        "Content-type": "application/json",
    },
});

export async function getProfileById(id) {
    const data = JSON.stringify({
        "id": id
    });

    const config = {
        method: 'search',
        maxBodyLength: Infinity,
        url: `${serverUrl}/users`,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios.request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    return null;
}

export async function getAllForums(): Promise<ForumType[]> {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${serverUrl}/topics`,
            headers: {},
        };
        const response = await axios.request(config);
        return response.data as ForumType[];
    } catch (error) {
        console.log(error);
        throw error; // Optionally, you can rethrow the error to handle it higher up the call stack
    }
}

export async function getForumById(id) {
    const data = JSON.stringify({
        "id": id
    });

    const config = {
        method: 'search',
        maxBodyLength: Infinity,
        url: `${serverUrl}/forums`,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios.request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    return null;
}

export async function searchTopic(title: string): Promise<ForumType[]> {
    const data = JSON.stringify({
        "title": title
    });

    const config = {
        method: 'search',
        maxBodyLength: Infinity,
        url: `${serverUrl}/topics`,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };
    const response = await axios.request(config);
    return response.data as ForumType[];
}