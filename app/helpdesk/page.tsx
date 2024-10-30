"use client";
import { useChat } from "ai/react";
import {
  ActionIcon,
  Container,
  Flex,
  Paper,
  ScrollArea,
  Text,
  Input,
  Card,
  Stack,
} from "@mantine/core";
import { Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { Task } from "@/types/types";

export default function HelpDesk() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      async onToolCall({ toolCall }) {
        if (toolCall.toolName === "getTasks") {
          return "Tasks fetched successfully";
        }
        if (toolCall.toolName === "createTask") {
          return "Task created successfully";
        }
        if (toolCall.toolName === "toggleTask") {
          return "Task updated successfully";
        }
        if (toolCall.toolName === "deleteTask") {
          return "Task deleted successfully";
        }
      },
    });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const renderTaskList = (tasks: Task[]) => {
    return tasks.map((task) => (
      <Card key={task.id} withBorder radius="md" mb="xs">
        <Text>{task.title}</Text>
        <Text size="sm" c="dimmed">
          Status: {task.completed ? "Completed" : "Pending"}
        </Text>
      </Card>
    ));
  };

  return (
    <Container size="md" py="md">
      <Paper shadow="sm" p="md" radius="md" withBorder>
        <Flex direction="column" gap="md" h={500}>
          <ScrollArea h={450} viewportRef={scrollRef}>
            <Flex direction="column" gap="md">
              {messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    alignSelf:
                      message.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {message.toolInvocations ? (
                    message.toolInvocations.map((tool, index) => (
                      <Card
                        key={index}
                        shadow="sm"
                        withBorder
                        radius="md"
                        style={{ maxWidth: "80%" }}
                      >
                        {tool.state === "result" && (
                          <Stack gap="xs">
                            {tool.toolName === "getTasks" &&
                              Array.isArray(tool.result) &&
                              renderTaskList(tool.result)}
                            {tool.toolName === "createTask" && (
                              <Text size="sm">Created: {tool.args.title}</Text>
                            )}
                            {tool.toolName === "toggleTask" && (
                              <Text size="sm">
                                Updated task {tool.args.id} to{" "}
                                {tool.args.completed ? "completed" : "pending"}
                              </Text>
                            )}
                            {tool.toolName === "deleteTask" && (
                              <Text size="sm">Removed task {tool.args.id}</Text>
                            )}
                          </Stack>
                        )}
                      </Card>
                    ))
                  ) : (
                    <Paper
                      shadow="sm"
                      p="xs"
                      radius="md"
                      withBorder
                      style={{ maxWidth: "100%" }}
                      bg={message.role === "user" ? "blue" : undefined}
                    >
                      <Text
                        size="sm"
                        c={message.role === "user" ? "white" : undefined}
                      >
                        {message.content}
                      </Text>
                    </Paper>
                  )}
                </div>
              ))}
              {isLoading && (
                <Paper
                  shadow="sm"
                  p="xs"
                  radius="md"
                  withBorder
                  style={{ alignSelf: "flex-start", maxWidth: "80%" }}
                >
                  <Text size="sm">Working on it...</Text>
                </Paper>
              )}
            </Flex>
          </ScrollArea>

          <form onSubmit={handleSubmit}>
            <Flex gap="sm">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => handleInputChange(e)}
                style={{ flex: 1 }}
                size="md"
              />
              <ActionIcon
                type="submit"
                variant="filled"
                disabled={!input.trim() || isLoading}
                size="lg"
              >
                <Send size={18} />
              </ActionIcon>
            </Flex>
          </form>
        </Flex>
      </Paper>
    </Container>
  );
}
