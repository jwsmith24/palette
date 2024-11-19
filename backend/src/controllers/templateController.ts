/**
 * Future home of the template controller
 */

export const getAllTemplates = () => {
  fetch("../../userData/templates.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};
