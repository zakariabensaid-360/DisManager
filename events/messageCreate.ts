import {
  Message,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

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
          .setLabel("➕ Create New Issue")
          .setStyle(ButtonStyle.Primary),
      );

      await message.channel.send({
        components: [row],
      });
    }

    if (message.content === "test") {
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId("open_issue_modal_btn")
          .setLabel("➕ Create New Issue")
          .setStyle(ButtonStyle.Primary),
      );

      await message.channel.send({
        components: [row],
      });
    }
  },
};

export { messageCreateEvent };
export type { MessageCreateEvent };
