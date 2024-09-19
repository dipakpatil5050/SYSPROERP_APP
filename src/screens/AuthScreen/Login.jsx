import React, { useState } from "react";
import { scale, moderateScale } from "react-native-size-matters";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { images } from "../../constants/images";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import CustomBtn from "../../componenets/CustomBtn";
import { login, setUserData } from "../../redux/authSlices/AuthSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyle } from "../../constants/commonStyle";
import TextInputwithLogo from "../../componenets/TextInputwithLogo";
import { CommonActions } from "@react-navigation/native";
import { Icon } from "../../constants/Icon";
import { constant } from "../../constants/constant";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useDispatch();
  const userMpinData = useSelector((state) => state.auth.mpinData);
  const ServerBaseUrl = userMpinData?.ServerBaseUrl;
  const mPin = userMpinData?.mPin;

  const [errors, setErrors] = useState({
    username: null,
    password: null,
  });

  const navigate = (tab) => {
    return navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: tab }],
      })
    );
  };

  const checkTextInputValidation = () => {
    if (!username.trim()) {
      alert("Please Enter Username");
      return;
    }
    if (!password.trim()) {
      alert("Please Enter Password");
      return;
    }
  };

  const handleLogin = async () => {
    const newErrors = {
      username: username ? null : "Username is required",
      password: password ? null : "Password is required",
    };
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== null);
    // checkTextInputValidation();
    if (!hasErrors) {
      try {
        setIsLoading(true);
        dispatch(
          login({
            username,
            password,
            mPin,
            ServerBaseUrl,
            navigate,
            dispatch,
            setUserData,
          })
        );
        setIsLoading(false);
      } catch (error) {
        console.log("Login error:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <SafeAreaView
      style={[commonStyle.container, { backgroundColor: "#1254a5" }]}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* top container */}
        <View style={{ height: hp(27) }}>
          <View className="mt-8">
            <Text
              className="text-white text-center font-gsemibold"
              style={{ fontSize: hp(6) }}
            >
              {constant.loginScreenTitle1}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="text-white text-center font-glight mt-3"
            >
              {constant.loginScreenTitle2}
            </Text>
          </View>
        </View>
        {/* bottom container */}
        <View
          style={[
            commonStyle.innerContainer,
            {
              height: hp(73),
              backgroundColor: "white",
              justifyContent: "space-between",
            },
          ]}
          className="w-[100%] mt-14 bg-white rounded-t-[26px]"
        >
          <View className="flex-1 p-8">
            <Text className="font-gsemibold text-2xl ml-[-10]">Login</Text>
            <View className="mt-4">
              <TextInputwithLogo
                placeholder="Enter your Username "
                icon={Icon.userNameIcon}
                label="Username"
                value={username}
                errorMessage={errors.username}
                onChangeText={(e) => setUsername(e)}
                customStyle={{ alignSelf: "center" }}
              />
            </View>
            <View className="mt-3">
              <TextInputwithLogo
                placeholder="Enter your Password"
                icon={Icon.passwordIcon}
                label="Password"
                value={password}
                errorMessage={errors.password}
                onChangeText={(e) => setPassword(e)}
                customStyle={{ alignSelf: "center" }}
                secureTextEntry
                rightIcon={true}
                onPress={() => setShowPassword(!showPassword)}
                showPassword={showPassword}
              />
            </View>
          </View>
          <CustomBtn
            disabled={!username || !password}
            isLoading={isLoading}
            titleStyle={{ fontWeight: 600 }}
            title="Log In"
            onPressHandler={handleLogin}
            Customstyle={{
              position: "absolute",
              alignSelf: "center",
              bottom: hp(5),
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loginView: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },
  txt: {
    fontSize: scale(16),
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: moderateScale(10),
    marginVertical: moderateScale(15),
    backgroundColor: "#7c549b",
  },
  bottomLineView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateScale(25),
  },
  loginIconBtnView: {
    // flex: 1,
    width: "32%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: moderateScale(6),
    borderRadius: 3,
  },
  loginBtnIcon: {
    width: scale(20),
    height: scale(20),
    marginRight: moderateScale(5),
  },
  lineStyle: {
    borderWidth: 0.2,
    width: scale(110),
    backgroundColor: "#cacaca",
    borderColor: "#cacaca",
  },
  commonTxt: {
    // color: "#cacaca",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
