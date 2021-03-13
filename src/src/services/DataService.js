import axios from "axios";


// export const login = (uid, pwd, callback) => {
//     fetch(`/php/login.php?id=${uid}&pwd=${pwd}`).then(data => data.json()).then(res => {
//       // console.log('getUser:', res);
//       if (res.result) {
//         // localStorage.setItem('userInfo', JSON.stringify(res.user));
//       }
//       if (callback) callback(res);
//     });
//   };
  
//   // export const getUserInfo = (uid, callback) => {
//   //   axios.get(`/php/getUser.php?userid=${uid}`, config).then(res => {
//   //     if (callback) callback(res.data);
//   //   })
//   // };
  
//   export const signup = (data, callback) => {
//     const formData = new FormData();
//     Object.keys(data).forEach(key => formData.append(key, data[key]));
//     axios.post(`/php/signup.php`, formData).then(res => {
//       // console.log('putUser:', res.data);
//       // getUserInfo(data.id, () => {
//       //   // console.log('pass')
//       // }, true);
//       if (callback) callback(res.data);
//     });
  
//   };
  