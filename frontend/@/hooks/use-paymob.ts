import axios from "axios";

const postFirstStep = async (data: { api_key: string }) => {
  return await axios.post(process.env.PAYMOB_FIRST_STEP_URL, data);
};

const postSecondStep = async (data: any) => {
  return await axios.post(process.env.PAYMOBSECOND_STEP_URL, data);
};

const postThirdStep = async (data: any) => {
  return await axios.post(process.env.PAYMOBTHIRD_STEP_URL, data);
};

export const firstStep = async (apiKey: string) => {
  try {
    const response = await postFirstStep({ api_key: apiKey });
    const token = response.data.token;
    console.log(token);
    secondStep(token);
  } catch (error) {
    if (error?.response && error?.response.status === 401) {
      console.log("error at step one", error);
    }
  }
};

const secondStep = async (token: string) => {
  try {
    const response = await postSecondStep({
      auth_token: token,
      delivery_needed: "false",
      amount_cents: "100",
      currency: "EGP",
      items: [],
    });
    const id = response.data.id;
    thirdStep(token, id);

    console.log({ id: id, token: token });
  } catch (error) {
    if (error?.response && error?.response.status === 401) {
      console.log("error at step two", error);
    }
  }
};

const thirdStep = async (token: string, id: string) => {
  try {
    const response = await postThirdStep({
      auth_token: token,
      amount_cents: "100",
      expiration: 3600,
      order_id: id,
      billing_data: {
        first_name: "Ali",
        last_name: "Mohamed",
        email: "claudette09@exa.com",
        phone_number: "+86(8)9135210487",
        floor: "NA",
        apartment: "NA",
        street: "NA",
        building: "NA",
        shipping_method: "NA",
        postal_code: "NA",
        city: "NA",
        country: "NA",
        state: "NA",
      },
      currency: "EGP",
      integration_id: 2982902,
    });

    const paymentToken = response.data.token;
    paymentIfram(paymentToken);
    console.log(paymentToken);
  } catch (error) {
    if (error?.response && error?.response.status === 401) {
      console.log("error at step three", error);
    }
  }
};

async function paymentIfram(token: string) {
  const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/690653?payment_token=${token}`;
  window.open(iframeUrl);
}

export function paymobHandler(api_key) {
  firstStep(api_key);
}
