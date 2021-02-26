
function createModuleIdFactory() {
  
  if (process.env.NODE_ENV1 != 'prod') { // debug模式
    const fileToIdMap = new Map();
    let nextId = 0;
    return path => {
      let id = fileToIdMap.get(path);
      if (typeof id !== 'number') {
        id = nextId++;
        fileToIdMap.set(path, id);
      }
      return id;
    };
  } else { // 生产打包使用具体包路径代替id，方便拆包处理
    // 定义项目根目录路径
    const projectRootPath = `${process.cwd()}`;
    // path 为模块路径名称
    return path => {
      let moduleName = '';
      if(path.indexOf('node_modules\\react-native\\Libraries\\') > 0) {
          moduleName = path.substr(path.lastIndexOf('\\') + 1);
      } else if(path.indexOf(projectRootPath)==0){
          moduleName = path.substr(projectRootPath.length + 1);
      }
  
      moduleName = moduleName.replace('.js', '');
      moduleName = moduleName.replace('.png', '');
      moduleName = moduleName.replace('.jpg', '');
      moduleName = moduleName.replace(/\\/g, '_'); // 适配Windows平台路径问题
      moduleName = moduleName.replace(/\//g, '_'); // 适配macos平台路径问题
  
      return moduleName;
    };
  }
  
}

module.exports = {
  serializer: {
    createModuleIdFactory: createModuleIdFactory
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
