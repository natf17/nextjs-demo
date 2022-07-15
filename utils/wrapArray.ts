function wrapArray<T>(arr: Array<T>, index: number) {
  const arrLength = arr.length;

  if (index < 0) {
    throw new Error("Array index must be greater than 0");
  } else {
    return arr[index % arrLength];
  }
}

export default wrapArray;
