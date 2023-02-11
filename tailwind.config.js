/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./dist/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["'Poppins', sans-serif"],
            },
            boxShadow: {
                key: "inset 0px 0px 8px rgba(0, 0, 0, 0.2);",
            },
        },
    },
    plugins: [],
};
