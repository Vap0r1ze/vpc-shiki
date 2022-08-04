shiki-src:
	git clone https://github.com/shikijs/shiki shiki-src
	cd shiki-src && git checkout tags/v0.10.1
	cd shiki-src && git apply ../shiki-cache.patch
	cd shiki-src && yarn

.PHONY: build-shiki
build-shiki: | shiki-src
	cd shiki-src/packages/shiki && yarn build
	cp shiki-src/packages/shiki/dist/index.js ./modules/shiki.js
