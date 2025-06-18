
export const handleAppRedirection = (data: { type: string; dataJson?: string }) => {
  const json = JSON.parse(data.dataJson || '{}');

  switch (data.type) {
    case "ApplicationStatus":
      return { screen: 'applied', params: { appId: json.ApplicationId } };

    case "Message":
      return { screen: 'notifications', params: { messageId: json.MessageId } };

    case "Recommendation":
      return { screen: 'jobs' };

    case "CompleteProfile":
      return { screen: 'profile' };

    default:
      return { screen: 'notifications' };
  }
};



export default handleAppRedirection;
