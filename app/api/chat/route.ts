import { streamText, tool } from "ai";
import { z } from "zod";
import {
  getTasks,
  createTask,
  toggleTask,
  deleteTask,
} from "@/actions/task-actions";
import { openai } from "@ai-sdk/openai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages,
    maxSteps: 4,
    tools: {
      getTasks: tool({
        description: "Fetch all tasks for the user",
        parameters: z.object({}),
        execute: async () => await getTasks(),
      }),
      createTask: tool({
        description: "Create a new task",
        parameters: z.object({
          title: z.string().describe("title of the task"),
        }),
        execute: async ({ title }) => await createTask(title),
      }),
      toggleTask: tool({
        description: "Toggle task completion status",
        parameters: z.object({
          id: z.number().describe("id of the task"),
          completed: z.boolean().describe("new completion status"),
        }),
        execute: async ({ id, completed }) => await toggleTask(id, completed),
      }),
      deleteTask: tool({
        description: "Delete a task",
        parameters: z.object({
          id: z.number().describe("id of the task to delete"),
        }),
        execute: async ({ id }) => await deleteTask(id),
      }),
    },
  });

  return result.toDataStreamResponse();
}
