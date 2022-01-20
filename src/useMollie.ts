/* eslint-disable camelcase, @typescript-eslint/camelcase */
import axios from 'axios';
import { getExtensionProxyUrl } from './configuration';

const useMollie = () => {
  const makePayment = async ({
    amount = null,
    currency = null,
    orderId = null,
    userId = null,
  } = {}) => {
    const paymentData = {
      amount,
      currency,
      orderId,
      userId,
    };

    try {
      const { data } = await axios.post(getExtensionProxyUrl(), paymentData);
      return data;
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.error(err.response.data);
      }
      return null;
    }
  };

  return {
    makePayment,
  };
};
export default useMollie;
