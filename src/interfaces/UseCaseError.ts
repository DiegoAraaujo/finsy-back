type UseCaseError = {
  message: string;
  errorType: string;
  details?: string[] | Record<string, any>;
};

export default UseCaseError;
