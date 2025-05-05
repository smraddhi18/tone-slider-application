import axios from 'axios';

const API_BASE_URL = "http://localhost:3001";

export const rewriteText = async (text, toneValue) => {
  const { data } = await axios.post(`${API_BASE_URL}/api/v1/rewrite`, {
    text,
    toneValue,
  });
  
  if (!data.success) throw new Error(data.error || "Unexpected API error.");
  if (!data.data?.rewrittenText) throw new Error("Invalid response format.");
  
  return data.data.rewrittenText;
};
