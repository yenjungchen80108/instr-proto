export const instrConfigToFormFields = (panelsConfig, formFields) => {
  const result = {};

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

        // 根據 index 分組
        const dropType = data.id;
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
      });
    });
  }

  return Object.values(result);
};
