import crypto from "crypto";
import axios from "axios";

// Generate payment hash
export const getEsewaPaymentHash = ({ total_amount, transaction_uuid }) => {
  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE}`;

  const secretKey = process.env.ESEWA_SECRET_KEY;
  const hash = crypto
    .createHmac("sha256", secretKey)
    .update(message)
    .digest("base64");

  return {
    signature: hash,
    signed_field_names: "total_amount,transaction_uuid,product_code",
  };
};

// Verify payment
export const verifyEsewaPayment = async (req) => {
  try {
    // ✅ eSewa sends `data` in query
    const { data: encodedData } = req.query;

    if (!encodedData) throw new Error("Missing encoded data from eSewa");

    // ✅ Decode base64
    const decodedData = JSON.parse(
      Buffer.from(encodedData, "base64").toString("utf8")
    );

    // ✅ Recalculate hash
    const message = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE},signed_field_names=${decodedData.signed_field_names}`;

    const hash = crypto
      .createHmac("sha256", process.env.ESEWA_SECRET_KEY)
      .update(message)
      .digest("base64");

    if (hash !== decodedData.signature) {
      throw new Error("Invalid signature");
    }

    // ✅ Double-check with eSewa transaction status API
    const response = await axios.get(
      `${process.env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/`,
      {
        params: {
          product_code: process.env.ESEWA_PRODUCT_CODE,
          total_amount: decodedData.total_amount,
          transaction_uuid: decodedData.transaction_uuid,
        },
        headers: { Accept: "application/json" },
      }
    );

    if (
      response.data.status !== "COMPLETE" ||
      response.data.transaction_uuid !== decodedData.transaction_uuid ||
      Number(response.data.total_amount) !== Number(decodedData.total_amount)
    ) {
      throw new Error("Transaction validation failed");
    }

    return { response: response.data, decodedData };
  } catch (error) {
    throw error;
  }
};
