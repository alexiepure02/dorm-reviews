export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_API_URL
      : "https://example.com";

  return base_url;
};
