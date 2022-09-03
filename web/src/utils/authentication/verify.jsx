export default (code) => new Promise((resolve, reject) => {
    try {
        fetch("https://api.filesafety.co/authentication/verify", {
            method: "POST",
            credentials: "include",
            headers: { ["Content-Type"]: "application/json" },
            body: JSON.stringify({
                Code: code,
            }),
        }).then((response) => response.json()).then((response) => {
            if (response.error) return reject(new Error(response.message));
            else return resolve(response.data);
        }).catch(() => reject());
    } catch (error) {
        return reject();
    };
});