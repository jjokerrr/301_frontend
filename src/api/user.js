// 登录接口
export function login(data) {
  let flag = 0;
  if(data.password == "123456" && data.username == "admin") {
    flag = 1;
  }
  const mock = {
    code: 9999,
    msg: '测试数据',
    data: {
      flag: flag,
    }
  };
  return new Promise((resolve) => {
      resolve(mock);
  })
}