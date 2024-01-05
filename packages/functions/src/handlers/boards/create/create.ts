import z from 'zod';
import { ApiHandler, useJsonBody } from 'sst/node/api';

import { ErrorResponse, SuccessResponse } from '@kanban-app/functions/shared/ApiResponse';

const createData = z.object({
  name: z.string().min(1).max(30),
});

export const handler = ApiHandler(async (_evt) => {
  try {
    const req = createData.parse(useJsonBody());

    return new SuccessResponse(req);
  } catch (error) {
    return new ErrorResponse(error);
  }
});
