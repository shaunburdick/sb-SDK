import { connect } from "@dagger.io/dagger"

connect(async (client) => {

  // use a node:16-slim container
  // mount the source code directory on the host
  // at /src in the container
  const source = client.container()
    .from("node:18-slim")
    .withDirectory('/src', client.host().directory('.'), { exclude: ["node_modules/", "ci/"] })

  // set the working directory in the container
  // install application dependencies
  const runner = source
    .withWorkdir("/src")
    .withExec(["npm", "ci"])

  // run application tests
  const out = await runner
    .withExec(["npm", "test"])
    .stderr()
  console.log(out)

}, { LogOutput: process.stdout })
