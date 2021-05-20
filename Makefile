shiki-src:
	git clone https://github.com/shikijs/shiki shiki-src
	cd shiki-src && git checkout 29fbecd9203a746d2b3fc403ada33277d48d836c
	cd shiki-src && git apply ../shiki-cache.patch
	cd shiki-src && yarn

.PHONY: build-shiki
build-shiki: | shiki-src
	cd shiki-src && yarn build
	cp shiki-src/packages/shiki/dist/index.unpkg.iife.js shiki.min.js
