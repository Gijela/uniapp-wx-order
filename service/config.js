// 生成微信Id
function generateWeChatIDs() {
  let weChatIDs = [];
  for (let i = 0; i < 30; i++) {
    let weChatID =
      Math.random().toString(36).substr(2, 3) +
      "*****" +
      Math.random().toString(36).substr(2, 3);
    weChatIDs.push(weChatID);
  }
  return weChatIDs;
}

// mock 数据
export function mockData() {
  const arr = [
    {
      title: `聊天训练营 - 第 15 期`,
      subTitle: "已结束",
      key: 15,
      pastTimeData: generateWeChatIDs(),
      endTime: `2024.3.20`,
    },
    {
      title: `聊天训练营 - 第 14 期`,
      subTitle: "已结束",
      key: 14,
      pastTimeData: generateWeChatIDs(),
      endTime: `2024.2.20`,
    },
    {
      title: `聊天训练营 - 第 13 期`,
      subTitle: "已结束",
      key: 13,
      pastTimeData: generateWeChatIDs(),
      endTime: `2024.1.20`,
    },
  ];
  for (let i = 12; i > 0; i--) {
    arr.push({
      title: `聊天训练营 - 第 ${i} 期`,
      subTitle: "已结束",
      key: i,
      pastTimeData: generateWeChatIDs(),
      endTime: `2023.${i}.20`,
    });
  }
  return arr;
}
