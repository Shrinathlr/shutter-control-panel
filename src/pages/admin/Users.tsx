
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader as DialogModalHeader,
  DialogTitle as DialogModalTitle,
  DialogFooter as DialogModalFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UsersPage() {
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  // For demo, handle add user (no backend yet)
  function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    // Here admin would verify and add the user
    setOpen(false);
    setNewUser({ name: "", email: "" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Monitor and manage user accounts</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogModalHeader>
              <DialogModalTitle>Add User</DialogModalTitle>
            </DialogModalHeader>
            <form className="space-y-4" onSubmit={handleAddUser}>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>
              <DialogModalFooter>
                <Button type="submit">Add</Button>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </DialogModalFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>All Users (0)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-12 flex flex-col items-center">
            <img
              src="/placeholder.svg"
              alt="No users"
              className="w-24 h-24 mb-4 opacity-60"
              draggable={false}
            />
            <p className="text-center text-gray-400 text-sm">
              No users registered yet.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
