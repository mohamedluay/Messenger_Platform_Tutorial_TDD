// ToDo: Lesson_4_6
const buildGenericListElement = (
    title,
    { subtitle, imageUrl, defaultAction, buttons } = {}
) => {
    const elementTemplate = { title };
    if (subtitle) elementTemplate.subtitle = subtitle;
    if (imageUrl) elementTemplate.image_url = imageUrl;
    if (defaultAction) elementTemplate.default_action = defaultAction;
    if (buttons) elementTemplate.buttons = buttons;
    return elementTemplate;
};

module.exports = {
    buildGenericListElement,
};
