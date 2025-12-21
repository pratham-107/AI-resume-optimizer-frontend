import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { LogOut, User } from "lucide-react";

export default function Profile() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")) || {};

    const [name, setName] = useState(user.name || "");
    const [email] = useState(user.email || "");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleUpdateProfile = () => {
        // connect API later
        const updatedUser = { ...user, name };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile updated successfully!");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Profile</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your account information
                </p>
            </div>

            {/* Profile Card */}
            <Card className="mt-5 px-5">
                <CardHeader className="flex flex-row items-center gap-4 ">
                    <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-xl">
                            {name?.charAt(0)?.toUpperCase() || <User />}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <CardTitle>{name || "Your Name"}</CardTitle>
                        <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                </CardHeader>

                <Separator />

                <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input value={email} disabled />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button onClick={handleUpdateProfile}>
                            Save Changes
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={handleLogout}
                            className="flex items-center gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
