import { APIGatewayProxyEventV2 } from 'aws-lambda';

export const createApiGatewayEvent = (input?: Partial<APIGatewayProxyEventV2>): APIGatewayProxyEventV2 => {
  return {
    version: input?.version ?? '2.0',
    routeKey: input?.routeKey ?? 'POST /',
    rawPath: input?.rawPath ?? '/',
    rawQueryString: input?.rawQueryString ?? '',
    headers: input?.headers ?? {},
    requestContext: {
      accountId: input?.requestContext?.accountId ?? 'accountId',
      apiId: input?.requestContext?.accountId ?? 'apiId',
      domainName: input?.requestContext?.domainName ?? 'domainName',
      domainPrefix: input?.requestContext?.domainPrefix ?? 'domainPrefix',
      http: {
        method: input?.requestContext?.http.method ?? 'POST',
        path: input?.requestContext?.http.path ?? '/',
        protocol: input?.requestContext?.http.protocol ?? 'HTTP/1.1',
        sourceIp: input?.requestContext?.http.sourceIp ?? '79.112.55.139',
        userAgent: input?.requestContext?.http.userAgent ?? 'PostmanRuntime/7.36.0',
      },
      requestId: input?.requestContext?.requestId ?? 'REsBIgdUDoEEPvw=',
      routeKey: input?.requestContext?.routeKey ?? 'POST /',
      stage: input?.requestContext?.stage ?? '$default',
      time: input?.requestContext?.time ?? '05/Jan/2024:15:57:07 +0000',
      timeEpoch: input?.requestContext?.timeEpoch ?? 1704470227795,
    },
    body: input?.body ?? '',
    isBase64Encoded: input?.isBase64Encoded ?? false,
  };
};
