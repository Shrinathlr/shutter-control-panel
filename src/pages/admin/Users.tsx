
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Monitor and manage user accounts</p>
        </div>
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
