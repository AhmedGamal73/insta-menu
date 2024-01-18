const LongText = (text: string, limit: number) => {
  if (text.length > limit) {
    return text.slice(0, limit) + "...";
  } else {
    return text;
  }
};

export default LongText;
