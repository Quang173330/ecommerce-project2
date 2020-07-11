export async function adminPage() {
    await fetch("/api/users/getUserData/", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + window.localStorage.token
        }
    })
    .then(res => res.json())
    .then(res => {
        if(res) {
            if(res.userData.Permits !== "admin") {
                window.location.href = "/";
            }
        }
    });
}