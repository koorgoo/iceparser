MOCHA=node_modules/mocha/bin/mocha
JSHINT=node_modules/jshint/bin/jshint

mocha m:
	$(MOCHA) spec/*.spec.js

jshint j:
	$(JSHINT) index.js spec/*.js

.PHONY: mocha jshint
