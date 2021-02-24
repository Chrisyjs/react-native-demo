import React,{ Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Modal, SafeAreaView } from 'react-native';
import CodePush from "react-native-code-push";
 
class App extends Component {
 
  state = {
    metaData: {},
    progressVisible: false,
    current: 0,
    total: 100
  }
 
  
 
  componentDidMount() {
    // CodePush.restartApp()
    this.codePushsync()
    this.getUpdateMetadata()
  }
  async getUpdateMetadata() {
    const data = await CodePush.getUpdateMetadata();
    this.setState({
      metaData: data
    })
  }
  codePushsync() {
    CodePush.sync({
      //安装模式
      //ON_NEXT_RESUME 下次恢复到前台时
      //ON_NEXT_RESTART 下一次重启时
      //IMMEDIATE 马上更新
      installMode: CodePush.InstallMode.IMMEDIATE,
      //对话框
      updateDialog: {
        //是否显示更新描述
        appendReleaseDescription: true,
        //更新描述的前缀。 默认为"Description"
        descriptionPrefix: "更新内容：",
        //强制更新按钮文字，默认为continue
        mandatoryContinueButtonLabel: "立即更新",
        //强制更新时的信息. 默认为"An update is available that must be installed."
        mandatoryUpdateMessage: "必须更新后才能使用",
        //非强制更新时，按钮文字,默认为"ignore"
        optionalIgnoreButtonLabel: '稍后',
        //非强制更新时，确认按钮文字. 默认为"Install"
        optionalInstallButtonLabel: '后台更新',
        //非强制更新时，检查到更新的消息文本
        optionalUpdateMessage: '有新版本了，是否更新？',
        //Alert窗口的标题
        title: '更新提示'
      },
    },
      // codePushStatusDidChange
      (status) => {
        console.log(status, 'status')
        if (status == 7) {  // 正在从 codepush 服务器下载可用更新
          this.setState({ progressVisible: true })
        }
      },
      // codePushDownloadDidProgress
      (progress) => {
        let receivedBytes = progress.receivedBytes / 1024 / 1024;
        let totalBytes = progress.totalBytes / 1024 / 1024;
        this.setState({
          current: receivedBytes,
          total: totalBytes
        })
        if (receivedBytes >= totalBytes) {
          this.setState({
            progressVisible: false
          })
        }
      }
    );
  }
  render() {
    const { metaData, current, total, progressVisible } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity style={styles.button} onPress={() => this.codePushsync()}><Text>检查更新2017</Text></TouchableOpacity>
        {progressVisible && <Text>热更新进度：{current} / {total}</Text>}
        <MetaDataBox {...metaData} />
      </SafeAreaView>
    )
  }
};
 
let codePushOptions = {
  //设置检查更新的频率
  //ON_APP_RESUME APP恢复到前台的时候
  //ON_APP_START APP开启的时候
  //MANUAL 手动检查
  checkFrequency: CodePush.CheckFrequency.MANUAL
};
 
export default CodePush(codePushOptions)(App);

const MetaDataBox = props => {
  const {
    downloadUrl,
    appVersion,
    isFirstRun,
    label,
    description,
    packageHash,
    packageSize,
  } = props || {};
  if (!appVersion) {
    return <Text>首次热更</Text>;
  }
  return (
    <View style={{marginTop: 10}}>
      <Text>--- 当前热更新数据 ---</Text>
      <Text>{`App版本：${appVersion}`}</Text>
      <Text>{`描述：${description}`}</Text>
      <Text>{`下载路径：${downloadUrl}`}</Text>
      <Text>{`热更版本：${label}`}</Text>
      <Text>{`更新安装后是否第一次运行：${isFirstRun}`}</Text>
      <Text style={{color: 'red'}}>
        {`包大小：${packageSize / 1024 / 1024}M`}
      </Text>
      <Text>{`hash：${packageHash}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    paddingBottom: 16,
  },
  button: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'yellow',
    borderRadius: 5,
    marginTop: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 6,
  },
});
