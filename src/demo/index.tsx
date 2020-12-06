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
        <view>点击次数：</view>
        <view style={{color: '#f00'}}>{count}</view>
      </view>
    </view>
  );
}
