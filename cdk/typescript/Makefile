ENVIRONMENT := $(ENV)
APPLICATION := $(APP)
STACKPREFIX := ps-tim-$(ENVIRONMENT)-${APPLICATION}-s3-buckets

.PHONY: install build diff deploy watch test synth

install:
	yarn install

build:
	yarn install
	yarn build

test:
	yarn test

diff:
	yarn cdk diff -c stackPrefix=$(STACKPREFIX) -c environment=$(ENVIRONMENT) -c application=$(APPLICATION)

deploy:
	yarn cdk deploy -c stackPrefix=$(STACKPREFIX) -c environment=$(ENVIRONMENT) -c application=$(APPLICATION)

watch:
	yarn cdk watch -c stackPrefix=$(STACKPREFIX) -c environment=$(ENVIRONMENT) -c application=$(APPLICATION)

synth:
	yarn cdk synth -c stackPrefix=$(STACKPREFIX) -c environment=$(ENVIRONMENT) -c application=$(APPLICATION)
