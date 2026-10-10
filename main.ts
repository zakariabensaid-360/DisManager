import { Client, GatewayIntentBits  } from 'discord.js';
import * as dotenv from 'dotenv';
import { messageCreateEvent } from './events/messageCreate.ts';
import { interactionCreate } from './events/interactionCreate.ts';
import { connectDatabase } from './database/connection.ts';
dotenv.config();
connectDatabase()


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});



client.on(messageCreateEvent.name, messageCreateEvent.execute);
client.on(interactionCreate.name, interactionCreate.execute);

const TOKEN = process.env.TOKEN;






client.once('ready', async (c) => {
  console.log(`Bot online as ${c.user.tag}`);
});



client.login(TOKEN);