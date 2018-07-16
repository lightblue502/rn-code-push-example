# RUN React Native with CodePush

### Setup CodePush 
```
    > npm install -g appcenter-cli
    > appcenter login
        ? Enable telemetry [Y]
        ? Access code from browser:  <token from appcenter>
```



### Setup ReactNative  [_readme_](https://facebook.github.io/react-native/docs/getting-started.html)
```
    > choco install -y nodejs.install python2 jdk8
    > npm install -g react-native-cli 
```


# Create Project
1. Create react-native project <appName>
    ```
    > react-native init <appName>
    > cd <appName>
    > npm install --save react-native-code-push
    ```
2. Create Add Project to CodePush
    ```
    > appcenter apps create -d <appDisplayName> -o <operatingSystem>  -p <platform> 
    ```
    ```
    //Android
    > appcenter apps create -d <appName>-Android -o Android -p React-Native

    //iOS
    > appcenter apps create -d <appName>-iOS -o iOS -p React-Native
    ```

    ``` 
    > appcenter codepush deployment add -a <ownerName>/<appName>-Android <devName>
    > appcenter codepush deployment list -a <ownerName>/<appName>-Android
        ┌───────────────┬───────────────────────────────────────┐
        │ Name          │ Key                                   │
        ├───────────────┼───────────────────────────────────────┤
        │ <devName>     │ <DEVELOPMENT_KEY>                     │
        └───────────────┴───────────────────────────────────────┘       
    ```
3.  set current app 
    ```
    > appcenter apps set-current <ownerName>/<appName>
    ```
4. Link Project with RNPM  (As of v0.27 of React Native)
    ```
    > react-native link react-native-code-push
        ? What is your CodePush deployment key for Android (hit <ENTER> to ignore) <DEVELOPMENT_KEY>
    ```
5. Usage Code Push
    + add hoc codePush
    ```javascript
        import codePush from "react-native-code-push";

        class App extends Component {
        }

        export default codePush(App);
        //default check for updates on every app start. If an update is available
    ```
    + custom with optional
    ```javascript
        let codePushOptions = { 
            checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, 
            installMode: codePush.InstallMode.ON_NEXT_RESUME
        };

        class App extends Component {
        }

        export default codePush(codePushOptions)(App);
        // server every time the app resumes from the background.
    ```
    + manual
    ```javascript
        let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

        class MyApp extends Component {
            onButtonPress() {
                codePush.sync({
                    updateDialog: true,
                    installMode: codePush.InstallMode.IMMEDIATE
                });
            }

            render() {
                return (
                    <View>
                        <TouchableOpacity onPress={this.onButtonPress}>
                            <Text>Check for updates</Text>
                        </TouchableOpacity>
                    </View> 
                )
            }
        }

        export default codePush(codePushOptions)(MyApp);
    ```
6. Target any new releases at that custom deployment
    ```
    appcenter codepush release-react -a <ownerName>/<appName> -d <devName> --description <description>
    ```
--------------

## Rollback
+ rollback lasted release
    ```
    appcenter codepush rollback -a <ownerName>/<appName> <devName>
    ```

+ specific target-release
    ```
    appcenter codepush rollback -a <ownerName>/<appName> <devName> --target-release v34 
    ```
## History
+ Show History 
    ```
    appcenter codepush deployment history Staging
    ```
    > history of the 50 most recent
+ Clear History

    ```
    appcenter codepush deployment clear -a <ownerName>/<appName> <deploymentName>
    ```
    > This command is irreversible, and therefore should not be used in a production deployment.



# Fix Bug ReactNative@0.56.0
```
yarn remove react-native babel-preset-react-native
yarn add react-native@0.55.4
yarn add -D babel-preset-react-native@2.1.0
```

# Resource
+ https://docs.microsoft.com/en-us/appcenter/distribution/codepush/react-native#getting-started
+ https://facebook.github.io/react-native/docs/getting-started.html