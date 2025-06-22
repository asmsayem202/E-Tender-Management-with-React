import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { login } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema";
import { Form } from "../ui/form";
import FormInput from "../Custom/FormInput";
import FormPassword from "../Custom/FormPassword";
import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";
import { useGlobalStore } from "@/store/store";

const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const setUser = useGlobalStore((state) => state.setUser);

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "superadmin@example.com",
      password: "SuperAdmin@123",
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (res.status === 200) {
        const token = res?.data?.token;
        // Encrypt token before storing
        const encryptedToken = CryptoJS.AES.encrypt(
          token,
          SECRET_KEY
        ).toString();

        localStorage.setItem("Etender-token", encryptedToken);

        const decodedUser: any = jwtDecode(token);
        setUser(decodedUser);
        localStorage.setItem("Etender-user", JSON.stringify(decodedUser));

        navigate("/dashboard");
        toast.success("Login successful");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (data: any) => {
    loginMutation.mutate(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <Form {...form}>
        <FormInput
          form={form}
          label="Email"
          type="email"
          name="email"
          placeholder="m@example.com"
        />
        <FormPassword
          form={form}
          label="Password"
          name="password"
          placeholder="Password"
        />
        <a
          href="#"
          className="ml-auto text-sm underline-offset-4 hover:underline"
        >
          Forgot your password?
        </a>

        <Button
          type="submit"
          className="w-full"
          isLoading={loginMutation?.isPending}
          disabled={loginMutation?.isPending}
        >
          Login
        </Button>
      </Form>
    </form>
  );
}
