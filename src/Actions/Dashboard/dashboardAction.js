import { formatDate } from "../../functions/formatDate";
import { notifyMessage } from "../../functions/toastMessage";
import {
  setDashboardLoading,
  setDashboardPermissionData,
  setDashboardReportPrint,
  setDashboardSummary,
  setDashboardSummaryDetail,
  setDashboardTotal,
  setPrintLoading,
} from "../../redux/dashboardSlices/DashboardSlice";
import dashboardService from "../../services/dashboardService";
import * as Device from "expo-device";

export const getDashboardPermission = () => async (dispatch) => {
  const body = {};

  try {
    dispatch(setDashboardLoading(true));

    const response = await dashboardService.getDashboardPermission(body);
    dispatch(setDashboardPermissionData(response?.data?.Data));
    // console.log("Dashboard Permission data : ", response?.data?.Data);
    dispatch(setDashboardLoading(false));
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.ErrorMessage
    ) {
      notifyMessage(error.response.data.ErrorMessage);
    } else {
      // notifyMessage("Unexpected Error in get year duration API.");
    }
    dispatch(setDashboardLoading(false));
  } finally {
    dispatch(setDashboardLoading(false));
  }
};

export const getDashboardTotal = (syskey) => async (dispatch) => {
  const date = new Date();
  const formatedDate = date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");
  const body = {
    Report_Id: 0,
    IntSYSKey: syskey,
    DashBD_Dt: formatedDate,
    StrDeviceID: Device.osBuildId,
  };
  try {
    dispatch(setDashboardLoading(true));
    const response = await dashboardService.getDashboardTotal(body);
    // const data = { data: response?.data?.Data?.Table, syskey: syskey };

    // console.log(
    //   "Dashboard Total Data API Response  : ",
    //   response?.data?.Data?.Table
    // );

    dispatch(setDashboardTotal(response?.data?.Data?.Table));
    dispatch(setDashboardLoading(false));
  } catch (error) {
    if (error?.response?.data?.ErrorMessage) {
      notifyMessage(error.response.data.ErrorMessage);
    } else {
      // notifyMessage("Unexpected Error in get year duration API.");
    }
    dispatch(setDashboardLoading(false));
  } finally {
    dispatch(setDashboardLoading(false));
  }
};

export const getDashboardSummary = (type) => async (dispatch) => {
  const date = new Date();
  const formatedDate = date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  const body = {
    IntReportId: 0,
    FromDate: formatedDate,
    ToDate: formatedDate,
    type: type,
    FilterString: "",
  };

  try {
    dispatch(setDashboardLoading(true));
    dispatch(setDashboardSummary([]));
    const response = await dashboardService.getDashboardSummary(body);
    dispatch(setDashboardSummary(response?.data?.Data));
    dispatch(setDashboardLoading(false));
  } catch (error) {
    if (error?.response?.data?.ErrorMessage) {
      notifyMessage(error.response.data.ErrorMessage);
    } else {
      // notifyMessage("Unexpected Error .");
    }
    dispatch(setDashboardLoading(false));
  } finally {
    dispatch(setDashboardLoading(false));
  }
};

export const getDashboardSummaryFilter =
  (fromDate, toDate, type, selectedType) => async (dispatch) => {
    // fromDate, toDate, type, filterString
    const formatedFromDate = formatDate(fromDate);
    const formatedToDate = formatDate(toDate);

    const date = new Date();
    const formatedDate = date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");

    const body = {
      IntReportId: 0,
      // FromDate: fromDate ? fromDate : formatedDate,
      // ToDate: toDate ? toDate : formatedDate,
      FromDate: formatedFromDate,
      ToDate: formatedToDate,
      type: type,
      FilterString: selectedType,
    };

    try {
      dispatch(setDashboardLoading(true));
      dispatch(setDashboardSummary([]));
      const response = await dashboardService.getDashboardSummary(body);
      dispatch(setDashboardSummary(response?.data?.Data));
      dispatch(setDashboardLoading(false));
    } catch (error) {
      if (error?.response?.data?.ErrorMessage) {
        notifyMessage(error.response.data.ErrorMessage);
      } else {
        // notifyMessage("Unexpected Error .");
      }
      dispatch(setDashboardLoading(false));
    } finally {
      dispatch(setDashboardLoading(false));
    }
  };

export const getDashboardSummaryDetail =
  (type, accountId, stateFromDate, stateToDate) => async (dispatch) => {
    // const date = new Date();
    // const formatedDate = date
    //   .toLocaleDateString("en-GB", {
    //     day: "2-digit",
    //     month: "2-digit",
    //     year: "numeric",
    //   })
    //   .replace(/\//g, "-");

    const body = {
      IntReportId: 0,
      FromDate: stateFromDate,
      ToDate: stateToDate,
      type: type,
      Account_Id: accountId,
      FilterString: "",
    };

    try {
      dispatch(setDashboardLoading(true));
      const response = await dashboardService.getDashboardSummaryDetail(body);
      dispatch(setDashboardSummaryDetail(response?.data?.Data?.Table));
      dispatch(setDashboardLoading(false));
    } catch (error) {
      if (error?.response?.data?.ErrorMessage) {
        notifyMessage(error.response.data.ErrorMessage);
      } else {
        // notifyMessage("Unexpected Error .");
      }
      dispatch(setDashboardLoading(false));
    } finally {
      dispatch(setDashboardLoading(false));
    }
  };

export const getDashReportPrint = (item) => async (dispatch) => {
  const body = {
    Order_Id: item.OrderId,
    RptFile: item.RptPath,
    RptSelectFormula: item.RptSelectFormula,
    ReportName: item.ReportName,
    CompanyName: "",
    CompanyAddress1: "",
    CompanyAddress2: "",
    CompanyContact: "",
    CompanyPremise: "",
    CompanyGSTCST: "",
  };

  try {
    // dispatch(setDashboardLoading(true));
    dispatch(setPrintLoading(true));
    const response = await dashboardService.getDashReportPrint(body);
    dispatch(setDashboardReportPrint(response?.data?.Data?.ReportPath));
    console.log("file path : ", response?.data?.Data?.ReportPath);
    dispatch(setPrintLoading(false));
  } catch (error) {
    if (error?.response?.data?.ErrorMessage) {
      notifyMessage(error.response.data.ErrorMessage);
    } else {
      // notifyMessage("Unexpected Error .");
    }
    dispatch(setPrintLoading(false));
  } finally {
    dispatch(setPrintLoading(false));
  }
};
