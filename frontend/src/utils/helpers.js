export const getFriendlyErrorMessage = (err) => {
    if (err.response) {
      const { status } = err.response;
      if (status === 400) return "Invalid request. Please check your text.";
      if (status === 429) return "Too many requests. Try again in a moment.";
      if (status >= 500) return "Server error. Please try later.";
      return "Something went wrong. Try again.";
    }
    if (err.request) return "Network error. Check your connection.";
    return "Unexpected error. Please retry.";
  };
  
  export const getToneDesc = (v) => {
    if (v <= 15) return "Very Formal";
    if (v <= 35) return "Formal";
    if (v <= 45) return "Slightly Formal";
    if (v <= 55) return "Neutral";
    if (v <= 65) return "Slightly Casual";
    if (v <= 85) return "Casual";
    return "Very Casual";
  };
  