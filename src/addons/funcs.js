const getName = (fullName, type) => {
  switch (type) {
    case 'long':
      return fullName[0];
    case 'short':
    default:
      return fullName[1];
  };
};

const getKey = (name = 'item', element = '') => {
  const isBoolean = value => !!value === value;
  const isNull = value => value === null;

  let key = [name];

  if (typeof element === 'object') {
    for (let attr in element) {
      if (!isBoolean(element[attr]) && !isNull(element[attr])) {
        key.push(attr, element[attr]);
      };
    };
  } else {
    key.push(name, element);
  }

  key = key.join('-');

  return key;
};

export {
  getName,
  getKey,
};
