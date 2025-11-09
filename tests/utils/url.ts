export const getUrl = () => {
  const base = process.env.TEST_ENV === "production"
    ? "https://profile-next-kappa.vercel.app"
    : "http://localhost:3000";

  return `${base}/es`;
};