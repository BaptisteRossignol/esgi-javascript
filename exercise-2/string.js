function type_check_v1(variable, type) {
    const typeOfVariable = typeof variable;
    switch (typeOfVariable) {
      case "object":
        switch (type) {
          case "null":
            return variable === null;
          case "array":
            return Array.isArray(variable);
          case "object":
            return variable !== null && !Array.isArray(variable);
          default:
            return false;
        }
      default:
        return typeOfVariable === type;
    }
}

const conf = {
    type: "number",
};

function type_check_v2(value, conf) {
    for (key in conf) {
      switch (key) {
        case "type":
          if (!type_check_v1(value, conf.type)) return false;
          break;
        case "value":
          if (JSON.stringify(value) !== JSON.stringify(conf.value)) return false;
          break;
        case "enum":
          let found = false;
          for (subValue of conf.enum) {
            found = type_check_v2(value, { value: subValue });
            if (found) break;
          }
          if (!found) return false;
          break;
      }
    }
  
    return true;
}


function type_check(data, config) {
    if (type_check_v1(data, config.type)) {
        if (config.hasOwnProperty("properties")) {
            for (key in config.properties) {
                if (config.properties[key].hasOwnProperty("properties") && !type_check(data[key], config.properties[key]) 
                || !type_check_v2(data[key], config.properties[key])) {
                    return false; 
                }
            }
        } else if (!type_check_v2(data, config)) return false;

        return true;
    }

    return false;
}


// Jeu de tests pour type_check
console.log(type_check(1, { type: "number", value: 1 }) === true);
console.log(type_check(1, { type: "number", value: 3 }) === false);
console.log(type_check(1, { type: "object", value: 1 }) === false);
console.log(
  type_check("string", { type: "string", enum: ["string1", "string2"] }) ===
    false
);
console.log(
  type_check({ bar: "foo" }, { type: "object", value: { bar: "foo" } }) === true
);
console.log(
  type_check({ bar: "foo" }, { type: "object", value: { bar: "value" } }) ===
    false
);
console.log(
  type_check(
    {
      toto: {
        fi: 3,
        fa: {
          trim: " test ",
        },
      },
    },
    {
      type: "object",
      properties: {
        toto: {
          type: "object",
          properties: {
            fi: { value: 3 },
            fa: { enum: [3, "string", { trim: " test " }] },
          },
        },
      },
    }
  ) === true
);
