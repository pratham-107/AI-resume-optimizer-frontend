const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

//SIGNUP
export async function signup(data) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Signup Failed");
    }

    return result;
}


//LOGIN//
export async function login(data) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Login Failed");
    }

    return result;
}


//LOGOUT USER
export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}