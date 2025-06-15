
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    setOpen(false);
    setNewUser({ name: "", email: "" });
  }

  return (
    <div className="space-y-6">
      {/* Admin Details Section */}
      <Card className="mb-6 border-pink-200 shadow">
        <CardHeader>
          <CardTitle className="text-pink-600">Admin Details</CardTitle>
          <CardDescription>
            View your administrator account information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img
              src="/lovable-uploads/54b43b15-e7cb-45d8-bcec-80bfa62d97dd.png"
              alt="Admin profile"
              className="w-20 h-20 rounded-full border-4 border-pink-200 object-cover"
              draggable={false}
            />
            <div className="space-y-1">
              <div>
                <span className="font-semibold text-gray-800">Name:</span> Admin User
              </div>
              <div>
                <span className="font-semibold text-gray-800">Email:</span> admin@example.com
              </div>
              <div>
                <span className="font-semibold text-gray-800">Role:</span> Super Admin
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* End Admin Details Section */}

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
