import { notification } from "antd";

interface INotification {
  type: "success" | "info" | "warning" | "error";
  message: string;
  description?: string;
}

export const useNotify = () => {
  const [notificationApi, contextholderNotification] =
    notification.useNotification();

  const openNotification = ({ type, message, description }: INotification) => {
    notificationApi[type]({
      message: message,
      description,
      placement: "top",
      duration: 3,
    });
  };

  return { openNotification, contextholderNotification };
};
