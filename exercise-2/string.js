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

// Type_check_v1
console.log(type_check_v1(1, "number"));

// Type_check_v2
console.log(type_check_v2({prop1:1}, {type:"object"}));
console.log(type_check_v2("foo", {type: "string", value: "foo"}));
console.log(type_check_v2("bar", {type: "string", value: "foo"}));
console.log(type_check_v2(3, {enum: ["foo", "bar", 3]}));
