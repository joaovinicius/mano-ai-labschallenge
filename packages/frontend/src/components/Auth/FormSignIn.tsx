import { zodResolver } from "mantine-form-zod-resolver";
import { Group, PasswordInput, TextInput, Button, Card } from "@mantine/core";
import { SignInSchema, SignInSchemaType } from "lib/schemas/auth";
import { useForm } from "@mantine/form";
import { postSignin } from "~/services/authService";
import store from "~/stores/authStore";
import { observer } from "mobx-react-lite";
import { notifications } from "@mantine/notifications";
import { Navigate } from "react-router-dom";

const FormSignIn = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(SignInSchema),
  });

  async function handleSubmit(values: SignInSchemaType) {
    try {
      const response = await postSignin(values);
      store.setToken(response.data);
      window.location.href = "/";
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  }

  if (store.token) {
    return <Navigate to="/" />;
  }

  return (
    <Card maw={340} mx="auto" shadow="sm" padding="lg" radius="md" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Email" placeholder="Email" key={form.key("email")} {...form.getInputProps("email")} />

        <PasswordInput mt="sm" label="Password" placeholder="Password" key={form.key("password")} {...form.getInputProps("password")} />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Card>
  );
};

const FormSignInObserver = observer(FormSignIn);

export default FormSignInObserver;
