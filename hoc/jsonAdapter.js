const groupedData = (data) => {
  return data.reduce((acc, item) => {
    const { index } = item;
    if (!acc[index]) {
      acc[index] = [];
    }
    acc[index].push(item);
    return acc;
  }, {});
};

export const convertJsonToFormFields = (panelsConfig, formFields) => {
  const result = [];

  for (const panelKey in panelsConfig) {
    const panel = panelsConfig[panelKey];

    panel.panelData.forEach((data, index) => {
      const fields = formFields[data.id]?.fields;

      fields.forEach((field) => {
        const registerName = field?.registerName;
        let value = null;

        if (registerName in data) {
          value = data[registerName];
        } else if (registerName && registerName.includes(".")) {
          const keys = registerName.split(".");
          value = keys.reduce((acc, key) => acc?.[key], data);
        } else {
          value = "";
        }

        result.push({
          index: index + 1,
          id: field.id,
          dropType: data.id,
          type: field.type,
          registerName: registerName,
          value,
        });
      });
    });
  }

  const groupedResult = groupedData(result);

  return groupedResult;
};
