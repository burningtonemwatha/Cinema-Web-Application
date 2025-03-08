document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            if (!validateLoginForm()) return; // Ensure validation runs first

            const formData = new FormData(loginForm);
            const loginData = {
                username: formData.get("username"),
                password: formData.get("password")
            };

            fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            })
            .then(response => response.json())
            .then(data => {
                console.log("Server response:", data);

                if (data.message === "Login successful") {
                    console.log("Redirecting to dashboard...");
                    window.location.href = "/dashboard.html"; // Update if needed
                } else {
                    alert("Error: " + data.error);
                }
            })
            .catch(error => console.error("Fetch error:", error));
        });
    } else {
        console.error("Login form not found!");
    }
});
