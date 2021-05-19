shiki-src:
	git clone https://github.com/Vap0r1ze/shiki --depth=1 shiki-src
	cd shiki-src && yarn

.PHONY: build-shiki
build-shiki: | shiki-src
	cd shiki-src && yarn build
	cp shiki-src/packages/shiki/dist/index.unpkg.iife.js shiki.min.js
