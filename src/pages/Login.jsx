import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

//API import//
import { login } from "../services/auth";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = await login(formData);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/");
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex min-h-screen items-center justify-center bg-muted px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login to AI Resume Optimizer
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>

                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>


                        <Button className="w-full" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>

                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-primary underline">
                            Sign up
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
