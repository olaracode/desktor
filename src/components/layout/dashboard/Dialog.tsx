import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Nav from "./Nav";

const DashboardDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
          <MenuIcon />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>A donde quieres ir?</DialogTitle>
        </DialogHeader>
        <Nav dialog />
      </DialogContent>
    </Dialog>
  );
};

export default DashboardDialog;
