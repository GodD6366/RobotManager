import type { NextApiRequest } from 'next';
import { MyNextApiResponse, nc, RobotTypeService } from '../../../../service';

export default nc().get(async (req: NextApiRequest, res: MyNextApiResponse) => {
  const robotTypes = await RobotTypeService.queryAll();
  return res.success(robotTypes);
});
