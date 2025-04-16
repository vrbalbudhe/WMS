
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  LockKeyhole, 
  User, 
  Fingerprint,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum(["admin", "warehouse", "procurement"], {
    required_error: "Please select a role",
  }),
});

const mfaSchema = z.object({
  code: z.string().min(6, { message: "Please enter a valid authentication code" }),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showMfa, setShowMfa] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Define forms
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "warehouse",
    },
  });

  const mfaForm = useForm<z.infer<typeof mfaSchema>>({
    resolver: zodResolver(mfaSchema),
    defaultValues: {
      code: "",
    },
  });

  // Handle login submission
  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Show MFA screen for admin and warehouse roles (simulating MFA requirement)
      if (values.role === "admin" || values.role === "warehouse") {
        setShowMfa(true);
      } else {
        // For procurement, directly redirect to dashboard
        handleSuccessfulAuth(values.role);
      }
    }, 1000);
  };

  // Handle MFA submission
  const onMfaSubmit = async (values: z.infer<typeof mfaSchema>) => {
    setIsLoading(true);
    
    // Simulate API call for MFA verification
    setTimeout(() => {
      setIsLoading(false);
      
      // Get selected role from login form
      const role = loginForm.getValues("role");
      handleSuccessfulAuth(role);
    }, 1000);
  };

  // Handle successful authentication
  const handleSuccessfulAuth = (role: string) => {
    // Show success message
    toast({
      title: "Login Successful",
      description: "Welcome to ConstructWMS",
      variant: "success",
    });
    
    // Redirect based on role
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {!showMfa ? (
          <Card className="border shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">ConstructWMS</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={loginForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="warehouse">Warehouse Manager</SelectItem>
                            <SelectItem value="procurement">Procurement Officer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="email@example.com" className="pl-9" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <LockKeyhole className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              className="pl-9"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <div className="text-center text-sm text-muted-foreground w-full">
                <a href="#" className="underline hover:text-foreground">
                  Forgot your password?
                </a>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-2">
                <ShieldAlert className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Two-Factor Authentication</CardTitle>
              <CardDescription>
                Enter the verification code from your authenticator app
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...mfaForm}>
                <form
                  onSubmit={mfaForm.handleSubmit(onMfaSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={mfaForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Authentication Code</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Fingerprint className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="123456"
                              className="pl-9 text-center tracking-widest font-mono text-lg"
                              maxLength={6}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-center text-sm text-muted-foreground w-full">
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => setShowMfa(false)}
                >
                  Back to login
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
