import React, {useState} from 'react';

declare const wx: any;

export default function Demo() {
  const [count, setCount] = useState(1);

  function onClick() {
    wx.showToast({
      title: `点击次数：${count}`
    });
    setCount(count + 1);
  }

  return (
    <view className="container">
      <button className="btn" onClick={onClick}>点击一下</button>
      <view className="body">
        <text>点击次数：</text>
        <text style={{color: '#f00'}}>{count}</text>
      </view>
    </view>
  );
}
