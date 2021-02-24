package com.awesomeproject1;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.microsoft.codepush.react.CodePush;
// import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        // 注意这一段在 ReactNativeHost 内部！
        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }
        // @Override    
        // public boolean canOverrideExistingModule() {        
        //   return true;    
        // } 

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new AsyncStoragePackage());
          // packages.add(new RNGestureHandlerPackage());
          // packages.add(new CodePush("EaFpkEuzrPWACwkBgKkPFdfqzvgI4ksvOXqog", MainApplication.this, BuildConfig.DEBUG, "http://114.55.94.132:3000"));
          packages.add(
            new CodePush(
              getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), 
              getApplicationContext(), BuildConfig.DEBUG, 
              getResources().getString(R.string.reactNativeCodePush_androidServerURL)
            )
          );
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
