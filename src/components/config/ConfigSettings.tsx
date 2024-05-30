import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const ConfigSettings = () => {
  return (
    <div className="flex h-full items-center justify-center  px-4 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Modifica tu cuenta</h1>
          </div>
          <form className="space-y-4">
            <div>
              <Label htmlFor="username">Usuario</Label>
              <Input
                className="mt-1"
                id="username"
                name="name"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <Label htmlFor="username">Email</Label>
              <Input
                className="mt-1"
                id="username"
                name="name"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <Label htmlFor="username">Especialidad</Label>
              <Input
                className="mt-1"
                id="username"
                name="name"
                placeholder="Enter your username"
              />
            </div>

            <Button className="w-full" type="submit">
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfigSettings;
