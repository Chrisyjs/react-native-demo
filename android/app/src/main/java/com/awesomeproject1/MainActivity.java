package com.awesomeproject1;
 
import android.content.Intent;
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends Activity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // 原生页面布局 ./res.layout.activity_main.xml
        setContentView(R.layout.activity_main);
 
        // 找到按钮控件
        Button button = findViewById(R.id.btn_go);
 
        // 匿名内部类方式设置点击事件
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 跳转到 rn 页面
                startActivity(new Intent(MainActivity.this, RNActivity.class));
            }
        });
    }
}