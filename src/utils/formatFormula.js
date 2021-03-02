// 格式化分子式
function formatFormula(value) {
  let arr = [];
  if (value) {
    arr = value.split('');
  }
  return arr.map((item, index) => {
    if (!Number.isNaN(Number(item))) {
      return <sub key={index}>{item}</sub>;
    }
    return <span key={index}>{item}</span>;
  });
}

export default formatFormula;
