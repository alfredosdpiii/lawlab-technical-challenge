import { Container, Title, Text, Stack } from "@mantine/core";

export default function HomePage() {
  return (
    <Container size="sm" py={80}>
      <Stack align="center">
        <Title order={1}>Task Management App</Title>
        <Text size="lg">
          Please log in to access your personal task management dashboard.
        </Text>
      </Stack>
    </Container>
  );
}
