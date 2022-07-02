const fs = require('fs');
const path = require('path');

const dockerComposePath = path.resolve(__dirname, '../docker-compose.yaml');

const [_, version] = process.argv.slice(2);

function update(file) {
  console.log(`当前构建版本：${version}`);

  let dockerCompose = fs.readFileSync(file, {
    encoding: 'utf-8',
  });

  dockerCompose = dockerCompose.replaceAll('${DRONE_BUILD_NUMBER}', version);

  fs.writeFileSync(file, dockerCompose, {
    encoding: 'utf-8',
  });
}

update(dockerComposePath);

console.log(`docker-compose 已更新！`);
