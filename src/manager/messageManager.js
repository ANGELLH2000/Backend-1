import fs from "fs";
import { v4 as uuid } from "uuid";

export class MessageManager {
    constructor() {
        this.messages = [];
        this.path = "./src/manager/data/messages.json";
    }

    async getMessages() {

        const file = await fs.promises.readFile(this.path, "utf-8");
        const fileParse = JSON.parse(file);
        this.messages = fileParse || [];
        return this.messages;
    }

    async addMessages(data) {
        console.log("////",data,"/////Estos son los datos")
        await this.getMessages();

        const { user,message } = data;

        const newMessage = {
            id: uuid(),
            user,
            message
        };
        console.log("Estos son los datos:",this.messages,"--",newMessage)
        this.messages.push(newMessage);
        await fs.promises.writeFile(this.path, JSON.stringify(this.messages));
        return newMessage;
    }

}