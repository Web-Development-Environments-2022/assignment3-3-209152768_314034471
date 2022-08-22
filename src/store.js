export const state = {
    bypass_external_requests: true,
    server_domain: "http://localhost",
    // server_domain: "http://132.72.65.211/",
    username: localStorage.username,
    login(username) {
        localStorage.setItem("username", username);
        this.username = username;
        console.log("login", this.username);
    },
    logout() {
        console.log("logout");
        localStorage.removeItem("username");
        this.username = undefined;
    },
};