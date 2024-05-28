"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useBoundStore from "@/store";
import { UserData } from "@/store/config.type";
import { ChangeEvent, FormEvent, ReactEventHandler, useState } from "react";

export function Onboarding() {
  const router = useRouter();
  const { updateUser } = useBoundStore();
  const [user, setUser] = useState<UserData>({
    name: "",
    pw: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (user.name.trim() === "" || user.pw.trim() === "") {
      toast.warning("Usuario y Contraseña requeridas");
      setIsLoading(false);

      return;
    }
    const response = await updateUser(user);
    if (response) {
      router.push("/config/setup");
    }
    setIsLoading(false);
    // todo
  };
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Configura tu cuenta</h1>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username">Usuario</Label>
              <Input
                className="mt-1"
                id="username"
                value={user.name}
                name="name"
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                className="mt-1"
                id="password"
                value={user.pw}
                onChange={handleChange}
                name="pw"
                placeholder="Enter your password"
                type="password"
              />
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
