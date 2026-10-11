import {
  type Interaction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  InteractionResponse,
} from "discord.js";
import { insertProject } from "../models/Projects.ts";

type InteractionCreate = {
  name: string;
  execute: (
    interaction: Interaction,
  ) => Promise<InteractionResponse<boolean> | void>;
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
          .setPlaceholder("e.g. 123456789, 987654321")
          .setStyle(TextInputStyle.Short)
          .setRequired(false);

        const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(projectName);
        const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(projectKey);
        const row3 = new ActionRowBuilder<TextInputBuilder>().addComponents(projectDescription);
        const row4 = new ActionRowBuilder<TextInputBuilder>().addComponents(teamMembers);

        modal.addComponents(row1, row2, row3, row4);

        return await interaction.showModal(modal);
      }

      if (interaction.customId === "OpenIssueModalBtn") {
        const modal = new ModalBuilder()
          .setCustomId("CreateIssueModalSubmit")
          .setTitle("Create New Issue Project");

        const IssueName = new TextInputBuilder()
          .setCustomId("IssueName")
          .setLabel("Issue Name")
          .setPlaceholder("e.g. Home page Issue")
          .setStyle(TextInputStyle.Short)
          .setRequired(false);

        const IssueDescription = new TextInputBuilder()
          .setCustomId("IssueDescription")
          .setLabel("Issue Description")
          .setPlaceholder("The home page does not show up when users click...")
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(false);

        const Assinge = new TextInputBuilder()
          .setCustomId("AssingIssue")
          .setLabel("Assign Issue")
          .setPlaceholder("DiscordID exp: 123456789")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const DeadLine = new TextInputBuilder()
          .setCustomId("IssueDeadLine") // Matches fetch ID below
          .setLabel("Issue DeadLine")
          .setPlaceholder("11/11/2026")
          .setMaxLength(10)
          .setMinLength(8)
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(IssueDescription);
        const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(IssueName);
        const row3 = new ActionRowBuilder<TextInputBuilder>().addComponents(DeadLine);
        const row4 = new ActionRowBuilder<TextInputBuilder>().addComponents(Assinge);
        
        modal.addComponents(row2, row1, row3, row4);

        return await interaction.showModal(modal);
      }

      if (interaction.customId === "OpenTaskModalBtn") {
        const modal = new ModalBuilder()
          .setCustomId("CreateTaskModalSubmit")
          .setTitle("Create New Task Project");

        const TaskName = new TextInputBuilder()
          .setCustomId("TaskName")
          .setLabel("Task Name")
          .setPlaceholder("e.g. create a Home page")
          .setStyle(TextInputStyle.Short)
          .setRequired(false);

        const TaskDescription = new TextInputBuilder()
          .setCustomId("TaskDescription")
          .setLabel("Task Description")
          .setPlaceholder("create a responsive home page...")
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(false);

        const Assinge = new TextInputBuilder()
          .setCustomId("AssingTask")
          .setLabel("Assign Task")
          .setPlaceholder("DiscordID exp: 123456789")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const DeadLine = new TextInputBuilder()
          .setCustomId("TaskDeadLine") // Matches fetch ID below
          .setLabel("Task DeadLine")
          .setPlaceholder("11/11/2026")
          .setMaxLength(10)
          .setMinLength(8)
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(TaskDescription);
        const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(TaskName);
        const row3 = new ActionRowBuilder<TextInputBuilder>().addComponents(DeadLine);
        const row4 = new ActionRowBuilder<TextInputBuilder>().addComponents(Assinge);
        
        modal.addComponents(row2, row1, row3, row4);

        return await interaction.showModal(modal);
      }
    }

    if (interaction.isModalSubmit()) {
      if (interaction.customId === "CreateProjectModalSubmit") {
        const projectName = interaction.fields.getTextInputValue("ProjectName");
        const projectKey = interaction.fields.getTextInputValue("ProjectKey");
        const projectDescription = interaction.fields.getTextInputValue("ProjectDescription");
        const teamMembers = interaction.fields.getTextInputValue("TeamMembers");

        await insertProject(
          projectKey,
          projectName,
          projectDescription,
          teamMembers,
        );

        return await interaction.reply({
          content: "The project was saved in the database",
          ephemeral: true,
        });
      }

      if (interaction.customId === "CreateIssueModalSubmit") {
        const IssueName = interaction.fields.getTextInputValue("IssueName");
        const IssueDescription = interaction.fields.getTextInputValue("IssueDescription");
        const AssingIssue = interaction.fields.getTextInputValue("AssingIssue");
        const DeadLine = interaction.fields.getTextInputValue("IssueDeadLine"); // Fixed field name!

        return await interaction.reply({
          content: "The issue was saved in the database",
          ephemeral: true,
        });
      }

      if (interaction.customId === "CreateTaskModalSubmit") {
        const TaskName = interaction.fields.getTextInputValue("TaskName");
        const TaskDescription = interaction.fields.getTextInputValue("TaskDescription");
        const AssingTask = interaction.fields.getTextInputValue("AssingTask");
        const DeadLine = interaction.fields.getTextInputValue("TaskDeadLine"); // Fixed field name!

        return await interaction.reply({
          content: "The task was saved in the database",
          ephemeral: true,
        });
      }
    }
  },
};

export { interactionCreate };
export type { InteractionCreate };