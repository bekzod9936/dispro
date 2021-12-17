import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { setFcm } from 'services/queries/authQuery';
import { deviceDetect, getUA } from 'react-device-detect';
import { useAppSelector } from 'services/redux/hooks';

const useFcm = () => {
  const fToken: any = localStorage.getItem('fcmToken');
  const fcmToken = useAppSelector((state) => state.firebaseSlice.fcmToken);
  const deviceId = deviceDetect(getUA)?.userAgent;
  const fcmSetting = useMutation((data: any) => setFcm(data), {
    onSuccess: (data) => {
      // console.log(data.data, "data set fcm");
    },
  });

  useEffect(() => {
    if (fToken !== null) {
      fcmSetting.mutate({
        fcmToken: fcmToken || fToken,
        deviceId: deviceId,
      });
    }
  }, [fToken]);

  return {
    fcmSetting,
  };
};

export default useFcm;
