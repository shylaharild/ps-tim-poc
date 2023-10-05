# CDK TS Infrastructure

This project create the infrastructure using CDK in an AWS Account

## Useful commands

* `make install`    installs js dependencies
* `make build`      compile typescript to js
* `make diff`       compare deployed stack with current state
* `make deploy`     deploy this stack to your default AWS account/region
* `make watch`      watch for changes and compile
* `make test`       perform the jest unit tests
* `make synth`      emits the synthesized CloudFormation template

The `diff`, `synth`, and `deploy` commands expects parameters called `ENV` and `APP`. The command looks like the following:

```
$ make diff/test/synth/deploy ENV="dev" APP="poc"
```

## How to run

You need to install the `node_modules` and build the application before running the application

```
$ make install && make build
```

the output will be as follows

```
sri@sri:~/ps-tim-poc/cdk/typescript$ make install
yarn install
yarn install v1.22.19
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
Done in 10.70s

sri@sri:~/ps-tim-poc/cdk/typescript$ make build
yarn install
yarn install v1.22.19
[1/4] Resolving packages...
success Already up-to-date.
Done in 0.30s.
yarn build
yarn run v1.22.19
$ tsc
Done in 11.19s.
```

You can now run the `diff` or `synth` or `deploy` command using `make` as given below

```
sri@sri:~/ps-tim-poc/cdk/typescript$ make diff ENV="dev" APP="poc"
yarn cdk diff -c stackPrefix=ps-tim-dev-poc-s3-buckets -c environment=dev -c application=poc
yarn run v1.22.19
$ cdk diff -c stackPrefix=ps-tim-dev-poc-s3-buckets -c environment=dev -c application=poc
$ ~/ps-tim-poc/cdk/typescript/node_modules/.bin/ts-node -C ttypescript src/index.ts
Stack ps-tim-dev-poc-s3-buckets
[+] Parameter BootstrapVersion BootstrapVersion: {"Type":"AWS::SSM::Parameter::Value<String>","Default":"/cdk-bootstrap/hnb659fds/version","Description":"Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]"}

Resources
[+] AWS::S3::Bucket ps-tim-dev-poc-s3-buckets-logs-bucket pstimdevpocs3bucketslogsbucket4487BDBB 
[+] AWS::S3::Bucket ps-tim-dev-poc-s3-buckets-assets-bucket pstimdevpocs3bucketsassetsbucketF02B7720 

Other Changes
[+] Unknown Rules: {"CheckBootstrapVersion":{"Assertions":[{"Assert":{"Fn::Not":[{"Fn::Contains":[["1","2","3","4","5"],{"Ref":"BootstrapVersion"}]}]},"AssertDescription":"CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI."}]}}


✨  Number of stacks with differences: 1

Done in 7.08s.
```
