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
import { ConfigData, ConfigForm } from "@/store/config.type";
import { ChangeEvent, FormEvent, ReactEventHandler, useState } from "react";

export function Setup() {
  const router = useRouter();
  const { updateConfigData } = useBoundStore();
  const [configData, setConfigData] = useState<ConfigForm>({
    email: "",
    specialty: "",
    apiKey: "",
    basePrice: 0,
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
      toast.warning("Campos requeridos", {
        description:
          "Los campos email, especialidad y el codigo de activacion son requeridos",
      });
      setIsLoading(false);
      return;
    }
    if (configData.basePrice <= 0) {
      toast.warning("Campo requerido", {
        description: "El precio de la consulta debe ser mayor a 0$",
      });
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
              <Label htmlFor="email">Email</Label>
              <Input
                className="mt-1"
                id="email"
                value={configData.email}
                name="email"
                onChange={handleChange}
                placeholder="medic@care.com"
              />
            </div>
            <div>
              <SelectGroup>
                <SelectLabel>Especialidad</SelectLabel>
                <Select
                  onValueChange={(value) =>
                    setConfigData({ ...configData, specialty: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Medico general">
                      Medico general
                    </SelectItem>
                  </SelectContent>
                </Select>
              </SelectGroup>
            </div>
            <div>
              <Label htmlFor="apiKey">Codigo de activacion</Label>
              <Input
                className="mt-1"
                id="apiKey"
                value={configData.apiKey}
                onChange={handleChange}
                name="apiKey"
                placeholder="Codigo del producto"
                type="text"
              />
            </div>
            <div>
              <Label htmlFor="basePrice">Precio de la consulta</Label>
              <Input
                className="mt-1"
                id="basePrice"
                value={configData.basePrice}
                onChange={handleChange}
                name="basePrice"
                placeholder="0"
                type="number"
              />
              <p className="text-xs">
                El precio se representa en Dolares americanos (<b>USD</b>)
              </p>
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
