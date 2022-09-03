export default () => new Promise((resolve, reject) => {
    try {
        fetch("https://api.filesafety.co/authentication/logout", {
            method: "GET",
            credentials: "include",
            headers: { ["Content-Type"]: "application/json" },
        }).then((response) => response.json()).then((response) => {
            if (response.error) return reject(new Error(response.message));
            else return resolve(response.data);
        }).catch(() => reject());
    } catch (error) {
        return reject();
    };
});