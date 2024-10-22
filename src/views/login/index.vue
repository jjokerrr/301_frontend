<template>
  <div class="mainlogin">
    <div class="login-container" v-show="loginVisible">
      <div class="login-area">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on"
          label-position="left" v-show="showLogin">
          <div style="height: 200px;"></div>
          <div class="login-img">
            <div class="login-con">
              <el-form-item prop="username">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input ref="username" v-model.trim="loginForm.username" placeholder="用户名" name="username" type="text"
                  tabindex="1" autocomplete="on" />
              </el-form-item>

              <el-tooltip v-model="capsTooltip" content="长度为6-14个字符" effect="light" placement="right" manual>
                <el-form-item prop="password">
                  <span class="svg-container">
                    <svg-icon icon-class="password" />
                  </span>
                  <el-input :key="passwordType" ref="password" v-model.trim="loginForm.password" :type="passwordType"
                    placeholder="密码" name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock"
                    @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
                </el-form-item>
              </el-tooltip>

              <el-button :loading="loading" type="primary" style="
                      width: 100%;
                      margin-bottom: 30px;
                      height: 44px;
                      font-size: 16px;
                  " @click.native.prevent="handleLogin">登 录</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
  
<script lang="js">
// import { validusername } from "@/utils/validate";
// import SocialSign from "./components/SocialSignin";
import { login, adornUrl } from "@/api/user";
import Bus from '../EventBus/eventBus.js'

export default {
  name: "userLogin",
  // components: { SocialSign },
  data() {
    const validateusername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("请填写用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("请填写密码"));
      } else {
        callback();
      }
    };
    return {
      // 登录
      showLogin: true,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateusername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      oldRoles: localStorage.getItem("roles"),
      usernameOld: localStorage.getItem("usernameOld"),
      loginVisible: false,
      loadingAll: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
        }
      },
      immediate: true,
    },
  },
  created() { },
  mounted() {
    this.singleLogin();

    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    singleLogin() {
      const param = this.$route.query;
      console.log(this.$route, "iuu");
      // 判断是否包含token参数
      if (param && param.token) {
        const token = param.token;
        var path = param.path;
        if (!path) {
          path = "resourceManagent";
        }
        this.$nextTick(() => {
          this.loadingAll = true;
          this.loginVisible = false;
          let that = this;
          setTimeout(function () {
            that.ssoSubmit(token, path);
          }, 500);
        });
      } else {
        // 没有token参数，显示登录界面，走自身的登录界面
        this.$nextTick(() => {
          this.loadingAll = false;
          this.loginVisible = true;
        });
      }
    },
    /***
     * sso 登录
     * @param token
     * @param path
     */
    ssoSubmit(token) {
      adornUrl(token).then(({ data }) => {
        if (data && data.code === 0) {
          this.$store.commit("user/SET_NAME", data.username);
          this.$store
            .dispatch("user/sso", {
              token: data.authorization,
              expire: data.expire,
            })
            .then(() => {
              this.$router.replace({ name: "resourceManagent" });
            });
        } else {
          this.loginVisible = true;
          this.$message({
            showClose: true,
            message: data.msg.message,
            type: "error",
          });
        }
      });
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = false;

          login(this.loginForm).then((res) => {

            console.log("login res", res);
            // 登录成功
            if (res.data.flag == 1) {
              // localStorage.setItem("userName", res.data.data.userName);
              // document.cookie = `operatorId=${res.data.data.id}`;
              // this.$router.push({
              //   path: "@views/pages/choseSystem/index.vue",
              // });
              Bus.$emit("nowSystemIndexBus", { SystemIndex: 1 })
              this.$router.push({
                path: '/systemChoose',
              });
              return;
            }
            this.loading = false;
          })
            .catch(() => {
              this.loading = false;
              this.$message({
                showClose: true,
                message: "用户名、密码或登入角色错误！",
                type: "error",
              });
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
  
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #000;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.mainlogin .el-loading-parent--relative {
  top: 50%;
}

.login-container .el-input input {
  height: 50px !important;
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 50px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      // -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 50px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #1a3a65 inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-radio {
    height: 50px;
  }

  .el-form-item {
    border: 1px solid #699dff;
    background: #ffffff;
    border-radius: 5px;
    color: $cursor;
    height: 50px;
  }
}
</style>
  
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.mainlogin {
  // background-color: #041A54;
  background: url(../../assets/login/loginBG.png);
  opacity: 1;
  background-size: cover;
  height: 100vh;
  min-width: 1500px;
  min-height: 750px;
}

.login-container {
  // background: url("~@/assets/images/login-bg.png") no-repeat center center;
  background-size: 100% 100%;

  height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;

  .login-area {
    height: 100%;
    width: 100%;
  }

  .login-form {
    position: relative;
    width: 700px;
    max-width: 100%;
    padding-top: 10%;
    margin: 0 auto;
    overflow: hidden;
  }

  .login-img {
    width: 700px;
    height: 300px;
    // border: 1px solid #2c4472;
  }

  .login-con {
    // width: 354px;
    height: 100%;
    padding: 36px 58px;

    .el-button--primary {
      background: #1890ff !important;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 1px 5px 6px 15px;
    color: #000;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .resister {
    float: right;
    position: relative;
    bottom: 20px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
  }

  .title-container {
    h3 {
      display: inline-block;
      width: 388px;
      height: 46px;
      // background: url(../../assets/login-logo.png) no-repeat 0 0px;
      position: relative;
      left: 35px;
      top: 20px;
      // background-size: 38px;
      // overflow: hidden;
    }

    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .platformTitle {
    height: 50px;
    font-size: 40px;
    color: #fff;
    //font-style: italic;
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 10px;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }

  // 滑动验证结束
}
</style>
  