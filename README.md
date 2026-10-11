# Discord Jira Scrum Bot

A Discord bot built with TypeScript and `discord.js` v14 that brings core Jira & Scrum project management workflows directly into your Discord server using interactive modals and SQLite.

## 📋 Features & Modals

### 1. Create Project
- **Project Name:** Name of your project
- **Project Key:** Short code/identifier (e.g., `BOT`)
- **Project Description:** Brief details about the project
- **Team Members:** Assigned team members

### 2. Create Issue / Task
- **Project Key:** Target project key (e.g., `BOT`)
- **Title / Summary:** Issue or task title
- **Description:** Detailed explanation
- **Issue Type:** Task, Bug, or Story
- **Priority:** High, Medium, or Low
- **Story Points:** Estimation (e.g., 1, 3, 5, 8)

### 3. Create Sprint
- **Project Key:** Target project key (e.g., `BOT`)
- **Sprint Name:** Name of the sprint (e.g., `Sprint 1`)
- **Sprint Goal:** Objective for the sprint
- **Duration:** Timeframe (e.g., `2 Weeks`)

### 4. Assign Issue
- **Issue Key:** Specific issue identifier (e.g., `BOT-1`)
- **Assignee:** User assigned to the task

### 5. Update Status
- **Issue Key:** Specific issue identifier (e.g., `BOT-1`)
- **New Status:** To Do, In Progress, or Done
- **Comment:** Optional status update comment

---

## 🚀 Tech Stack
- **Language:** TypeScript
- **Framework:** `discord.js` v14
- **Database:** SQLite