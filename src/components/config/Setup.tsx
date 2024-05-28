"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useBoundStore from "@/store";
import { ConfigData } from "@/store/config.type";
import { ChangeEvent, FormEvent, ReactEventHandler, useState } from "react";

export function Setup() {
  const router = useRouter();
  const { updateConfigData } = useBoundStore();
  const [configData, setConfigData] = useState<ConfigData>({
    email: "",
    specialty: "",
    apiKey: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfigData({ ...configData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(configData);
    setIsLoading(true);
    if (
      configData.email.trim() === "" ||
      configData.specialty.trim() === "" ||
      configData.apiKey.trim() === ""
    ) {
      toast.warning("Usuario y Contraseña requeridas");
      setIsLoading(false);

      return;
    }
    const response = await updateConfigData(configData);
    if (response) router.push("/dashboard");
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
              <Label htmlFor="username">Email</Label>
              <Input
                className="mt-1"
                id="username"
                value={configData.email}
                name="email"
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>
            <div>
              <Label htmlFor="password">Especialidad</Label>
              <Select
                onValueChange={(value) =>
                  setConfigData({ ...configData, specialty: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Especialidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medico general">Medico general</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="password">Codigo de activacion</Label>
              <Input
                className="mt-1"
                value={configData.apiKey}
                onChange={handleChange}
                name="apiKey"
                placeholder="Codigo del producto"
                type="text"
              />
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Finaliza
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
