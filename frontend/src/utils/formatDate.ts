/**
 * Helper function to format the current date/time for the copy title
 */
export const formatDate = () => new Date().toLocaleString().replace(/\//g, "-");
