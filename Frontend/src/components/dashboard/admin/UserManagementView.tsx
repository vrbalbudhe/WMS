
import { useState } from "react";
import { Search, PlusCircle, Filter, MoreHorizontal, UserPlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
};

export function UserManagementView() {
  const [users] = useState<User[]>([
    {
      id: "USR-001",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Administrator",
      status: "active",
      lastLogin: "Today, 9:42 AM"
    },
    {
      id: "USR-002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Warehouse Manager",
      status: "active",
      lastLogin: "Yesterday, 4:30 PM"
    },
    {
      id: "USR-003",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "Procurement Officer",
      status: "active",
      lastLogin: "Today, 11:15 AM"
    },
    {
      id: "USR-004",
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      role: "Warehouse Manager",
      status: "inactive",
      lastLogin: "3 days ago"
    },
    {
      id: "USR-005",
      name: "Robert Brown",
      email: "robert.b@example.com",
      role: "Procurement Officer",
      status: "pending",
      lastLogin: "Never"
    },
    {
      id: "USR-006",
      name: "Emily Davis",
      email: "emily.d@example.com",
      role: "Administrator",
      status: "active",
      lastLogin: "Yesterday, 10:20 AM"
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Tabs defaultValue="all-users" className="w-full">
        <TabsList>
          <TabsTrigger value="all-users">All Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-users">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>Manage your system users</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-[250px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search users..."
                      className="pl-8 w-full h-9"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "active"
                              ? "success"
                              : user.status === "inactive"
                              ? "secondary"
                              : "warning"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-3">
              <div className="text-sm text-muted-foreground">
                Showing {users.length} of {users.length} users
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>Define and manage user roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Administrator", users: 2, description: "Full system access" },
                  { name: "Warehouse Manager", users: 2, description: "Inventory and warehouse management" },
                  { name: "Procurement Officer", users: 2, description: "Purchasing and vendor management" }
                ].map((role) => (
                  <div
                    key={role.name}
                    className="flex items-center justify-between p-4 border rounded-md hover:bg-accent/50"
                  >
                    <div>
                      <h3 className="font-medium">{role.name}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{role.users} users</span>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t p-3">
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New Role
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Permission Settings</CardTitle>
              <CardDescription>Define access levels for each role</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Configure detailed permissions for each role in the system.
              </p>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">Permission</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Administrator</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Warehouse Manager</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Procurement Officer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      "View Dashboard",
                      "Manage Users",
                      "View Inventory",
                      "Modify Inventory",
                      "Create Transfers",
                      "Approve Transfers",
                      "View Procurement",
                      "Create Purchase Orders",
                      "Approve Purchase Orders",
                      "View Reports",
                      "System Settings"
                    ].map((permission, index) => (
                      <tr key={index} className="hover:bg-muted/50">
                        <td className="px-4 py-3 text-sm">{permission}</td>
                        <td className="px-4 py-3 text-center">
                          <input type="checkbox" defaultChecked className="h-4 w-4" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4"
                            defaultChecked={[
                              "View Dashboard", "View Inventory", "Modify Inventory", 
                              "Create Transfers", "Approve Transfers", "View Reports"
                            ].includes(permission)}
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4"
                            defaultChecked={[
                              "View Dashboard", "View Inventory", "View Procurement", 
                              "Create Purchase Orders", "View Reports"
                            ].includes(permission)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="border-t p-3">
              <Button>Save Permission Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
