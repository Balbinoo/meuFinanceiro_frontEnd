import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth/authService";

import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconWallet } from "@tabler/icons-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);

      sessionStorage.setItem("access_token", data.access);
      sessionStorage.setItem("refresh_token", data.refresh);

      navigate("/");
    } catch (err) {
      console.error("Erro no login:", err);

      setError(
        "Não foi possível entrar. Verifique as credenciais ou a conexão com o servidor.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={20}>
      <Group justify="center" align="center" gap="xs" mb="xl">
        <IconWallet size={42} stroke={1.7} color="#20765B" />

        <Stack gap={0}>
          <Title order={2}>Welcome back</Title>

          <Text c="dimmed" size="sm">
            Sign in to manage your finances
          </Text>
        </Stack>
      </Group>

      <Paper withBorder shadow="md" p={30} radius="lg">
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Username"
              placeholder="Username"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              required
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              required
            />

            <Checkbox
              label="Remember me"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.currentTarget.checked)}
            />

            <Anchor c={"#20765B"} href="/forgot-password" size="sm" ta="right">
              Forgot password?
            </Anchor>

            <Button
              loading={loading}
              bg={"#20765B"}
              type="submit"
              fullWidth
              size="md"
            >
              Sign in
            </Button>
          </Stack>
        </form>

        <Divider my="lg" label="New here?" labelPosition="center" />

        <Text ta="center" size="sm">
          Don't have an account?{" "}
          <Anchor c={"#20765B"} href="/register" fw={600}>
            Create account
          </Anchor>
        </Text>
      </Paper>

      <Text c="dimmed" size="xs" ta="center" mt="xl">
        Your finances, organized in one place.
      </Text>
    </Container>
  );
};

export default LoginPage;
