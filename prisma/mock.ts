import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput = {
  email: 'changchun.dcc@gmail.com',
  name: 'godd',
  pwd: 'dcc963.963.',
};

const robotType: Prisma.RobotTypeCreateInput = {
  name: 'TG测试机器人',
  type: 'tg',
};

async function main() {
  console.log(`Start mock user ...`);
  const user = await prisma.user.create({
    data: userData,
  });
  console.log(`Created user with id: ${user.id}`);

  console.log(`开始 mock 机器人 ...`);
  const robotData: Prisma.RobotCreateInput = {
    name: 'TG测试机器人',
    ownerId: user.id,
    token: '2007638730:AAFzCVT8BWUbUPkVaiqt0TB7z0qQZtIfzX8',
    RobotType: {
      create: robotType,
    },
  };

  const robot = await prisma.robot.create({
    data: robotData,
  });
  console.log(`Created robot with id: ${robot.id}`);

  console.log(`start mock rule ...`);
  const rule: Prisma.RuleCreateInput = {
    name: 'test',
    function: `function index() {
              return {
                  message: 'hello world'
              }
          }
          `,
    robotId: robot.id,
  };
  const ruleResult = await prisma.rule.create({
    data: rule,
  });
  console.log(`Created rules with id: ${ruleResult.id}`);

  console.log(`start mock webhook ...`);
  const webhookData: Prisma.WebhookCreateInput = {
    name: 'test',
    token: `wasd`,
    robotId: robot.id,
  };
  const webhookResult = await prisma.webhook.create({
    data: webhookData,
  });
  console.log(`Created webhook with id: ${webhookResult.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
