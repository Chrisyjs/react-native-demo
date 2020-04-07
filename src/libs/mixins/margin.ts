const margin = {
  margin(...arg: any) {
    let margin = {};
    switch (arg.length) {
      case 1:
        margin = {
          marginTop: arg[0],
          marginRight: arg[0],
          marginBottom: arg[0],
          marginLeft: arg[0],
        };
        break;
      case 2:
        margin = {
          marginVertical: arg[0],
          marginHorizontal: arg[1],
        };
        break;
      case 3:
        margin = {
          marginTop: arg[0],
          marginHorizontal: arg[1],
          marginBottom: arg[2],
        };
        break;
      case 4:
        margin = {
          marginTop: arg[0],
          marginRight: arg[1],
          marginBottom: arg[2],
          marginLeft: arg[3],
        };
        break;
      default:
        break;
    }
    return margin;
  }
}
export default margin;