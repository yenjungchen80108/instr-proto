export const instrConfigToFormFields = (panelsConfig, formFields) => {
  const result = {};

  // 遞歸取 fields
  const extractFields = (fields, data, result, index, dropType) => {
    fields.forEach((field) => {
      const registerName = field?.registerName;
      let value = null;

      if (registerName in data) {
        value = data[registerName];
      } else if (registerName && registerName.includes(".")) {
        const keys = registerName.split(".");
        value = keys.reduce((acc, key) => acc?.[key], data);
      } else {
        value = null;
      }

      if (!result[index]) {
        result[index] = {
          id: index,
          dropType,
          fields: [],
        };
      }

      result[index].fields.push({
        id: field.id,
        type: field.type,
        registerName,
        value,
      });

      if (field.fields && Array.isArray(field.fields)) {
        extractFields(field.fields, data, result, index, dropType);
      }
    });
  };

  for (const panelKey in panelsConfig) {
    const panel = panelsConfig[panelKey];

    panel.panelData.forEach((data, index) => {
      const fields = formFields[data.id]?.fields;
      if (fields) {
        extractFields(fields, data, result, index, data.id);
      }
    });
  }

  return Object.values(result);
};
