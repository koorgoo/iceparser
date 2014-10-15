NODEUNIT=node_modules/nodeunit/bin/nodeunit
JSHINT=node_modules/jshint/bin/jshint

test t:
	$(NODEUNIT) test/test-*.js

lint l:
	$(JSHINT) index.js test/*.js

.PHONY: test lint
