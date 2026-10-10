import {
  type Interaction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  InteractionResponse,
} from "discord.js";

type InteractionCreate = {
  name: string;
  execute: (
    interaction: Interaction,
  ) => Promise<InteractionResponse<boolean> | undefined>;
};

const interactionCreate: InteractionCreate = {
  name: "interactionCreate",
  async execute(interaction: Interaction) {
    if (interaction.isButton()) {
      if (interaction.customId === "OpenCreateProjectModal") {
        const modal = new ModalBuilder()
          .setCustomId("CreateProjectModalSubmit")
          .setTitle("Create New Scrum Project");

        const projectName = new TextInputBuilder()
          .setCustomId("ProjectName")
          .setLabel("Project name")
          .setPlaceholder("My-YouCode-project")
          .setMaxLength(50)
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const projectKey = new TextInputBuilder()
          .setCustomId("ProjectKey")
          .setLabel("Project Key (Short code)")
          .setPlaceholder("e.g. THIM")
          .setMaxLength(5)
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const projectDescription = new TextInputBuilder()
          .setCustomId("ProjectDescription")
          .setLabel("Project Description")
          .setPlaceholder("Briefly describe what this project is about...")
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(false);

        const teamMembers = new TextInputBuilder()
          .setCustomId("TeamMembers")
          .setLabel("Team Members")
          .setPlaceholder("e.g. @user1, @user2")
          .setStyle(TextInputStyle.Short)
          .setRequired(false);

        const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(
          projectName,
        );
        const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(
          projectKey,
        );
        const row3 = new ActionRowBuilder<TextInputBuilder>().addComponents(
          projectDescription,
        );
        const row4 = new ActionRowBuilder<TextInputBuilder>().addComponents(
          teamMembers,
        );

        modal.addComponents(row1, row2, row3, row4);

        return await interaction.showModal(modal);
      }
    }

    if (interaction.isModalSubmit()) {
      if (interaction.customId === "CreateProjectModalSubmit") {
        const projectName = interaction.fields.getTextInputValue("ProjectName");
        const projectKey = interaction.fields.getTextInputValue("ProjectKey");
        const projectDescription =
          interaction.fields.getTextInputValue("ProjectDescription");
        const teamMembers = interaction.fields.getTextInputValue("TeamMembers");

        console.log({
          projectName,
          projectKey,
          projectDescription,
          teamMembers,
        });

        return await interaction.reply({
          content: `test`,
          ephemeral: true,
        });
      }
    }
  },
};

export { interactionCreate };
export type { InteractionCreate };
