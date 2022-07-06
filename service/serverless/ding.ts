import { DingRobot } from 'dingding-robot';
import { RobotService } from '../db';

export async function sendMessageToDing(text: string, groupId: number) {
  const robot = await RobotService.query({
    groupId,
    robotTypeId: 2,
  });
  const dingRobot = new DingRobot(robot.token, robot.secret);

  await dingRobot.send({
    get() {
      return {
        msgtype: 'text',
        text: {
          content: text,
        },
      };
    },
  } as any);
}
