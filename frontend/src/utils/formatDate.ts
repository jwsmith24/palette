/**
 * Helper function to format the current date/time for the copy title
 */
const formatDate = () => new Date().toLocaleString().replace(/\//g, "-");

export default formatDate;
