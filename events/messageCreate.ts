import {
  Message,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import { getProject } from "../models/Projects.ts";
import { getProjectByMember } from "../models/Users.ts";

type MessageCreateEvent = {
  name: string;
  execute: (message: Message) => Promise<void> | void;
};

const messageCreateEvent: MessageCreateEvent = {
  name: "messageCreate",
  async execute(message: any) {
    if (message.author.bot) return;

    if (message.content === "create-project") {
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId("OpenCreateProjectModal")
          .setLabel("➕ Create New Project")
          .setStyle(ButtonStyle.Primary),
      );

      await message.channel.send({
        components: [row],
      });
    }

  if (message.content === "create-task") {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("OpenIssueModalBtn") 
      .setLabel("➕ Create New Issue")
      .setStyle(ButtonStyle.Danger),
  );

  const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("OpenTaskModalBtn") 
      .setLabel("➕ Create New Task")
      .setStyle(ButtonStyle.Primary),
  );

  await message.channel.send({
    content: "Please select an option below:", // Optional text prompt
    components: [row, row2],
  });
}
  },
};

export { messageCreateEvent };
export type { MessageCreateEvent };
